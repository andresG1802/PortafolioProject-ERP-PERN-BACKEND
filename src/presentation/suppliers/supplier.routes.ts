import { Router } from 'express';
import { SupplierController } from './supplier.controller';
import { authMiddleware } from '../middlewares/auth.middleware';

export class SupplierRoutes {
    static get routes(): Router {
        const router = Router();
        const controller = new SupplierController();

        router.use(authMiddleware);

        router.post('/', controller.create);
        router.get('/', controller.getAll);
        router.get('/:id', controller.getById);
        router.put('/:id', controller.update);
        router.delete('/:id', controller.delete);

        return router;
    }
}
