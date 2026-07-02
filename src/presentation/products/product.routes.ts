import { Router } from 'express';
import { ProductController } from './product.controller';
import { authMiddleware } from '../middlewares/auth.middleware';

export class ProductRoutes {
    static get routes(): Router {
        const router = Router();
        const controller = new ProductController();

        router.use(authMiddleware);

        router.post('/', controller.create);
        router.get('/', controller.getAll);
        router.get('/:id', controller.getById);
        router.put('/:id', controller.update);
        router.delete('/:id', controller.delete);

        return router;
    }
}
