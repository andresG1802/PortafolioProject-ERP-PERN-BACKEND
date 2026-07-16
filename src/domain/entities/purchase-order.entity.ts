export type PurchaseOrderStatus = 'DRAFT' | 'CONFIRMED' | 'RECEIVED' | 'CANCELLED';

export class PurchaseOrderItemEntity {
    constructor(
        public id: string,
        public productId: string,
        public quantity: number,
        public unitCost: number
    ) {}

    public static fromObject(object: { [key: string]: any }): PurchaseOrderItemEntity {
        const { id, productId, quantity, unitCost } = object;
        if (!id) throw new Error('PurchaseOrderItem id is required');
        if (!productId) throw new Error('PurchaseOrderItem productId is required');
        if (quantity === undefined || quantity === null) throw new Error('PurchaseOrderItem quantity is required');
        if (unitCost === undefined || unitCost === null) throw new Error('PurchaseOrderItem unitCost is required');
        return new PurchaseOrderItemEntity(id, productId, quantity, unitCost);
    }
}

export class PurchaseOrderEntity {
    constructor(
        public id: string,
        public status: PurchaseOrderStatus,
        public supplierId: string,
        public warehouseId: string,
        public items: PurchaseOrderItemEntity[],
        public notes?: string,
        public createdAt?: Date,
        public updatedAt?: Date
    ) {}

    public static fromObject(object: { [key: string]: any }): PurchaseOrderEntity {
        const { id, status, supplierId, warehouseId, items, notes, createdAt, updatedAt } = object;
        if (!id) throw new Error('PurchaseOrder id is required');
        if (!status) throw new Error('PurchaseOrder status is required');
        if (!supplierId) throw new Error('PurchaseOrder supplierId is required');
        if (!warehouseId) throw new Error('PurchaseOrder warehouseId is required');
        const mappedItems = Array.isArray(items) ? items.map(PurchaseOrderItemEntity.fromObject) : [];
        return new PurchaseOrderEntity(id, status, supplierId, warehouseId, mappedItems, notes, createdAt, updatedAt);
    }
}
