import { SupplierRepository } from '../../domain/repositories/supplier.repository';

export class GetSuppliersUseCase {
    constructor(private readonly supplierRepository: SupplierRepository) {}
    execute() { return this.supplierRepository.getSuppliers(); }
}
