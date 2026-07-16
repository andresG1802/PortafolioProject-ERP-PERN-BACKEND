import { CreateWarehouseDto, UpdateWarehouseDto } from '../dtos';
import { WarehouseEntity } from '../entities/warehouse.entity';

export abstract class WarehouseRepository {
    abstract createWarehouse(dto: CreateWarehouseDto): Promise<WarehouseEntity>;
    abstract getWarehouses(): Promise<WarehouseEntity[]>;
    abstract getWarehouseById(id: string): Promise<WarehouseEntity>;
    abstract updateWarehouse(dto: UpdateWarehouseDto): Promise<WarehouseEntity>;
    abstract deleteWarehouse(id: string): Promise<WarehouseEntity>;
}
