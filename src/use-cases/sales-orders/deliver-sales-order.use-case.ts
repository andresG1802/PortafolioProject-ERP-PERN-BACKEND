import { SalesOrderRepository } from '../../domain/repositories/sales-order.repository';

export class DeliverSalesOrderUseCase {
    constructor(private readonly salesOrderRepository: SalesOrderRepository) {}
    execute(id: string) { return this.salesOrderRepository.deliverSalesOrder(id); }
}
