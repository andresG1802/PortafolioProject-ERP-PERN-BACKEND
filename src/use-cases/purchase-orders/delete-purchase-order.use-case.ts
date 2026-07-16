import { PurchaseOrderRepository } from '../../domain/repositories/purchase-order.repository';

export class DeletePurchaseOrderUseCase {
    constructor(private readonly purchaseOrderRepository: PurchaseOrderRepository) {}
    execute(id: string) { return this.purchaseOrderRepository.deletePurchaseOrder(id); }
}
