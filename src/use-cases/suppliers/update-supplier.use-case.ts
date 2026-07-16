import { UpdateSupplierDto } from '../../domain/dtos';
import { SupplierRepository } from '../../domain/repositories/supplier.repository';

export class UpdateSupplierUseCase {
    constructor(private readonly supplierRepository: SupplierRepository) {}
    execute(dto: UpdateSupplierDto) { return this.supplierRepository.updateSupplier(dto); }
}
