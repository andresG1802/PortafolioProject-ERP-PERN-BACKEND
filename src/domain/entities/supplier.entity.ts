export class SupplierEntity {
    constructor(
        public id: string,
        public name: string,
        public email?: string,
        public phone?: string,
        public address?: string,
        public createdAt?: Date,
        public updatedAt?: Date
    ) {}

    public static fromObject(object: { [key: string]: any }): SupplierEntity {
        const { id, name, email, phone, address, createdAt, updatedAt } = object;
        if (!id) throw new Error('Supplier id is required');
        if (!name) throw new Error('Supplier name is required');
        return new SupplierEntity(id, name, email, phone, address, createdAt, updatedAt);
    }
}
