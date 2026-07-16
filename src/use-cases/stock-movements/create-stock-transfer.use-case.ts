import { CreateStockTransferDto } from '../../domain/dtos';
import { StockMovementRepository } from '../../domain/repositories/stock-movement.repository';

export class CreateStockTransferUseCase {
    constructor(private readonly stockMovementRepository: StockMovementRepository) {}
    execute(dto: CreateStockTransferDto) { return this.stockMovementRepository.createTransfer(dto); }
}
