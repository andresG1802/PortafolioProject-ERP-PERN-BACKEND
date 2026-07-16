interface SalesOrderItemInput {
    productId: string;
    quantity: number;
    unitPrice: number;
}

function validateItems(items: any): [string?, SalesOrderItemInput[]?] {
    if (!Array.isArray(items) || items.length === 0) return ['Items must be a non-empty array'];
    const parsed: SalesOrderItemInput[] = [];
    for (const item of items) {
        const { productId, quantity, unitPrice } = item ?? {};
        if (!productId) return ['Each item requires a productId'];
        if (quantity === undefined || quantity === null || isNaN(Number(quantity)) || !Number.isInteger(Number(quantity)) || Number(quantity) <= 0) {
            return ['Each item requires a positive integer quantity'];
        }
        if (unitPrice === undefined || unitPrice === null || isNaN(Number(unitPrice)) || Number(unitPrice) < 0) {
            return ['Each item requires a non-negative unitPrice'];
        }
        parsed.push({ productId, quantity: Number(quantity), unitPrice: Number(unitPrice) });
    }
    return [undefined, parsed];
}

export class CreateSalesOrderDto {
    private constructor(
        public readonly customerId: string,
        public readonly warehouseId: string,
        public readonly items: SalesOrderItemInput[],
        public readonly notes?: string
    ) {}

    static create(props: { [key: string]: any }): [string?, CreateSalesOrderDto?] {
        const { customerId, warehouseId, items, notes } = props;
        if (!customerId) return ['CustomerId is required'];
        if (!warehouseId) return ['WarehouseId is required'];
        const [itemsError, parsedItems] = validateItems(items);
        if (itemsError) return [itemsError];
        return [undefined, new CreateSalesOrderDto(customerId, warehouseId, parsedItems!, notes)];
    }
}

export { validateItems as validateSalesOrderItems, SalesOrderItemInput };
