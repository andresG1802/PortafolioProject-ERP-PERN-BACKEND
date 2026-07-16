import { CreateSalesOrderDto, UpdateSalesOrderDto } from '../../domain/dtos';
import { SalesOrderDataSource } from '../../domain/datasources/sales-order.datasource';
import { SalesOrderEntity } from '../../domain/entities/sales-order.entity';
import { SalesOrderRepository } from '../../domain/repositories/sales-order.repository';

export class SalesOrderRepositoryImpl implements SalesOrderRepository {
    constructor(private readonly datasource: SalesOrderDataSource) {}

    createSalesOrder(dto: CreateSalesOrderDto): Promise<SalesOrderEntity> { return this.datasource.createSalesOrder(dto); }
    getSalesOrders(): Promise<SalesOrderEntity[]> { return this.datasource.getSalesOrders(); }
    getSalesOrderById(id: string): Promise<SalesOrderEntity> { return this.datasource.getSalesOrderById(id); }
    updateSalesOrder(dto: UpdateSalesOrderDto): Promise<SalesOrderEntity> { return this.datasource.updateSalesOrder(dto); }
    deleteSalesOrder(id: string): Promise<SalesOrderEntity> { return this.datasource.deleteSalesOrder(id); }
    confirmSalesOrder(id: string): Promise<SalesOrderEntity> { return this.datasource.confirmSalesOrder(id); }
    deliverSalesOrder(id: string): Promise<SalesOrderEntity> { return this.datasource.deliverSalesOrder(id); }
    cancelSalesOrder(id: string): Promise<SalesOrderEntity> { return this.datasource.cancelSalesOrder(id); }
}
