export type SalesOrderStatus = 'DRAFT' | 'CONFIRMED' | 'DELIVERED' | 'CANCELLED';

export class SalesOrderItemEntity {
    constructor(
        public id: string,
        public productId: string,
        public quantity: number,
        public unitPrice: number
    ) {}

    public static fromObject(object: { [key: string]: any }): SalesOrderItemEntity {
        const { id, productId, quantity, unitPrice } = object;
        if (!id) throw new Error('SalesOrderItem id is required');
        if (!productId) throw new Error('SalesOrderItem productId is required');
        if (quantity === undefined || quantity === null) throw new Error('SalesOrderItem quantity is required');
        if (unitPrice === undefined || unitPrice === null) throw new Error('SalesOrderItem unitPrice is required');
        return new SalesOrderItemEntity(id, productId, quantity, unitPrice);
    }
}

export class SalesOrderEntity {
    constructor(
        public id: string,
        public status: SalesOrderStatus,
        public customerId: string,
        public warehouseId: string,
        public items: SalesOrderItemEntity[],
        public notes?: string,
        public createdAt?: Date,
        public updatedAt?: Date
    ) {}

    public static fromObject(object: { [key: string]: any }): SalesOrderEntity {
        const { id, status, customerId, warehouseId, items, notes, createdAt, updatedAt } = object;
        if (!id) throw new Error('SalesOrder id is required');
        if (!status) throw new Error('SalesOrder status is required');
        if (!customerId) throw new Error('SalesOrder customerId is required');
        if (!warehouseId) throw new Error('SalesOrder warehouseId is required');
        const mappedItems = Array.isArray(items) ? items.map(SalesOrderItemEntity.fromObject) : [];
        return new SalesOrderEntity(id, status, customerId, warehouseId, mappedItems, notes, createdAt, updatedAt);
    }
}
