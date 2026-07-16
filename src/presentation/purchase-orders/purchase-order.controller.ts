import { Request, Response } from 'express';
import { CreatePurchaseOrderDto, UpdatePurchaseOrderDto } from '../../domain/dtos';
import { CreatePurchaseOrderUseCase } from '../../use-cases/purchase-orders/create-purchase-order.use-case';
import { GetPurchaseOrdersUseCase } from '../../use-cases/purchase-orders/get-purchase-orders.use-case';
import { GetPurchaseOrderByIdUseCase } from '../../use-cases/purchase-orders/get-purchase-order-by-id.use-case';
import { UpdatePurchaseOrderUseCase } from '../../use-cases/purchase-orders/update-purchase-order.use-case';
import { DeletePurchaseOrderUseCase } from '../../use-cases/purchase-orders/delete-purchase-order.use-case';
import { ConfirmPurchaseOrderUseCase } from '../../use-cases/purchase-orders/confirm-purchase-order.use-case';
import { ReceivePurchaseOrderUseCase } from '../../use-cases/purchase-orders/receive-purchase-order.use-case';
import { CancelPurchaseOrderUseCase } from '../../use-cases/purchase-orders/cancel-purchase-order.use-case';
import { PurchaseOrderRepositoryImpl } from '../../infrastructure/repositories/purchase-order.repository.impl';
import { PurchaseOrderDataSourceImpl } from '../../infrastructure/datasources/purchase-order.datasource.impl';
import { handleError } from '../shared/handle-error';

export class PurchaseOrderController {
    private readonly purchaseOrderRepository = new PurchaseOrderRepositoryImpl(new PurchaseOrderDataSourceImpl());

    create = (req: Request, res: Response) => {
        const [error, dto] = CreatePurchaseOrderDto.create(req.body);
        if (error) { res.status(400).json({ error }); return; }

        new CreatePurchaseOrderUseCase(this.purchaseOrderRepository)
            .execute(dto!)
            .then(order => res.status(201).json(order))
            .catch(err => handleError(err, res));
    };

    getAll = (_req: Request, res: Response) => {
        new GetPurchaseOrdersUseCase(this.purchaseOrderRepository)
            .execute()
            .then(orders => res.json(orders))
            .catch(err => handleError(err, res));
    };

    getById = (req: Request, res: Response) => {
        new GetPurchaseOrderByIdUseCase(this.purchaseOrderRepository)
            .execute(String(req.params['id']))
            .then(order => res.json(order))
            .catch(err => handleError(err, res));
    };

    update = (req: Request, res: Response) => {
        const [error, dto] = UpdatePurchaseOrderDto.create({ ...req.body, id: req.params['id'] });
        if (error) { res.status(400).json({ error }); return; }

        new UpdatePurchaseOrderUseCase(this.purchaseOrderRepository)
            .execute(dto!)
            .then(order => res.json(order))
            .catch(err => handleError(err, res));
    };

    delete = (req: Request, res: Response) => {
        new DeletePurchaseOrderUseCase(this.purchaseOrderRepository)
            .execute(String(req.params['id']))
            .then(order => res.json(order))
            .catch(err => handleError(err, res));
    };

    confirm = (req: Request, res: Response) => {
        new ConfirmPurchaseOrderUseCase(this.purchaseOrderRepository)
            .execute(String(req.params['id']))
            .then(order => res.json(order))
            .catch(err => handleError(err, res));
    };

    receive = (req: Request, res: Response) => {
        new ReceivePurchaseOrderUseCase(this.purchaseOrderRepository)
            .execute(String(req.params['id']))
            .then(order => res.json(order))
            .catch(err => handleError(err, res));
    };

    cancel = (req: Request, res: Response) => {
        new CancelPurchaseOrderUseCase(this.purchaseOrderRepository)
            .execute(String(req.params['id']))
            .then(order => res.json(order))
            .catch(err => handleError(err, res));
    };
}
