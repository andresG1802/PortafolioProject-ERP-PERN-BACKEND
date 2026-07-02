import { CreateProductDto } from '../../domain/dtos';
import { ProductRepository } from '../../domain/repositories/product.repository';

export class CreateProductUseCase {
    constructor(private readonly productRepository: ProductRepository) {}
    execute(dto: CreateProductDto) { return this.productRepository.createProduct(dto); }
}
