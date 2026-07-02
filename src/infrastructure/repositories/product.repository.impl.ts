import { CreateProductDto, UpdateProductDto } from '../../domain/dtos';
import { ProductDataSource } from '../../domain/datasources/product.datasource';
import { ProductEntity } from '../../domain/entities/product.entity';
import { ProductRepository } from '../../domain/repositories/product.repository';

export class ProductRepositoryImpl implements ProductRepository {
    constructor(private readonly datasource: ProductDataSource) {}

    createProduct(dto: CreateProductDto): Promise<ProductEntity> { return this.datasource.createProduct(dto); }
    getProducts(): Promise<ProductEntity[]> { return this.datasource.getProducts(); }
    getProductById(id: string): Promise<ProductEntity> { return this.datasource.getProductById(id); }
    updateProduct(dto: UpdateProductDto): Promise<ProductEntity> { return this.datasource.updateProduct(dto); }
    deleteProduct(id: string): Promise<ProductEntity> { return this.datasource.deleteProduct(id); }
}
