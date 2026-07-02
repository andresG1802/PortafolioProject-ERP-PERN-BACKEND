import { ProductRepository } from '../../domain/repositories/product.repository';

export class GetProductByIdUseCase {
    constructor(private readonly productRepository: ProductRepository) {}
    execute(id: string) { return this.productRepository.getProductById(id); }
}
