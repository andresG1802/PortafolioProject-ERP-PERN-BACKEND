import { Request, Response } from 'express';
import { CreateSalesOrderDto, UpdateSalesOrderDto } from '../../domain/dtos';
import { CreateSalesOrderUseCase } from '../../use-cases/sales-orders/create-sales-order.use-case';
import { GetSalesOrdersUseCase } from '../../use-cases/sales-orders/get-sales-orders.use-case';
import { GetSalesOrderByIdUseCase } from '../../use-cases/sales-orders/get-sales-order-by-id.use-case';
import { UpdateSalesOrderUseCase } from '../../use-cases/sales-orders/update-sales-order.use-case';
import { DeleteSalesOrderUseCase } from '../../use-cases/sales-orders/delete-sales-order.use-case';
import { ConfirmSalesOrderUseCase } from '../../use-cases/sales-orders/confirm-sales-order.use-case';
import { DeliverSalesOrderUseCase } from '../../use-cases/sales-orders/deliver-sales-order.use-case';
import { CancelSalesOrderUseCase } from '../../use-cases/sales-orders/cancel-sales-order.use-case';
import { SalesOrderRepositoryImpl } from '../../infrastructure/repositories/sales-order.repository.impl';
import { SalesOrderDataSourceImpl } from '../../infrastructure/datasources/sales-order.datasource.impl';
import { handleError } from '../shared/handle-error';

export class SalesOrderController {
    private readonly salesOrderRepository = new SalesOrderRepositoryImpl(new SalesOrderDataSourceImpl());

    create = (req: Request, res: Response) => {
        const [error, dto] = CreateSalesOrderDto.create(req.body);
        if (error) { res.status(400).json({ error }); return; }

        new CreateSalesOrderUseCase(this.salesOrderRepository)
            .execute(dto!)
            .then(order => res.status(201).json(order))
            .catch(err => handleError(err, res));
    };

    getAll = (_req: Request, res: Response) => {
        new GetSalesOrdersUseCase(this.salesOrderRepository)
            .execute()
            .then(orders => res.json(orders))
            .catch(err => handleError(err, res));
    };

    getById = (req: Request, res: Response) => {
        new GetSalesOrderByIdUseCase(this.salesOrderRepository)
            .execute(String(req.params['id']))
            .then(order => res.json(order))
            .catch(err => handleError(err, res));
    };

    update = (req: Request, res: Response) => {
        const [error, dto] = UpdateSalesOrderDto.create({ ...req.body, id: req.params['id'] });
        if (error) { res.status(400).json({ error }); return; }

        new UpdateSalesOrderUseCase(this.salesOrderRepository)
            .execute(dto!)
            .then(order => res.json(order))
            .catch(err => handleError(err, res));
    };

    delete = (req: Request, res: Response) => {
        new DeleteSalesOrderUseCase(this.salesOrderRepository)
            .execute(String(req.params['id']))
            .then(order => res.json(order))
            .catch(err => handleError(err, res));
    };

    confirm = (req: Request, res: Response) => {
        new ConfirmSalesOrderUseCase(this.salesOrderRepository)
            .execute(String(req.params['id']))
            .then(order => res.json(order))
            .catch(err => handleError(err, res));
    };

    deliver = (req: Request, res: Response) => {
        new DeliverSalesOrderUseCase(this.salesOrderRepository)
            .execute(String(req.params['id']))
            .then(order => res.json(order))
            .catch(err => handleError(err, res));
    };

    cancel = (req: Request, res: Response) => {
        new CancelSalesOrderUseCase(this.salesOrderRepository)
            .execute(String(req.params['id']))
            .then(order => res.json(order))
            .catch(err => handleError(err, res));
    };
}
