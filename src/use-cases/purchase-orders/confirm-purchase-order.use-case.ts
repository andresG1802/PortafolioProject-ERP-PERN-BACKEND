import { PurchaseOrderRepository } from '../../domain/repositories/purchase-order.repository';

export class ConfirmPurchaseOrderUseCase {
    constructor(private readonly purchaseOrderRepository: PurchaseOrderRepository) {}
    execute(id: string) { return this.purchaseOrderRepository.confirmPurchaseOrder(id); }
}
