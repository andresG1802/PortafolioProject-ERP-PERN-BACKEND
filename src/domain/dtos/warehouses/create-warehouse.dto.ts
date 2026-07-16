export class CreateWarehouseDto {
    private constructor(
        public readonly name: string,
        public readonly location?: string
    ) {}

    static create(props: { [key: string]: any }): [string?, CreateWarehouseDto?] {
        const { name, location } = props;
        if (!name) return ['Name is required'];
        return [undefined, new CreateWarehouseDto(name, location)];
    }
}
