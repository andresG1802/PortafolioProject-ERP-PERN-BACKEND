export class CategoryEntity {
    constructor(
        public id: string,
        public name: string,
        public description?: string,
        public createdAt?: Date,
        public updatedAt?: Date
    ) {}

    public static fromObject(object: { [key: string]: any }): CategoryEntity {
        const { id, name, description, createdAt, updatedAt } = object;
        if (!id) throw new Error('Category id is required');
        if (!name) throw new Error('Category name is required');
        return new CategoryEntity(id, name, description, createdAt, updatedAt);
    }
}
