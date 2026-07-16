const ALLOWED_TYPES = ['IN', 'OUT', 'ADJUSTMENT'] as const;
type CreatableMovementType = (typeof ALLOWED_TYPES)[number];

export class CreateStockMovementDto {
    private constructor(
        public readonly type: CreatableMovementType,
        public readonly quantity: number,
        public readonly productId: string,
        public readonly warehouseId: string,
        public readonly reason?: string,
        public readonly reference?: string
    ) {}

    static create(props: { [key: string]: any }): [string?, CreateStockMovementDto?] {
        const { type, quantity, productId, warehouseId, reason, reference } = props;
        if (!type || !ALLOWED_TYPES.includes(type)) return [`Type must be one of ${ALLOWED_TYPES.join(', ')}`];
        if (!productId) return ['ProductId is required'];
        if (!warehouseId) return ['WarehouseId is required'];
        if (quantity === undefined || quantity === null || isNaN(Number(quantity)) || !Number.isInteger(Number(quantity))) {
            return ['Quantity must be an integer'];
        }
        const qty = Number(quantity);
        if (type === 'ADJUSTMENT') {
            if (qty === 0) return ['Quantity must not be zero'];
        } else if (qty <= 0) {
            return ['Quantity must be a positive number'];
        }
        return [undefined, new CreateStockMovementDto(type, qty, productId, warehouseId, reason, reference)];
    }
}
