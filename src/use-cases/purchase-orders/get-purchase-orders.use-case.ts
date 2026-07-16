import { PurchaseOrderRepository } from '../../domain/repositories/purchase-order.repository';

export class GetPurchaseOrdersUseCase {
    constructor(private readonly purchaseOrderRepository: PurchaseOrderRepository) {}
    execute() { return this.purchaseOrderRepository.getPurchaseOrders(); }
}
