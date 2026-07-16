import { Router } from 'express';
import { AuthRoutes } from './auth/auth.routes';
import { UserRoutes } from './users/user.routes';
import { ProductRoutes } from './products/product.routes';
import { CategoryRoutes } from './categories/category.routes';
import { SupplierRoutes } from './suppliers/supplier.routes';
import { WarehouseRoutes } from './warehouses/warehouse.routes';
import { CustomerRoutes } from './customers/customer.routes';
import { StockMovementRoutes } from './stock-movements/stock-movement.routes';
import { PurchaseOrderRoutes } from './purchase-orders/purchase-order.routes';
import { SalesOrderRoutes } from './sales-orders/sales-order.routes';

export class AppRoutes {
    static get routes(): Router {
        const router = Router();

        router.use('/api/auth', AuthRoutes.routes);
        router.use('/api/users', UserRoutes.routes);
        router.use('/api/products', ProductRoutes.routes);
        router.use('/api/categories', CategoryRoutes.routes);
        router.use('/api/suppliers', SupplierRoutes.routes);
        router.use('/api/warehouses', WarehouseRoutes.routes);
        router.use('/api/customers', CustomerRoutes.routes);
        router.use('/api/stock-movements', StockMovementRoutes.routes);
        router.use('/api/purchase-orders', PurchaseOrderRoutes.routes);
        router.use('/api/sales-orders', SalesOrderRoutes.routes);

        return router;
    }
}
