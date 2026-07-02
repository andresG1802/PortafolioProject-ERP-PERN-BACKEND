export class ProductEntity {
    constructor(
        public id: string,
        public name: string,
        public price: number,
        public stock: number,
        public description?: string,
        public category?: string,
        public createdAt?: Date,
        public updatedAt?: Date
    ) {}

    public static fromObject(object: { [key: string]: any }): ProductEntity {
        const { id, name, price, stock, description, category, createdAt, updatedAt } = object;
        if (!id) throw new Error('Product id is required');
        if (!name) throw new Error('Product name is required');
        if (price === undefined || price === null) throw new Error('Product price is required');
        if (stock === undefined || stock === null) throw new Error('Product stock is required');
        return new ProductEntity(id, name, price, stock, description, category, createdAt, updatedAt);
    }
}
