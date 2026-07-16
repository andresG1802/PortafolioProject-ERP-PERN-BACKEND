import { SalesOrderRepository } from '../../domain/repositories/sales-order.repository';

export class GetSalesOrdersUseCase {
    constructor(private readonly salesOrderRepository: SalesOrderRepository) {}
    execute() { return this.salesOrderRepository.getSalesOrders(); }
}
