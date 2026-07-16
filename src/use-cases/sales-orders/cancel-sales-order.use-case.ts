import { SalesOrderRepository } from '../../domain/repositories/sales-order.repository';

export class CancelSalesOrderUseCase {
    constructor(private readonly salesOrderRepository: SalesOrderRepository) {}
    execute(id: string) { return this.salesOrderRepository.cancelSalesOrder(id); }
}
