import { StockMovementRepository } from '../../domain/repositories/stock-movement.repository';

export class GetStockMovementsUseCase {
    constructor(private readonly stockMovementRepository: StockMovementRepository) {}
    execute(filter: { productId?: string; warehouseId?: string }) { return this.stockMovementRepository.getMovements(filter); }
}
