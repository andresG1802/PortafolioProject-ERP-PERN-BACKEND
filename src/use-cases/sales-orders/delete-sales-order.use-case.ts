import { SalesOrderRepository } from '../../domain/repositories/sales-order.repository';

export class DeleteSalesOrderUseCase {
    constructor(private readonly salesOrderRepository: SalesOrderRepository) {}
    execute(id: string) { return this.salesOrderRepository.deleteSalesOrder(id); }
}
