import { Router } from 'express';
import { PurchaseOrderController } from './purchase-order.controller';
import { authMiddleware } from '../middlewares/auth.middleware';

export class PurchaseOrderRoutes {
    static get routes(): Router {
        const router = Router();
        const controller = new PurchaseOrderController();

        router.use(authMiddleware);

        router.post('/', controller.create);
        router.get('/', controller.getAll);
        router.get('/:id', controller.getById);
        router.put('/:id', controller.update);
        router.delete('/:id', controller.delete);
        router.post('/:id/confirm', controller.confirm);
        router.post('/:id/receive', controller.receive);
        router.post('/:id/cancel', controller.cancel);

        return router;
    }
}
