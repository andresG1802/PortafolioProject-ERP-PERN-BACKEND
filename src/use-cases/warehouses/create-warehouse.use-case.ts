import { CreateWarehouseDto } from '../../domain/dtos';
import { WarehouseRepository } from '../../domain/repositories/warehouse.repository';

export class CreateWarehouseUseCase {
    constructor(private readonly warehouseRepository: WarehouseRepository) {}
    execute(dto: CreateWarehouseDto) { return this.warehouseRepository.createWarehouse(dto); }
}
