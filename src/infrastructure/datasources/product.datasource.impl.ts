import { PrismaClient } from '@prisma/client';
import { prisma } from '../database/prisma.client';
import { CreateProductDto, UpdateProductDto } from '../../domain/dtos';
import { ProductDataSource } from '../../domain/datasources/product.datasource';
import { ProductEntity } from '../../domain/entities/product.entity';
import { CustomError } from '../../domain/errors/custom.error';

export class ProductDataSourceImpl implements ProductDataSource {
    constructor(private readonly db: PrismaClient = prisma) {}

    async createProduct(dto: CreateProductDto): Promise<ProductEntity> {
        const product = await this.db.product.create({ data: dto });
        return ProductEntity.fromObject(product);
    }

    async getProducts(): Promise<ProductEntity[]> {
        const products = await this.db.product.findMany({ orderBy: { createdAt: 'desc' } });
        return products.map(ProductEntity.fromObject);
    }

    async getProductById(id: string): Promise<ProductEntity> {
        const product = await this.db.product.findUnique({ where: { id } });
        if (!product) throw CustomError.notFound('Product not found');
        return ProductEntity.fromObject(product);
    }

    async updateProduct(dto: UpdateProductDto): Promise<ProductEntity> {
        await this.getProductById(dto.id);
        const product = await this.db.product.update({ where: { id: dto.id }, data: dto.values });
        return ProductEntity.fromObject(product);
    }

    async deleteProduct(id: string): Promise<ProductEntity> {
        await this.getProductById(id);
        const product = await this.db.product.delete({ where: { id } });
        return ProductEntity.fromObject(product);
    }
}
