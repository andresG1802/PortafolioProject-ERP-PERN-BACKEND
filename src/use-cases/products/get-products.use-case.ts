import { ProductRepository } from '../../domain/repositories/product.repository';

export class GetProductsUseCase {
    constructor(private readonly productRepository: ProductRepository) {}
    execute() { return this.productRepository.getProducts(); }
}
