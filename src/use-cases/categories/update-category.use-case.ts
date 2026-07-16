import { UpdateCategoryDto } from '../../domain/dtos';
import { CategoryRepository } from '../../domain/repositories/category.repository';

export class UpdateCategoryUseCase {
    constructor(private readonly categoryRepository: CategoryRepository) {}
    execute(dto: UpdateCategoryDto) { return this.categoryRepository.updateCategory(dto); }
}
