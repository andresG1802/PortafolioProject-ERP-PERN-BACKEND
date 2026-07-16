import { CreatePurchaseOrderDto, UpdatePurchaseOrderDto } from '../dtos';
import { PurchaseOrderEntity } from '../entities/purchase-order.entity';

export abstract class PurchaseOrderRepository {
    abstract createPurchaseOrder(dto: CreatePurchaseOrderDto): Promise<PurchaseOrderEntity>;
    abstract getPurchaseOrders(): Promise<PurchaseOrderEntity[]>;
    abstract getPurchaseOrderById(id: string): Promise<PurchaseOrderEntity>;
    abstract updatePurchaseOrder(dto: UpdatePurchaseOrderDto): Promise<PurchaseOrderEntity>;
    abstract deletePurchaseOrder(id: string): Promise<PurchaseOrderEntity>;
    abstract confirmPurchaseOrder(id: string): Promise<PurchaseOrderEntity>;
    abstract receivePurchaseOrder(id: string): Promise<PurchaseOrderEntity>;
    abstract cancelPurchaseOrder(id: string): Promise<PurchaseOrderEntity>;
}
