import { SalesOrderRepository } from '../../domain/repositories/sales-order.repository';

export class GetSalesOrderByIdUseCase {
    constructor(private readonly salesOrderRepository: SalesOrderRepository) {}
    execute(id: string) { return this.salesOrderRepository.getSalesOrderById(id); }
}
