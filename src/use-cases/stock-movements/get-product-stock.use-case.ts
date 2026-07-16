import { StockMovementRepository } from '../../domain/repositories/stock-movement.repository';

export class GetProductStockUseCase {
    constructor(private readonly stockMovementRepository: StockMovementRepository) {}
    execute(productId: string) { return this.stockMovementRepository.getProductStock(productId); }
}
