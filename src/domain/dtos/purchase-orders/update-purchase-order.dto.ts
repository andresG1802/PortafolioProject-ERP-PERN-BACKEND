import { PurchaseOrderItemInput, validatePurchaseOrderItems } from './create-purchase-order.dto';

export class UpdatePurchaseOrderDto {
    private constructor(
        public readonly id: string,
        public readonly supplierId?: string,
        public readonly warehouseId?: string,
        public readonly notes?: string,
        public readonly items?: PurchaseOrderItemInput[]
    ) {}

    get values() {
        const obj: { [key: string]: any } = {};
        if (this.supplierId !== undefined) obj.supplierId = this.supplierId;
        if (this.warehouseId !== undefined) obj.warehouseId = this.warehouseId;
        if (this.notes !== undefined) obj.notes = this.notes;
        return obj;
    }

    static create(props: { [key: string]: any }): [string?, UpdatePurchaseOrderDto?] {
        const { id, supplierId, warehouseId, notes, items } = props;
        if (!id) return ['Id is required'];

        let parsedItems: PurchaseOrderItemInput[] | undefined;
        if (items !== undefined) {
            const [itemsError, validItems] = validatePurchaseOrderItems(items);
            if (itemsError) return [itemsError];
            parsedItems = validItems;
        }

        return [undefined, new UpdatePurchaseOrderDto(id, supplierId, warehouseId, notes, parsedItems)];
    }
}
