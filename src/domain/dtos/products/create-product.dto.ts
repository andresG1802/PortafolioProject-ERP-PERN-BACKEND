export class CreateProductDto {
    private constructor(
        public readonly name: string,
        public readonly price: number,
        public readonly description?: string,
        public readonly categoryId?: string,
        public readonly supplierId?: string
    ) {}

    static create(props: { [key: string]: any }): [string?, CreateProductDto?] {
        const { name, price, description, categoryId, supplierId } = props;
        if (!name) return ['Name is required'];
        if (price === undefined || price === null) return ['Price is required'];
        if (isNaN(Number(price)) || Number(price) < 0) return ['Price must be a non-negative number'];
        return [undefined, new CreateProductDto(name, Number(price), description, categoryId, supplierId)];
    }
}
