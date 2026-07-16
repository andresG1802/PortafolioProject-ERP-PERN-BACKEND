import { PrismaClient } from '@prisma/client';
import { prisma } from '../database/prisma.client';
import { CreateCategoryDto, UpdateCategoryDto } from '../../domain/dtos';
import { CategoryDataSource } from '../../domain/datasources/category.datasource';
import { CategoryEntity } from '../../domain/entities/category.entity';
import { CustomError } from '../../domain/errors/custom.error';

export class CategoryDataSourceImpl implements CategoryDataSource {
    constructor(private readonly db: PrismaClient = prisma) {}

    async createCategory(dto: CreateCategoryDto): Promise<CategoryEntity> {
        const category = await this.db.category.create({ data: dto });
        return CategoryEntity.fromObject(category);
    }

    async getCategories(): Promise<CategoryEntity[]> {
        const categories = await this.db.category.findMany({ orderBy: { name: 'asc' } });
        return categories.map(CategoryEntity.fromObject);
    }

    async getCategoryById(id: string): Promise<CategoryEntity> {
        const category = await this.db.category.findUnique({ where: { id } });
        if (!category) throw CustomError.notFound('Category not found');
        return CategoryEntity.fromObject(category);
    }

    async updateCategory(dto: UpdateCategoryDto): Promise<CategoryEntity> {
        await this.getCategoryById(dto.id);
        const category = await this.db.category.update({ where: { id: dto.id }, data: dto.values });
        return CategoryEntity.fromObject(category);
    }

    async deleteCategory(id: string): Promise<CategoryEntity> {
        await this.getCategoryById(id);
        const category = await this.db.category.delete({ where: { id } });
        return CategoryEntity.fromObject(category);
    }
}
