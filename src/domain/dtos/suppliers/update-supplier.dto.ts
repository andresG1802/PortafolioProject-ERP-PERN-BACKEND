export class UpdateSupplierDto {
    private constructor(
        public readonly id: string,
        public readonly name?: string,
        public readonly email?: string,
        public readonly phone?: string,
        public readonly address?: string
    ) {}

    get values() {
        const obj: { [key: string]: any } = {};
        if (this.name !== undefined) obj.name = this.name;
        if (this.email !== undefined) obj.email = this.email;
        if (this.phone !== undefined) obj.phone = this.phone;
        if (this.address !== undefined) obj.address = this.address;
        return obj;
    }

    static create(props: { [key: string]: any }): [string?, UpdateSupplierDto?] {
        const { id, name, email, phone, address } = props;
        if (!id) return ['Id is required'];
        return [undefined, new UpdateSupplierDto(id, name, email, phone, address)];
    }
}
