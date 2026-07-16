import { CreateStockMovementDto, CreateStockTransferDto } from '../../domain/dtos';
import { StockMovementDataSource, ProductStockSummary } from '../../domain/datasources/stock-movement.datasource';
import { StockMovementEntity } from '../../domain/entities/stock-movement.entity';
import { StockMovementRepository } from '../../domain/repositories/stock-movement.repository';

export class StockMovementRepositoryImpl implements StockMovementRepository {
    constructor(private readonly datasource: StockMovementDataSource) {}

    createMovement(dto: CreateStockMovementDto): Promise<StockMovementEntity> { return this.datasource.createMovement(dto); }
    createTransfer(dto: CreateStockTransferDto): Promise<StockMovementEntity[]> { return this.datasource.createTransfer(dto); }
    getMovements(filter: { productId?: string; warehouseId?: string }): Promise<StockMovementEntity[]> { return this.datasource.getMovements(filter); }
    getProductStock(productId: string): Promise<ProductStockSummary> { return this.datasource.getProductStock(productId); }
}
