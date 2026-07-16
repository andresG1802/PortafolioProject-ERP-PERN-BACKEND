import { CreateSupplierDto, UpdateSupplierDto } from '../../domain/dtos';
import { SupplierDataSource } from '../../domain/datasources/supplier.datasource';
import { SupplierEntity } from '../../domain/entities/supplier.entity';
import { SupplierRepository } from '../../domain/repositories/supplier.repository';

export class SupplierRepositoryImpl implements SupplierRepository {
    constructor(private readonly datasource: SupplierDataSource) {}

    createSupplier(dto: CreateSupplierDto): Promise<SupplierEntity> { return this.datasource.createSupplier(dto); }
    getSuppliers(): Promise<SupplierEntity[]> { return this.datasource.getSuppliers(); }
    getSupplierById(id: string): Promise<SupplierEntity> { return this.datasource.getSupplierById(id); }
    updateSupplier(dto: UpdateSupplierDto): Promise<SupplierEntity> { return this.datasource.updateSupplier(dto); }
    deleteSupplier(id: string): Promise<SupplierEntity> { return this.datasource.deleteSupplier(id); }
}
