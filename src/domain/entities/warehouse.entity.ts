export class WarehouseEntity {
    constructor(
        public id: string,
        public name: string,
        public location?: string,
        public createdAt?: Date,
        public updatedAt?: Date
    ) {}

    public static fromObject(object: { [key: string]: any }): WarehouseEntity {
        const { id, name, location, createdAt, updatedAt } = object;
        if (!id) throw new Error('Warehouse id is required');
        if (!name) throw new Error('Warehouse name is required');
        return new WarehouseEntity(id, name, location, createdAt, updatedAt);
    }
}
