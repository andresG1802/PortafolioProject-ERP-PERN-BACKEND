import { CreateStockMovementDto, CreateStockTransferDto } from '../dtos';
import { StockMovementEntity } from '../entities/stock-movement.entity';
import { ProductStockSummary } from '../datasources/stock-movement.datasource';

export abstract class StockMovementRepository {
    abstract createMovement(dto: CreateStockMovementDto): Promise<StockMovementEntity>;
    abstract createTransfer(dto: CreateStockTransferDto): Promise<StockMovementEntity[]>;
    abstract getMovements(filter: { productId?: string; warehouseId?: string }): Promise<StockMovementEntity[]>;
    abstract getProductStock(productId: string): Promise<ProductStockSummary>;
}
