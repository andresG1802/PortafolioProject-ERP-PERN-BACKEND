import { PrismaClient } from '@prisma/client';
import { prisma } from '../database/prisma.client';
import { CreateWarehouseDto, UpdateWarehouseDto } from '../../domain/dtos';
import { WarehouseDataSource } from '../../domain/datasources/warehouse.datasource';
import { WarehouseEntity } from '../../domain/entities/warehouse.entity';
import { CustomError } from '../../domain/errors/custom.error';

export class WarehouseDataSourceImpl implements WarehouseDataSource {
    constructor(private readonly db: PrismaClient = prisma) {}

    async createWarehouse(dto: CreateWarehouseDto): Promise<WarehouseEntity> {
        const warehouse = await this.db.warehouse.create({ data: dto });
        return WarehouseEntity.fromObject(warehouse);
    }

    async getWarehouses(): Promise<WarehouseEntity[]> {
        const warehouses = await this.db.warehouse.findMany({ orderBy: { name: 'asc' } });
        return warehouses.map(WarehouseEntity.fromObject);
    }

    async getWarehouseById(id: string): Promise<WarehouseEntity> {
        const warehouse = await this.db.warehouse.findUnique({ where: { id } });
        if (!warehouse) throw CustomError.notFound('Warehouse not found');
        return WarehouseEntity.fromObject(warehouse);
    }

    async updateWarehouse(dto: UpdateWarehouseDto): Promise<WarehouseEntity> {
        await this.getWarehouseById(dto.id);
        const warehouse = await this.db.warehouse.update({ where: { id: dto.id }, data: dto.values });
        return WarehouseEntity.fromObject(warehouse);
    }

    async deleteWarehouse(id: string): Promise<WarehouseEntity> {
        await this.getWarehouseById(id);
        const warehouse = await this.db.warehouse.delete({ where: { id } });
        return WarehouseEntity.fromObject(warehouse);
    }
}
