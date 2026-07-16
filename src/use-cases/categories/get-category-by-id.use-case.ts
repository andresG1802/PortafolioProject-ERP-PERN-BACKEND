import { CategoryRepository } from '../../domain/repositories/category.repository';

export class GetCategoryByIdUseCase {
    constructor(private readonly categoryRepository: CategoryRepository) {}
    execute(id: string) { return this.categoryRepository.getCategoryById(id); }
}
