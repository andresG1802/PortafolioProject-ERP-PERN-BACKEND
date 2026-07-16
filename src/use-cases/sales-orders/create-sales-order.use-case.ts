import { CreateSalesOrderDto } from '../../domain/dtos';
import { SalesOrderRepository } from '../../domain/repositories/sales-order.repository';

export class CreateSalesOrderUseCase {
    constructor(private readonly salesOrderRepository: SalesOrderRepository) {}
    execute(dto: CreateSalesOrderDto) { return this.salesOrderRepository.createSalesOrder(dto); }
}
