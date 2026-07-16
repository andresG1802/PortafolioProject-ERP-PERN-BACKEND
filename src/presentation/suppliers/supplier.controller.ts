import { Request, Response } from 'express';
import { CreateSupplierDto, UpdateSupplierDto } from '../../domain/dtos';
import { CreateSupplierUseCase } from '../../use-cases/suppliers/create-supplier.use-case';
import { GetSuppliersUseCase } from '../../use-cases/suppliers/get-suppliers.use-case';
import { GetSupplierByIdUseCase } from '../../use-cases/suppliers/get-supplier-by-id.use-case';
import { UpdateSupplierUseCase } from '../../use-cases/suppliers/update-supplier.use-case';
import { DeleteSupplierUseCase } from '../../use-cases/suppliers/delete-supplier.use-case';
import { SupplierRepositoryImpl } from '../../infrastructure/repositories/supplier.repository.impl';
import { SupplierDataSourceImpl } from '../../infrastructure/datasources/supplier.datasource.impl';
import { handleError } from '../shared/handle-error';

export class SupplierController {
    private readonly supplierRepository = new SupplierRepositoryImpl(new SupplierDataSourceImpl());

    create = (req: Request, res: Response) => {
        const [error, dto] = CreateSupplierDto.create(req.body);
        if (error) { res.status(400).json({ error }); return; }

        new CreateSupplierUseCase(this.supplierRepository)
            .execute(dto!)
            .then(supplier => res.status(201).json(supplier))
            .catch(err => handleError(err, res));
    };

    getAll = (_req: Request, res: Response) => {
        new GetSuppliersUseCase(this.supplierRepository)
            .execute()
            .then(suppliers => res.json(suppliers))
            .catch(err => handleError(err, res));
    };

    getById = (req: Request, res: Response) => {
        new GetSupplierByIdUseCase(this.supplierRepository)
            .execute(String(req.params['id']))
            .then(supplier => res.json(supplier))
            .catch(err => handleError(err, res));
    };

    update = (req: Request, res: Response) => {
        const [error, dto] = UpdateSupplierDto.create({ ...req.body, id: req.params['id'] });
        if (error) { res.status(400).json({ error }); return; }

        new UpdateSupplierUseCase(this.supplierRepository)
            .execute(dto!)
            .then(supplier => res.json(supplier))
            .catch(err => handleError(err, res));
    };

    delete = (req: Request, res: Response) => {
        new DeleteSupplierUseCase(this.supplierRepository)
            .execute(String(req.params['id']))
            .then(supplier => res.json(supplier))
            .catch(err => handleError(err, res));
    };
}
