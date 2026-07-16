import { PurchaseOrderRepository } from '../../domain/repositories/purchase-order.repository';

export class CancelPurchaseOrderUseCase {
    constructor(private readonly purchaseOrderRepository: PurchaseOrderRepository) {}
    execute(id: string) { return this.purchaseOrderRepository.cancelPurchaseOrder(id); }
}
