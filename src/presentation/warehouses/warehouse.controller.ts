import { Request, Response } from 'express';
import { CreateWarehouseDto, UpdateWarehouseDto } from '../../domain/dtos';
import { CreateWarehouseUseCase } from '../../use-cases/warehouses/create-warehouse.use-case';
import { GetWarehousesUseCase } from '../../use-cases/warehouses/get-warehouses.use-case';
import { GetWarehouseByIdUseCase } from '../../use-cases/warehouses/get-warehouse-by-id.use-case';
import { UpdateWarehouseUseCase } from '../../use-cases/warehouses/update-warehouse.use-case';
import { DeleteWarehouseUseCase } from '../../use-cases/warehouses/delete-warehouse.use-case';
import { WarehouseRepositoryImpl } from '../../infrastructure/repositories/warehouse.repository.impl';
import { WarehouseDataSourceImpl } from '../../infrastructure/datasources/warehouse.datasource.impl';
import { handleError } from '../shared/handle-error';

export class WarehouseController {
    private readonly warehouseRepository = new WarehouseRepositoryImpl(new WarehouseDataSourceImpl());

    create = (req: Request, res: Response) => {
        const [error, dto] = CreateWarehouseDto.create(req.body);
        if (error) { res.status(400).json({ error }); return; }

        new CreateWarehouseUseCase(this.warehouseRepository)
            .execute(dto!)
            .then(warehouse => res.status(201).json(warehouse))
            .catch(err => handleError(err, res));
    };

    getAll = (_req: Request, res: Response) => {
        new GetWarehousesUseCase(this.warehouseRepository)
            .execute()
            .then(warehouses => res.json(warehouses))
            .catch(err => handleError(err, res));
    };

    getById = (req: Request, res: Response) => {
        new GetWarehouseByIdUseCase(this.warehouseRepository)
            .execute(String(req.params['id']))
            .then(warehouse => res.json(warehouse))
            .catch(err => handleError(err, res));
    };

    update = (req: Request, res: Response) => {
        const [error, dto] = UpdateWarehouseDto.create({ ...req.body, id: req.params['id'] });
        if (error) { res.status(400).json({ error }); return; }

        new UpdateWarehouseUseCase(this.warehouseRepository)
            .execute(dto!)
            .then(warehouse => res.json(warehouse))
            .catch(err => handleError(err, res));
    };

    delete = (req: Request, res: Response) => {
        new DeleteWarehouseUseCase(this.warehouseRepository)
            .execute(String(req.params['id']))
            .then(warehouse => res.json(warehouse))
            .catch(err => handleError(err, res));
    };
}
