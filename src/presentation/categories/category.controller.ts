import { Request, Response } from 'express';
import { CreateCategoryDto, UpdateCategoryDto } from '../../domain/dtos';
import { CreateCategoryUseCase } from '../../use-cases/categories/create-category.use-case';
import { GetCategoriesUseCase } from '../../use-cases/categories/get-categories.use-case';
import { GetCategoryByIdUseCase } from '../../use-cases/categories/get-category-by-id.use-case';
import { UpdateCategoryUseCase } from '../../use-cases/categories/update-category.use-case';
import { DeleteCategoryUseCase } from '../../use-cases/categories/delete-category.use-case';
import { CategoryRepositoryImpl } from '../../infrastructure/repositories/category.repository.impl';
import { CategoryDataSourceImpl } from '../../infrastructure/datasources/category.datasource.impl';
import { handleError } from '../shared/handle-error';

export class CategoryController {
    private readonly categoryRepository = new CategoryRepositoryImpl(new CategoryDataSourceImpl());

    create = (req: Request, res: Response) => {
        const [error, dto] = CreateCategoryDto.create(req.body);
        if (error) { res.status(400).json({ error }); return; }

        new CreateCategoryUseCase(this.categoryRepository)
            .execute(dto!)
            .then(category => res.status(201).json(category))
            .catch(err => handleError(err, res));
    };

    getAll = (_req: Request, res: Response) => {
        new GetCategoriesUseCase(this.categoryRepository)
            .execute()
            .then(categories => res.json(categories))
            .catch(err => handleError(err, res));
    };

    getById = (req: Request, res: Response) => {
        new GetCategoryByIdUseCase(this.categoryRepository)
            .execute(String(req.params['id']))
            .then(category => res.json(category))
            .catch(err => handleError(err, res));
    };

    update = (req: Request, res: Response) => {
        const [error, dto] = UpdateCategoryDto.create({ ...req.body, id: req.params['id'] });
        if (error) { res.status(400).json({ error }); return; }

        new UpdateCategoryUseCase(this.categoryRepository)
            .execute(dto!)
            .then(category => res.json(category))
            .catch(err => handleError(err, res));
    };

    delete = (req: Request, res: Response) => {
        new DeleteCategoryUseCase(this.categoryRepository)
            .execute(String(req.params['id']))
            .then(category => res.json(category))
            .catch(err => handleError(err, res));
    };
}
