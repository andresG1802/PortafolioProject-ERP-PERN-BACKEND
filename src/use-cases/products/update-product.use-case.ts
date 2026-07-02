import { UpdateProductDto } from '../../domain/dtos';
import { ProductRepository } from '../../domain/repositories/product.repository';

export class UpdateProductUseCase {
    constructor(private readonly productRepository: ProductRepository) {}
    execute(dto: UpdateProductDto) { return this.productRepository.updateProduct(dto); }
}
