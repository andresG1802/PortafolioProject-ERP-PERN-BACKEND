export class ProductEntity {
    constructor(
        public id: string,
        public name: string,
        public price: number,
        public description?: string,
        public categoryId?: string,
        public supplierId?: string,
        public category?: { id: string; name: string } | null,
        public supplier?: { id: string; name: string } | null,
        public createdAt?: Date,
        public updatedAt?: Date
    ) {}

    public static fromObject(object: { [key: string]: any }): ProductEntity {
        const { id, name, price, description, categoryId, supplierId, category, supplier, createdAt, updatedAt } = object;
        if (!id) throw new Error('Product id is required');
        if (!name) throw new Error('Product name is required');
        if (price === undefined || price === null) throw new Error('Product price is required');
        return new ProductEntity(id, name, price, description, categoryId, supplierId, category, supplier, createdAt, updatedAt);
    }
}
