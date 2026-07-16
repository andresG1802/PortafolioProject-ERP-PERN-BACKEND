import { PurchaseOrderRepository } from '../../domain/repositories/purchase-order.repository';

export class ReceivePurchaseOrderUseCase {
    constructor(private readonly purchaseOrderRepository: PurchaseOrderRepository) {}
    execute(id: string) { return this.purchaseOrderRepository.receivePurchaseOrder(id); }
}
