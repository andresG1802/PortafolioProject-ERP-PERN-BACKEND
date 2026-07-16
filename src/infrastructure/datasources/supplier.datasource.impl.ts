import { PrismaClient } from '@prisma/client';
import { prisma } from '../database/prisma.client';
import { CreateSupplierDto, UpdateSupplierDto } from '../../domain/dtos';
import { SupplierDataSource } from '../../domain/datasources/supplier.datasource';
import { SupplierEntity } from '../../domain/entities/supplier.entity';
import { CustomError } from '../../domain/errors/custom.error';

export class SupplierDataSourceImpl implements SupplierDataSource {
    constructor(private readonly db: PrismaClient = prisma) {}

    async createSupplier(dto: CreateSupplierDto): Promise<SupplierEntity> {
        const supplier = await this.db.supplier.create({ data: dto });
        return SupplierEntity.fromObject(supplier);
    }

    async getSuppliers(): Promise<SupplierEntity[]> {
        const suppliers = await this.db.supplier.findMany({ orderBy: { name: 'asc' } });
        return suppliers.map(SupplierEntity.fromObject);
    }

    async getSupplierById(id: string): Promise<SupplierEntity> {
        const supplier = await this.db.supplier.findUnique({ where: { id } });
        if (!supplier) throw CustomError.notFound('Supplier not found');
        return SupplierEntity.fromObject(supplier);
    }

    async updateSupplier(dto: UpdateSupplierDto): Promise<SupplierEntity> {
        await this.getSupplierById(dto.id);
        const supplier = await this.db.supplier.update({ where: { id: dto.id }, data: dto.values });
        return SupplierEntity.fromObject(supplier);
    }

    async deleteSupplier(id: string): Promise<SupplierEntity> {
        await this.getSupplierById(id);
        const supplier = await this.db.supplier.delete({ where: { id } });
        return SupplierEntity.fromObject(supplier);
    }
}
