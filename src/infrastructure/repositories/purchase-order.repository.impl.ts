import { CreatePurchaseOrderDto, UpdatePurchaseOrderDto } from '../../domain/dtos';
import { PurchaseOrderDataSource } from '../../domain/datasources/purchase-order.datasource';
import { PurchaseOrderEntity } from '../../domain/entities/purchase-order.entity';
import { PurchaseOrderRepository } from '../../domain/repositories/purchase-order.repository';

export class PurchaseOrderRepositoryImpl implements PurchaseOrderRepository {
    constructor(private readonly datasource: PurchaseOrderDataSource) {}

    createPurchaseOrder(dto: CreatePurchaseOrderDto): Promise<PurchaseOrderEntity> { return this.datasource.createPurchaseOrder(dto); }
    getPurchaseOrders(): Promise<PurchaseOrderEntity[]> { return this.datasource.getPurchaseOrders(); }
    getPurchaseOrderById(id: string): Promise<PurchaseOrderEntity> { return this.datasource.getPurchaseOrderById(id); }
    updatePurchaseOrder(dto: UpdatePurchaseOrderDto): Promise<PurchaseOrderEntity> { return this.datasource.updatePurchaseOrder(dto); }
    deletePurchaseOrder(id: string): Promise<PurchaseOrderEntity> { return this.datasource.deletePurchaseOrder(id); }
    confirmPurchaseOrder(id: string): Promise<PurchaseOrderEntity> { return this.datasource.confirmPurchaseOrder(id); }
    receivePurchaseOrder(id: string): Promise<PurchaseOrderEntity> { return this.datasource.receivePurchaseOrder(id); }
    cancelPurchaseOrder(id: string): Promise<PurchaseOrderEntity> { return this.datasource.cancelPurchaseOrder(id); }
}
