import { WarehouseRepository } from '../../domain/repositories/warehouse.repository';

export class GetWarehouseByIdUseCase {
    constructor(private readonly warehouseRepository: WarehouseRepository) {}
    execute(id: string) { return this.warehouseRepository.getWarehouseById(id); }
}
