import { Router } from 'express';
import { SalesOrderController } from './sales-order.controller';
import { authMiddleware } from '../middlewares/auth.middleware';

export class SalesOrderRoutes {
    static get routes(): Router {
        const router = Router();
        const controller = new SalesOrderController();

        router.use(authMiddleware);

        router.post('/', controller.create);
        router.get('/', controller.getAll);
        router.get('/:id', controller.getById);
        router.put('/:id', controller.update);
        router.delete('/:id', controller.delete);
        router.post('/:id/confirm', controller.confirm);
        router.post('/:id/deliver', controller.deliver);
        router.post('/:id/cancel', controller.cancel);

        return router;
    }
}
