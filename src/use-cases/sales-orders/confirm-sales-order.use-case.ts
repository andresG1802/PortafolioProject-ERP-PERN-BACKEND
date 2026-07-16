import { SalesOrderRepository } from '../../domain/repositories/sales-order.repository';

export class ConfirmSalesOrderUseCase {
    constructor(private readonly salesOrderRepository: SalesOrderRepository) {}
    execute(id: string) { return this.salesOrderRepository.confirmSalesOrder(id); }
}
