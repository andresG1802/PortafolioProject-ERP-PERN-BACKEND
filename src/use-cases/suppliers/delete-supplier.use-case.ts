import { SupplierRepository } from '../../domain/repositories/supplier.repository';

export class DeleteSupplierUseCase {
    constructor(private readonly supplierRepository: SupplierRepository) {}
    execute(id: string) { return this.supplierRepository.deleteSupplier(id); }
}
