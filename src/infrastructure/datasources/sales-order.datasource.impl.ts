import { PrismaClient } from '@prisma/client';
import { prisma } from '../database/prisma.client';
import { CreateSalesOrderDto, UpdateSalesOrderDto } from '../../domain/dtos';
import { SalesOrderDataSource } from '../../domain/datasources/sales-order.datasource';
import { SalesOrderEntity } from '../../domain/entities/sales-order.entity';
import { CustomError } from '../../domain/errors/custom.error';

const include = { items: true };

export class SalesOrderDataSourceImpl implements SalesOrderDataSource {
    constructor(private readonly db: PrismaClient = prisma) {}

    async createSalesOrder(dto: CreateSalesOrderDto): Promise<SalesOrderEntity> {
        const order = await this.db.salesOrder.create({
            data: {
                customerId: dto.customerId,
                warehouseId: dto.warehouseId,
                notes: dto.notes,
                items: { create: dto.items.map(item => ({ productId: item.productId, quantity: item.quantity, unitPrice: item.unitPrice })) },
            },
            include,
        });
        return SalesOrderEntity.fromObject(order);
    }

    async getSalesOrders(): Promise<SalesOrderEntity[]> {
        const orders = await this.db.salesOrder.findMany({ orderBy: { createdAt: 'desc' }, include });
        return orders.map(SalesOrderEntity.fromObject);
    }

    async getSalesOrderById(id: string): Promise<SalesOrderEntity> {
        const order = await this.db.salesOrder.findUnique({ where: { id }, include });
        if (!order) throw CustomError.notFound('Sales order not found');
        return SalesOrderEntity.fromObject(order);
    }

    async updateSalesOrder(dto: UpdateSalesOrderDto): Promise<SalesOrderEntity> {
        const existing = await this.getSalesOrderById(dto.id);
        if (existing.status !== 'DRAFT') throw CustomError.badRequest('Only draft sales orders can be updated');

        const order = await this.db.$transaction(async tx => {
            if (dto.items) {
                await tx.salesOrderItem.deleteMany({ where: { salesOrderId: dto.id } });
                await tx.salesOrderItem.createMany({
                    data: dto.items.map(item => ({ salesOrderId: dto.id, productId: item.productId, quantity: item.quantity, unitPrice: item.unitPrice })),
                });
            }
            return tx.salesOrder.update({ where: { id: dto.id }, data: dto.values, include });
        });
        return SalesOrderEntity.fromObject(order);
    }

    async deleteSalesOrder(id: string): Promise<SalesOrderEntity> {
        const existing = await this.getSalesOrderById(id);
        if (existing.status !== 'DRAFT') throw CustomError.badRequest('Only draft sales orders can be deleted');
        const order = await this.db.salesOrder.delete({ where: { id }, include });
        return SalesOrderEntity.fromObject(order);
    }

    async confirmSalesOrder(id: string): Promise<SalesOrderEntity> {
        const order = await this.db.$transaction(async tx => {
            const existing = await tx.salesOrder.findUnique({ where: { id }, include });
            if (!existing) throw CustomError.notFound('Sales order not found');
            if (existing.status !== 'DRAFT') throw CustomError.badRequest('Only draft sales orders can be confirmed');

            for (const item of existing.items) {
                const stock = await tx.stockMovement.aggregate({
                    _sum: { quantity: true },
                    where: { productId: item.productId, warehouseId: existing.warehouseId },
                });
                const available = stock._sum.quantity ?? 0;
                if (available < item.quantity) throw CustomError.badRequest(`Insufficient stock for product ${item.productId}`);

                await tx.stockMovement.create({
                    data: {
                        type: 'OUT',
                        quantity: -item.quantity,
                        productId: item.productId,
                        warehouseId: existing.warehouseId,
                        reference: `SO-${existing.id}`,
                    },
                });
            }

            return tx.salesOrder.update({ where: { id }, data: { status: 'CONFIRMED' }, include });
        });
        return SalesOrderEntity.fromObject(order);
    }

    async deliverSalesOrder(id: string): Promise<SalesOrderEntity> {
        const existing = await this.getSalesOrderById(id);
        if (existing.status !== 'CONFIRMED') throw CustomError.badRequest('Only confirmed sales orders can be delivered');
        const order = await this.db.salesOrder.update({ where: { id }, data: { status: 'DELIVERED' }, include });
        return SalesOrderEntity.fromObject(order);
    }

    async cancelSalesOrder(id: string): Promise<SalesOrderEntity> {
        const order = await this.db.$transaction(async tx => {
            const existing = await tx.salesOrder.findUnique({ where: { id }, include });
            if (!existing) throw CustomError.notFound('Sales order not found');
            if (existing.status === 'CANCELLED' || existing.status === 'DELIVERED') {
                throw CustomError.badRequest('Only draft or confirmed sales orders can be cancelled');
            }

            if (existing.status === 'CONFIRMED') {
                for (const item of existing.items) {
                    await tx.stockMovement.create({
                        data: {
                            type: 'IN',
                            quantity: item.quantity,
                            productId: item.productId,
                            warehouseId: existing.warehouseId,
                            reference: `SO-${existing.id}-CANCEL`,
                            reason: 'Sales order cancellation reversal',
                        },
                    });
                }
            }

            return tx.salesOrder.update({ where: { id }, data: { status: 'CANCELLED' }, include });
        });
        return SalesOrderEntity.fromObject(order);
    }
}
