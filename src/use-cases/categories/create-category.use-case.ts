import { CreateCategoryDto } from '../../domain/dtos';
import { CategoryRepository } from '../../domain/repositories/category.repository';

export class CreateCategoryUseCase {
    constructor(private readonly categoryRepository: CategoryRepository) {}
    execute(dto: CreateCategoryDto) { return this.categoryRepository.createCategory(dto); }
}
