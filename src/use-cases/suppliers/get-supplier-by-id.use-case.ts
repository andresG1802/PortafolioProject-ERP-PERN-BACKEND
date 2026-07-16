import { SupplierRepository } from '../../domain/repositories/supplier.repository';

export class GetSupplierByIdUseCase {
    constructor(private readonly supplierRepository: SupplierRepository) {}
    execute(id: string) { return this.supplierRepository.getSupplierById(id); }
}
