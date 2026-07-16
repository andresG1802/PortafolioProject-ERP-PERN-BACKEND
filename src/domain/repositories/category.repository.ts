import { CreateCategoryDto, UpdateCategoryDto } from '../dtos';
import { CategoryEntity } from '../entities/category.entity';

export abstract class CategoryRepository {
    abstract createCategory(dto: CreateCategoryDto): Promise<CategoryEntity>;
    abstract getCategories(): Promise<CategoryEntity[]>;
    abstract getCategoryById(id: string): Promise<CategoryEntity>;
    abstract updateCategory(dto: UpdateCategoryDto): Promise<CategoryEntity>;
    abstract deleteCategory(id: string): Promise<CategoryEntity>;
}
