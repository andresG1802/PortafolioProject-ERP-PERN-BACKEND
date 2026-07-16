import { WarehouseRepository } from '../../domain/repositories/warehouse.repository';

export class DeleteWarehouseUseCase {
    constructor(private readonly warehouseRepository: WarehouseRepository) {}
    execute(id: string) { return this.warehouseRepository.deleteWarehouse(id); }
}
