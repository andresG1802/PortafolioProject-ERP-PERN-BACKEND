export class UpdateProductDto {
    private constructor(
        public readonly id: string,
        public readonly name?: string,
        public readonly price?: number,
        public readonly stock?: number,
        public readonly description?: string,
        public readonly category?: string
    ) {}

    get values() {
        const obj: { [key: string]: any } = {};
        if (this.name !== undefined) obj.name = this.name;
        if (this.price !== undefined) obj.price = this.price;
        if (this.stock !== undefined) obj.stock = this.stock;
        if (this.description !== undefined) obj.description = this.description;
        if (this.category !== undefined) obj.category = this.category;
        return obj;
    }

    static create(props: { [key: string]: any }): [string?, UpdateProductDto?] {
        const { id, name, price, stock, description, category } = props;
        if (!id) return ['Id is required'];
        if (price !== undefined && (isNaN(Number(price)) || Number(price) < 0)) return ['Price must be a non-negative number'];
        if (stock !== undefined && (isNaN(Number(stock)) || Number(stock) < 0)) return ['Stock must be a non-negative number'];
        return [undefined, new UpdateProductDto(
            id,
            name,
            price !== undefined ? Number(price) : undefined,
            stock !== undefined ? Number(stock) : undefined,
            description,
            category
        )];
    }
}
