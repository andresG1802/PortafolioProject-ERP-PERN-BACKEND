export class UpdateProductDto {
    private constructor(
        public readonly id: string,
        public readonly name?: string,
        public readonly price?: number,
        public readonly description?: string,
        public readonly categoryId?: string,
        public readonly supplierId?: string
    ) {}

    get values() {
        const obj: { [key: string]: any } = {};
        if (this.name !== undefined) obj.name = this.name;
        if (this.price !== undefined) obj.price = this.price;
        if (this.description !== undefined) obj.description = this.description;
        if (this.categoryId !== undefined) obj.categoryId = this.categoryId;
        if (this.supplierId !== undefined) obj.supplierId = this.supplierId;
        return obj;
    }

    static create(props: { [key: string]: any }): [string?, UpdateProductDto?] {
        const { id, name, price, description, categoryId, supplierId } = props;
        if (!id) return ['Id is required'];
        if (price !== undefined && (isNaN(Number(price)) || Number(price) < 0)) return ['Price must be a non-negative number'];
        return [undefined, new UpdateProductDto(
            id,
            name,
            price !== undefined ? Number(price) : undefined,
            description,
            categoryId,
            supplierId
        )];
    }
}
