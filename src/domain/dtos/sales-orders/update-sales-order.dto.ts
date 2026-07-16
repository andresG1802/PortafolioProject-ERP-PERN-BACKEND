import { SalesOrderItemInput, validateSalesOrderItems } from './create-sales-order.dto';

export class UpdateSalesOrderDto {
    private constructor(
        public readonly id: string,
        public readonly customerId?: string,
        public readonly warehouseId?: string,
        public readonly notes?: string,
        public readonly items?: SalesOrderItemInput[]
    ) {}

    get values() {
        const obj: { [key: string]: any } = {};
        if (this.customerId !== undefined) obj.customerId = this.customerId;
        if (this.warehouseId !== undefined) obj.warehouseId = this.warehouseId;
        if (this.notes !== undefined) obj.notes = this.notes;
        return obj;
    }

    static create(props: { [key: string]: any }): [string?, UpdateSalesOrderDto?] {
        const { id, customerId, warehouseId, notes, items } = props;
        if (!id) return ['Id is required'];

        let parsedItems: SalesOrderItemInput[] | undefined;
        if (items !== undefined) {
            const [itemsError, validItems] = validateSalesOrderItems(items);
            if (itemsError) return [itemsError];
            parsedItems = validItems;
        }

        return [undefined, new UpdateSalesOrderDto(id, customerId, warehouseId, notes, parsedItems)];
    }
}
