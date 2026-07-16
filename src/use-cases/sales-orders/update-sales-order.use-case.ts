import { UpdateSalesOrderDto } from '../../domain/dtos';
import { SalesOrderRepository } from '../../domain/repositories/sales-order.repository';

export class UpdateSalesOrderUseCase {
    constructor(private readonly salesOrderRepository: SalesOrderRepository) {}
    execute(dto: UpdateSalesOrderDto) { return this.salesOrderRepository.updateSalesOrder(dto); }
}
