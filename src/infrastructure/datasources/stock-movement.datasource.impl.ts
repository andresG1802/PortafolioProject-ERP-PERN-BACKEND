import { Prisma, PrismaClient } from '@prisma/client';
import { prisma } from '../database/prisma.client';
import { CreateStockMovementDto, CreateStockTransferDto } from '../../domain/dtos';
import { StockMovementDataSource, ProductStockSummary } from '../../domain/datasources/stock-movement.datasource';
import { StockMovementEntity } from '../../domain/entities/stock-movement.entity';
import { CustomError } from '../../domain/errors/custom.error';

export class StockMovementDataSourceImpl implements StockMovementDataSource {
    constructor(private readonly db: PrismaClient = prisma) {}

    private async getCurrentStock(tx: Prisma.TransactionClient, productId: string, warehouseId: string): Promise<number> {
        const result = await tx.stockMovement.aggregate({
            _sum: { quantity: true },
            where: { productId, warehouseId },
        });
        return result._sum.quantity ?? 0;
    }

    private async assertProductAndWarehouseExist(tx: Prisma.TransactionClient, productId: string, warehouseId: string) {
        const [product, warehouse] = await Promise.all([
            tx.product.findUnique({ where: { id: productId } }),
            tx.warehouse.findUnique({ where: { id: warehouseId } }),
        ]);
        if (!product) throw CustomError.notFound('Product not found');
        if (!warehouse) throw CustomError.notFound('Warehouse not found');
    }

    async createMovement(dto: CreateStockMovementDto): Promise<StockMovementEntity> {
        const movement = await this.db.$transaction(async tx => {
            await this.assertProductAndWarehouseExist(tx, dto.productId, dto.warehouseId);

            let quantity = dto.quantity;
            if (dto.type === 'OUT') {
                const current = await this.getCurrentStock(tx, dto.productId, dto.warehouseId);
                if (current < dto.quantity) throw CustomError.badRequest('Insufficient stock');
                quantity = -dto.quantity;
            }

            return tx.stockMovement.create({
                data: {
                    type: dto.type,
                    quantity,
                    productId: dto.productId,
                    warehouseId: dto.warehouseId,
                    reason: dto.reason,
                    reference: dto.reference,
                },
            });
        });
        return StockMovementEntity.fromObject(movement);
    }

    async createTransfer(dto: CreateStockTransferDto): Promise<StockMovementEntity[]> {
        const movements = await this.db.$transaction(async tx => {
            await this.assertProductAndWarehouseExist(tx, dto.productId, dto.fromWarehouseId);
            const toWarehouse = await tx.warehouse.findUnique({ where: { id: dto.toWarehouseId } });
            if (!toWarehouse) throw CustomError.notFound('Warehouse not found');

            const current = await this.getCurrentStock(tx, dto.productId, dto.fromWarehouseId);
            if (current < dto.quantity) throw CustomError.badRequest('Insufficient stock in source warehouse');

            const out = await tx.stockMovement.create({
                data: {
                    type: 'TRANSFER_OUT',
                    quantity: -dto.quantity,
                    productId: dto.productId,
                    warehouseId: dto.fromWarehouseId,
                    reason: dto.reason,
                },
            });
            const into = await tx.stockMovement.create({
                data: {
                    type: 'TRANSFER_IN',
                    quantity: dto.quantity,
                    productId: dto.productId,
                    warehouseId: dto.toWarehouseId,
                    reason: dto.reason,
                },
            });
            return [out, into];
        });
        return movements.map(StockMovementEntity.fromObject);
    }

    async getMovements(filter: { productId?: string; warehouseId?: string }): Promise<StockMovementEntity[]> {
        const movements = await this.db.stockMovement.findMany({
            where: { productId: filter.productId, warehouseId: filter.warehouseId },
            orderBy: { createdAt: 'desc' },
        });
        return movements.map(StockMovementEntity.fromObject);
    }

    async getProductStock(productId: string): Promise<ProductStockSummary> {
        const product = await this.db.product.findUnique({ where: { id: productId } });
        if (!product) throw CustomError.notFound('Product not found');

        const grouped = await this.db.stockMovement.groupBy({
            by: ['warehouseId'],
            where: { productId },
            _sum: { quantity: true },
        });
        const byWarehouse = grouped.map(g => ({ warehouseId: g.warehouseId, quantity: g._sum.quantity ?? 0 }));
        const total = byWarehouse.reduce((sum, w) => sum + w.quantity, 0);
        return { productId, total, byWarehouse };
    }
}
