import { CreateCategoryDto, UpdateCategoryDto } from '../../domain/dtos';
import { CategoryDataSource } from '../../domain/datasources/category.datasource';
import { CategoryEntity } from '../../domain/entities/category.entity';
import { CategoryRepository } from '../../domain/repositories/category.repository';

export class CategoryRepositoryImpl implements CategoryRepository {
    constructor(private readonly datasource: CategoryDataSource) {}

    createCategory(dto: CreateCategoryDto): Promise<CategoryEntity> { return this.datasource.createCategory(dto); }
    getCategories(): Promise<CategoryEntity[]> { return this.datasource.getCategories(); }
    getCategoryById(id: string): Promise<CategoryEntity> { return this.datasource.getCategoryById(id); }
    updateCategory(dto: UpdateCategoryDto): Promise<CategoryEntity> { return this.datasource.updateCategory(dto); }
    deleteCategory(id: string): Promise<CategoryEntity> { return this.datasource.deleteCategory(id); }
}
