import { Router } from 'express';
import { AuthRoutes } from './auth/auth.routes';
import { UserRoutes } from './users/user.routes';
import { ProductRoutes } from './products/product.routes';

export class AppRoutes {
    static get routes(): Router {
        const router = Router();

        router.use('/api/auth', AuthRoutes.routes);
        router.use('/api/users', UserRoutes.routes);
        router.use('/api/products', ProductRoutes.routes);

        return router;
    }
}
