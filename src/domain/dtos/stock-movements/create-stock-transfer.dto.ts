export class CreateStockTransferDto {
    private constructor(
        public readonly productId: string,
        public readonly fromWarehouseId: string,
        public readonly toWarehouseId: string,
        public readonly quantity: number,
        public readonly reason?: string
    ) {}

    static create(props: { [key: string]: any }): [string?, CreateStockTransferDto?] {
        const { productId, fromWarehouseId, toWarehouseId, quantity, reason } = props;
        if (!productId) return ['ProductId is required'];
        if (!fromWarehouseId) return ['FromWarehouseId is required'];
        if (!toWarehouseId) return ['ToWarehouseId is required'];
        if (fromWarehouseId === toWarehouseId) return ['FromWarehouseId and toWarehouseId must be different'];
        if (quantity === undefined || quantity === null || isNaN(Number(quantity)) || !Number.isInteger(Number(quantity)) || Number(quantity) <= 0) {
            return ['Quantity must be a positive integer'];
        }
        return [undefined, new CreateStockTransferDto(productId, fromWarehouseId, toWarehouseId, Number(quantity), reason)];
    }
}
