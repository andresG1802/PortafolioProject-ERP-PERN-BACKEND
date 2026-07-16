import { CreateStockMovementDto, CreateStockTransferDto } from '../dtos';
import { StockMovementEntity } from '../entities/stock-movement.entity';

export interface ProductStockSummary {
    productId: string;
    total: number;
    byWarehouse: { warehouseId: string; quantity: number }[];
}

export abstract class StockMovementDataSource {
    abstract createMovement(dto: CreateStockMovementDto): Promise<StockMovementEntity>;
    abstract createTransfer(dto: CreateStockTransferDto): Promise<StockMovementEntity[]>;
    abstract getMovements(filter: { productId?: string; warehouseId?: string }): Promise<StockMovementEntity[]>;
    abstract getProductStock(productId: string): Promise<ProductStockSummary>;
}
