import { UpdatePurchaseOrderDto } from '../../domain/dtos';
import { PurchaseOrderRepository } from '../../domain/repositories/purchase-order.repository';

export class UpdatePurchaseOrderUseCase {
    constructor(private readonly purchaseOrderRepository: PurchaseOrderRepository) {}
    execute(dto: UpdatePurchaseOrderDto) { return this.purchaseOrderRepository.updatePurchaseOrder(dto); }
}
