import { Router } from 'express';
import { UserController } from './user.controller';
import { authMiddleware } from '../middlewares/auth.middleware';

export class UserRoutes {
    static get routes(): Router {
        const router = Router();
        const controller = new UserController();

        router.use(authMiddleware);

        router.get('/', controller.getAll);
        router.get('/:id', controller.getById);
        router.put('/:id', controller.update);
        router.delete('/:id', controller.delete);

        return router;
    }
}
