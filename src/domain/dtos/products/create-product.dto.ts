export class CreateProductDto {
    private constructor(
        public readonly name: string,
        public readonly price: number,
        public readonly stock: number,
        public readonly description?: string,
        public readonly category?: string
    ) {}

    static create(props: { [key: string]: any }): [string?, CreateProductDto?] {
        const { name, price, stock, description, category } = props;
        if (!name) return ['Name is required'];
        if (price === undefined || price === null) return ['Price is required'];
        if (isNaN(Number(price)) || Number(price) < 0) return ['Price must be a non-negative number'];
        if (stock === undefined || stock === null) return ['Stock is required'];
        if (isNaN(Number(stock)) || Number(stock) < 0) return ['Stock must be a non-negative number'];
        return [undefined, new CreateProductDto(name, Number(price), Number(stock), description, category)];
    }
}
