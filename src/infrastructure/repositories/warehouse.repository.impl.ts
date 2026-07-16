import { CreateWarehouseDto, UpdateWarehouseDto } from '../../domain/dtos';
import { WarehouseDataSource } from '../../domain/datasources/warehouse.datasource';
import { WarehouseEntity } from '../../domain/entities/warehouse.entity';
import { WarehouseRepository } from '../../domain/repositories/warehouse.repository';

export class WarehouseRepositoryImpl implements WarehouseRepository {
    constructor(private readonly datasource: WarehouseDataSource) {}

    createWarehouse(dto: CreateWarehouseDto): Promise<WarehouseEntity> { return this.datasource.createWarehouse(dto); }
    getWarehouses(): Promise<WarehouseEntity[]> { return this.datasource.getWarehouses(); }
    getWarehouseById(id: string): Promise<WarehouseEntity> { return this.datasource.getWarehouseById(id); }
    updateWarehouse(dto: UpdateWarehouseDto): Promise<WarehouseEntity> { return this.datasource.updateWarehouse(dto); }
    deleteWarehouse(id: string): Promise<WarehouseEntity> { return this.datasource.deleteWarehouse(id); }
}
