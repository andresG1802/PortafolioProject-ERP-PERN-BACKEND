import { Request, Response } from 'express';
import { CreateProductDto, UpdateProductDto } from '../../domain/dtos';
import { CreateProductUseCase } from '../../use-cases/products/create-product.use-case';
import { GetProductsUseCase } from '../../use-cases/products/get-products.use-case';
import { GetProductByIdUseCase } from '../../use-cases/products/get-product-by-id.use-case';
import { UpdateProductUseCase } from '../../use-cases/products/update-product.use-case';
import { DeleteProductUseCase } from '../../use-cases/products/delete-product.use-case';
import { ProductRepositoryImpl } from '../../infrastructure/repositories/product.repository.impl';
import { ProductDataSourceImpl } from '../../infrastructure/datasources/product.datasource.impl';
import { handleError } from '../shared/handle-error';

export class ProductController {
    private readonly productRepository = new ProductRepositoryImpl(new ProductDataSourceImpl());

    create = (req: Request, res: Response) => {
        const [error, dto] = CreateProductDto.create(req.body);
        if (error) { res.status(400).json({ error }); return; }

        new CreateProductUseCase(this.productRepository)
            .execute(dto!)
            .then(product => res.status(201).json(product))
            .catch(err => handleError(err, res));
    };

    getAll = (_req: Request, res: Response) => {
        new GetProductsUseCase(this.productRepository)
            .execute()
            .then(products => res.json(products))
            .catch(err => handleError(err, res));
    };

    getById = (req: Request, res: Response) => {
        new GetProductByIdUseCase(this.productRepository)
            .execute(String(req.params['id']))
            .then(product => res.json(product))
            .catch(err => handleError(err, res));
    };

    update = (req: Request, res: Response) => {
        const [error, dto] = UpdateProductDto.create({ ...req.body, id: req.params['id'] });
        if (error) { res.status(400).json({ error }); return; }

        new UpdateProductUseCase(this.productRepository)
            .execute(dto!)
            .then(product => res.json(product))
            .catch(err => handleError(err, res));
    };

    delete = (req: Request, res: Response) => {
        new DeleteProductUseCase(this.productRepository)
            .execute(String(req.params['id']))
            .then(product => res.json(product))
            .catch(err => handleError(err, res));
    };
}
