export class UpdateCategoryDto {
    private constructor(
        public readonly id: string,
        public readonly name?: string,
        public readonly description?: string
    ) {}

    get values() {
        const obj: { [key: string]: any } = {};
        if (this.name !== undefined) obj.name = this.name;
        if (this.description !== undefined) obj.description = this.description;
        return obj;
    }

    static create(props: { [key: string]: any }): [string?, UpdateCategoryDto?] {
        const { id, name, description } = props;
        if (!id) return ['Id is required'];
        return [undefined, new UpdateCategoryDto(id, name, description)];
    }
}
