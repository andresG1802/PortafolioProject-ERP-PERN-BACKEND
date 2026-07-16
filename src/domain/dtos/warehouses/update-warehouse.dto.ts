export class UpdateWarehouseDto {
    private constructor(
        public readonly id: string,
        public readonly name?: string,
        public readonly location?: string
    ) {}

    get values() {
        const obj: { [key: string]: any } = {};
        if (this.name !== undefined) obj.name = this.name;
        if (this.location !== undefined) obj.location = this.location;
        return obj;
    }

    static create(props: { [key: string]: any }): [string?, UpdateWarehouseDto?] {
        const { id, name, location } = props;
        if (!id) return ['Id is required'];
        return [undefined, new UpdateWarehouseDto(id, name, location)];
    }
}
