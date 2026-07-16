import { PurchaseOrderRepository } from '../../domain/repositories/purchase-order.repository';

export class GetPurchaseOrderByIdUseCase {
    constructor(private readonly purchaseOrderRepository: PurchaseOrderRepository) {}
    execute(id: string) { return this.purchaseOrderRepository.getPurchaseOrderById(id); }
}
