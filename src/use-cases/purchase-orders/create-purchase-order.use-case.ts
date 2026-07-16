import { CreatePurchaseOrderDto } from '../../domain/dtos';
import { PurchaseOrderRepository } from '../../domain/repositories/purchase-order.repository';

export class CreatePurchaseOrderUseCase {
    constructor(private readonly purchaseOrderRepository: PurchaseOrderRepository) {}
    execute(dto: CreatePurchaseOrderDto) { return this.purchaseOrderRepository.createPurchaseOrder(dto); }
}
