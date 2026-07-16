import { UpdateWarehouseDto } from '../../domain/dtos';
import { WarehouseRepository } from '../../domain/repositories/warehouse.repository';

export class UpdateWarehouseUseCase {
    constructor(private readonly warehouseRepository: WarehouseRepository) {}
    execute(dto: UpdateWarehouseDto) { return this.warehouseRepository.updateWarehouse(dto); }
}
