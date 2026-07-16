interface PurchaseOrderItemInput {
    productId: string;
    quantity: number;
    unitCost: number;
}

function validateItems(items: any): [string?, PurchaseOrderItemInput[]?] {
    if (!Array.isArray(items) || items.length === 0) return ['Items must be a non-empty array'];
    const parsed: PurchaseOrderItemInput[] = [];
    for (const item of items) {
        const { productId, quantity, unitCost } = item ?? {};
        if (!productId) return ['Each item requires a productId'];
        if (quantity === undefined || quantity === null || isNaN(Number(quantity)) || !Number.isInteger(Number(quantity)) || Number(quantity) <= 0) {
            return ['Each item requires a positive integer quantity'];
        }
        if (unitCost === undefined || unitCost === null || isNaN(Number(unitCost)) || Number(unitCost) < 0) {
            return ['Each item requires a non-negative unitCost'];
        }
        parsed.push({ productId, quantity: Number(quantity), unitCost: Number(unitCost) });
    }
    return [undefined, parsed];
}

export class CreatePurchaseOrderDto {
    private constructor(
        public readonly supplierId: string,
        public readonly warehouseId: string,
        public readonly items: PurchaseOrderItemInput[],
        public readonly notes?: string
    ) {}

    static create(props: { [key: string]: any }): [string?, CreatePurchaseOrderDto?] {
        const { supplierId, warehouseId, items, notes } = props;
        if (!supplierId) return ['SupplierId is required'];
        if (!warehouseId) return ['WarehouseId is required'];
        const [itemsError, parsedItems] = validateItems(items);
        if (itemsError) return [itemsError];
        return [undefined, new CreatePurchaseOrderDto(supplierId, warehouseId, parsedItems!, notes)];
    }
}

export { validateItems as validatePurchaseOrderItems, PurchaseOrderItemInput };
