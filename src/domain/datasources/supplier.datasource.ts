import { CreateSupplierDto, UpdateSupplierDto } from '../dtos';
import { SupplierEntity } from '../entities/supplier.entity';

export abstract class SupplierDataSource {
    abstract createSupplier(dto: CreateSupplierDto): Promise<SupplierEntity>;
    abstract getSuppliers(): Promise<SupplierEntity[]>;
    abstract getSupplierById(id: string): Promise<SupplierEntity>;
    abstract updateSupplier(dto: UpdateSupplierDto): Promise<SupplierEntity>;
    abstract deleteSupplier(id: string): Promise<SupplierEntity>;
}
