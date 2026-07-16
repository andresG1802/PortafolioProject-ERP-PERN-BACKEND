import { CategoryRepository } from '../../domain/repositories/category.repository';

export class DeleteCategoryUseCase {
    constructor(private readonly categoryRepository: CategoryRepository) {}
    execute(id: string) { return this.categoryRepository.deleteCategory(id); }
}
