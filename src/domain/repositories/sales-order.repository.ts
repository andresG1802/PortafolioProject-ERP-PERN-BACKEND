import { CreateSalesOrderDto, UpdateSalesOrderDto } from '../dtos';
import { SalesOrderEntity } from '../entities/sales-order.entity';

export abstract class SalesOrderRepository {
    abstract createSalesOrder(dto: CreateSalesOrderDto): Promise<SalesOrderEntity>;
    abstract getSalesOrders(): Promise<SalesOrderEntity[]>;
    abstract getSalesOrderById(id: string): Promise<SalesOrderEntity>;
    abstract updateSalesOrder(dto: UpdateSalesOrderDto): Promise<SalesOrderEntity>;
    abstract deleteSalesOrder(id: string): Promise<SalesOrderEntity>;
    abstract confirmSalesOrder(id: string): Promise<SalesOrderEntity>;
    abstract deliverSalesOrder(id: string): Promise<SalesOrderEntity>;
    abstract cancelSalesOrder(id: string): Promise<SalesOrderEntity>;
}
