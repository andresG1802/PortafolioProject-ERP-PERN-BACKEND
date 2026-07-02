import { CreateProductDto, UpdateProductDto } from '../dtos';
import { ProductEntity } from '../entities/product.entity';

export abstract class ProductRepository {
    abstract createProduct(dto: CreateProductDto): Promise<ProductEntity>;
    abstract getProducts(): Promise<ProductEntity[]>;
    abstract getProductById(id: string): Promise<ProductEntity>;
    abstract updateProduct(dto: UpdateProductDto): Promise<ProductEntity>;
    abstract deleteProduct(id: string): Promise<ProductEntity>;
}
