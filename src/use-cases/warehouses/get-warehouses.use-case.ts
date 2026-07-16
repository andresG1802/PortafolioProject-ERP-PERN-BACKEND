import { WarehouseRepository } from '../../domain/repositories/warehouse.repository';

export class GetWarehousesUseCase {
    constructor(private readonly warehouseRepository: WarehouseRepository) {}
    execute() { return this.warehouseRepository.getWarehouses(); }
}
