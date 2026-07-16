import { CreateSupplierDto } from '../../domain/dtos';
import { SupplierRepository } from '../../domain/repositories/supplier.repository';

export class CreateSupplierUseCase {
    constructor(private readonly supplierRepository: SupplierRepository) {}
    execute(dto: CreateSupplierDto) { return this.supplierRepository.createSupplier(dto); }
}
