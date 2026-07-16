export class CustomerEntity {
    constructor(
        public id: string,
        public name: string,
        public email?: string,
        public phone?: string,
        public address?: string,
        public createdAt?: Date,
        public updatedAt?: Date
    ) {}

    public static fromObject(object: { [key: string]: any }): CustomerEntity {
        const { id, name, email, phone, address, createdAt, updatedAt } = object;
        if (!id) throw new Error('Customer id is required');
        if (!name) throw new Error('Customer name is required');
        return new CustomerEntity(id, name, email, phone, address, createdAt, updatedAt);
    }
}
