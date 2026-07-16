import { PrismaClient } from '@prisma/client';
import { prisma } from '../database/prisma.client';
import { CreatePurchaseOrderDto, UpdatePurchaseOrderDto } from '../../domain/dtos';
import { PurchaseOrderDataSource } from '../../domain/datasources/purchase-order.datasource';
import { PurchaseOrderEntity } from '../../domain/entities/purchase-order.entity';
import { CustomError } from '../../domain/errors/custom.error';

const include = { items: true };

export class PurchaseOrderDataSourceImpl implements PurchaseOrderDataSource {
    constructor(private readonly db: PrismaClient = prisma) {}

    async createPurchaseOrder(dto: CreatePurchaseOrderDto): Promise<PurchaseOrderEntity> {
        const order = await this.db.purchaseOrder.create({
            data: {
                supplierId: dto.supplierId,
                warehouseId: dto.warehouseId,
                notes: dto.notes,
                items: { create: dto.items.map(item => ({ productId: item.productId, quantity: item.quantity, unitCost: item.unitCost })) },
            },
            include,
        });
        return PurchaseOrderEntity.fromObject(order);
    }

    async getPurchaseOrders(): Promise<PurchaseOrderEntity[]> {
        const orders = await this.db.purchaseOrder.findMany({ orderBy: { createdAt: 'desc' }, include });
        return orders.map(PurchaseOrderEntity.fromObject);
    }

    async getPurchaseOrderById(id: string): Promise<PurchaseOrderEntity> {
        const order = await this.db.purchaseOrder.findUnique({ where: { id }, include });
        if (!order) throw CustomError.notFound('Purchase order not found');
        return PurchaseOrderEntity.fromObject(order);
    }

    async updatePurchaseOrder(dto: UpdatePurchaseOrderDto): Promise<PurchaseOrderEntity> {
        const existing = await this.getPurchaseOrderById(dto.id);
        if (existing.status !== 'DRAFT') throw CustomError.badRequest('Only draft purchase orders can be updated');

        const order = await this.db.$transaction(async tx => {
            if (dto.items) {
                await tx.purchaseOrderItem.deleteMany({ where: { purchaseOrderId: dto.id } });
                await tx.purchaseOrderItem.createMany({
                    data: dto.items.map(item => ({ purchaseOrderId: dto.id, productId: item.productId, quantity: item.quantity, unitCost: item.unitCost })),
                });
            }
            return tx.purchaseOrder.update({ where: { id: dto.id }, data: dto.values, include });
        });
        return PurchaseOrderEntity.fromObject(order);
    }

    async deletePurchaseOrder(id: string): Promise<PurchaseOrderEntity> {
        const existing = await this.getPurchaseOrderById(id);
        if (existing.status !== 'DRAFT') throw CustomError.badRequest('Only draft purchase orders can be deleted');
        const order = await this.db.purchaseOrder.delete({ where: { id }, include });
        return PurchaseOrderEntity.fromObject(order);
    }

    async confirmPurchaseOrder(id: string): Promise<PurchaseOrderEntity> {
        const existing = await this.getPurchaseOrderById(id);
        if (existing.status !== 'DRAFT') throw CustomError.badRequest('Only draft purchase orders can be confirmed');
        const order = await this.db.purchaseOrder.update({ where: { id }, data: { status: 'CONFIRMED' }, include });
        return PurchaseOrderEntity.fromObject(order);
    }

    async receivePurchaseOrder(id: string): Promise<PurchaseOrderEntity> {
        const order = await this.db.$transaction(async tx => {
            const existing = await tx.purchaseOrder.findUnique({ where: { id }, include });
            if (!existing) throw CustomError.notFound('Purchase order not found');
            if (existing.status !== 'CONFIRMED') throw CustomError.badRequest('Only confirmed purchase orders can be received');

            for (const item of existing.items) {
                await tx.stockMovement.create({
                    data: {
                        type: 'IN',
                        quantity: item.quantity,
                        productId: item.productId,
                        warehouseId: existing.warehouseId,
                        reference: `PO-${existing.id}`,
                    },
                });
            }

            return tx.purchaseOrder.update({ where: { id }, data: { status: 'RECEIVED' }, include });
        });
        return PurchaseOrderEntity.fromObject(order);
    }

    async cancelPurchaseOrder(id: string): Promise<PurchaseOrderEntity> {
        const existing = await this.getPurchaseOrderById(id);
        if (existing.status === 'RECEIVED' || existing.status === 'CANCELLED') {
            throw CustomError.badRequest('Only draft or confirmed purchase orders can be cancelled');
        }
        const order = await this.db.purchaseOrder.update({ where: { id }, data: { status: 'CANCELLED' }, include });
        return PurchaseOrderEntity.fromObject(order);
    }
}
