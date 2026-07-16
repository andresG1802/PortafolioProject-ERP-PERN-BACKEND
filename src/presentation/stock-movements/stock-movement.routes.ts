import { Router } from 'express';
import { StockMovementController } from './stock-movement.controller';
import { authMiddleware } from '../middlewares/auth.middleware';

export class StockMovementRoutes {
    static get routes(): Router {
        const router = Router();
        const controller = new StockMovementController();

        router.use(authMiddleware);

        router.post('/', controller.create);
        router.post('/transfer', controller.transfer);
        router.get('/', controller.getAll);

        return router;
    }
}
