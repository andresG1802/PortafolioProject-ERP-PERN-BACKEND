import { Request, Response } from 'express';
import { CreateStockMovementDto, CreateStockTransferDto } from '../../domain/dtos';
import { CreateStockMovementUseCase } from '../../use-cases/stock-movements/create-stock-movement.use-case';
import { CreateStockTransferUseCase } from '../../use-cases/stock-movements/create-stock-transfer.use-case';
import { GetStockMovementsUseCase } from '../../use-cases/stock-movements/get-stock-movements.use-case';
import { StockMovementRepositoryImpl } from '../../infrastructure/repositories/stock-movement.repository.impl';
import { StockMovementDataSourceImpl } from '../../infrastructure/datasources/stock-movement.datasource.impl';
import { handleError } from '../shared/handle-error';

export class StockMovementController {
    private readonly stockMovementRepository = new StockMovementRepositoryImpl(new StockMovementDataSourceImpl());

    create = (req: Request, res: Response) => {
        const [error, dto] = CreateStockMovementDto.create(req.body);
        if (error) { res.status(400).json({ error }); return; }

        new CreateStockMovementUseCase(this.stockMovementRepository)
            .execute(dto!)
            .then(movement => res.status(201).json(movement))
            .catch(err => handleError(err, res));
    };

    transfer = (req: Request, res: Response) => {
        const [error, dto] = CreateStockTransferDto.create(req.body);
        if (error) { res.status(400).json({ error }); return; }

        new CreateStockTransferUseCase(this.stockMovementRepository)
            .execute(dto!)
            .then(movements => res.status(201).json(movements))
            .catch(err => handleError(err, res));
    };

    getAll = (req: Request, res: Response) => {
        const productId = req.query['productId'] ? String(req.query['productId']) : undefined;
        const warehouseId = req.query['warehouseId'] ? String(req.query['warehouseId']) : undefined;

        new GetStockMovementsUseCase(this.stockMovementRepository)
            .execute({ productId, warehouseId })
            .then(movements => res.json(movements))
            .catch(err => handleError(err, res));
    };
}
