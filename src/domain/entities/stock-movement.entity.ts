export type StockMovementType = 'IN' | 'OUT' | 'ADJUSTMENT' | 'TRANSFER_IN' | 'TRANSFER_OUT';

export class StockMovementEntity {
    constructor(
        public id: string,
        public type: StockMovementType,
        public quantity: number,
        public productId: string,
        public warehouseId: string,
        public reason?: string,
        public reference?: string,
        public createdAt?: Date
    ) {}

    public static fromObject(object: { [key: string]: any }): StockMovementEntity {
        const { id, type, quantity, productId, warehouseId, reason, reference, createdAt } = object;
        if (!id) throw new Error('StockMovement id is required');
        if (!type) throw new Error('StockMovement type is required');
        if (quantity === undefined || quantity === null) throw new Error('StockMovement quantity is required');
        if (!productId) throw new Error('StockMovement productId is required');
        if (!warehouseId) throw new Error('StockMovement warehouseId is required');
        return new StockMovementEntity(id, type, quantity, productId, warehouseId, reason, reference, createdAt);
    }
}
