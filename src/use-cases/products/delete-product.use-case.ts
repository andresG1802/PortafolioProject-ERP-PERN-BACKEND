import { ProductRepository } from '../../domain/repositories/product.repository';

export class DeleteProductUseCase {
    constructor(private readonly productRepository: ProductRepository) {}
    execute(id: string) { return this.productRepository.deleteProduct(id); }
}
