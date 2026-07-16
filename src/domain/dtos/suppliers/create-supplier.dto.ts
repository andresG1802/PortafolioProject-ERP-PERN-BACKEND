export class CreateSupplierDto {
    private constructor(
        public readonly name: string,
        public readonly email?: string,
        public readonly phone?: string,
        public readonly address?: string
    ) {}

    static create(props: { [key: string]: any }): [string?, CreateSupplierDto?] {
        const { name, email, phone, address } = props;
        if (!name) return ['Name is required'];
        return [undefined, new CreateSupplierDto(name, email, phone, address)];
    }
}
