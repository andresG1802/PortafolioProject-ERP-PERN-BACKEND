import { CreateStockMovementDto } from '../../domain/dtos';
import { StockMovementRepository } from '../../domain/repositories/stock-movement.repository';

export class CreateStockMovementUseCase {
    constructor(private readonly stockMovementRepository: StockMovementRepository) {}
    execute(dto: CreateStockMovementDto) { return this.stockMovementRepository.createMovement(dto); }
}
