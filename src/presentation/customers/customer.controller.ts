import { Request, Response } from 'express';
import { CreateCustomerDto, UpdateCustomerDto } from '../../domain/dtos';
import { CreateCustomerUseCase } from '../../use-cases/customers/create-customer.use-case';
import { GetCustomersUseCase } from '../../use-cases/customers/get-customers.use-case';
import { GetCustomerByIdUseCase } from '../../use-cases/customers/get-customer-by-id.use-case';
import { UpdateCustomerUseCase } from '../../use-cases/customers/update-customer.use-case';
import { DeleteCustomerUseCase } from '../../use-cases/customers/delete-customer.use-case';
import { CustomerRepositoryImpl } from '../../infrastructure/repositories/customer.repository.impl';
import { CustomerDataSourceImpl } from '../../infrastructure/datasources/customer.datasource.impl';
import { handleError } from '../shared/handle-error';

export class CustomerController {
    private readonly customerRepository = new CustomerRepositoryImpl(new CustomerDataSourceImpl());

    create = (req: Request, res: Response) => {
        const [error, dto] = CreateCustomerDto.create(req.body);
        if (error) { res.status(400).json({ error }); return; }

        new CreateCustomerUseCase(this.customerRepository)
            .execute(dto!)
            .then(customer => res.status(201).json(customer))
            .catch(err => handleError(err, res));
    };

    getAll = (_req: Request, res: Response) => {
        new GetCustomersUseCase(this.customerRepository)
            .execute()
            .then(customers => res.json(customers))
            .catch(err => handleError(err, res));
    };

    getById = (req: Request, res: Response) => {
        new GetCustomerByIdUseCase(this.customerRepository)
            .execute(String(req.params['id']))
            .then(customer => res.json(customer))
            .catch(err => handleError(err, res));
    };

    update = (req: Request, res: Response) => {
        const [error, dto] = UpdateCustomerDto.create({ ...req.body, id: req.params['id'] });
        if (error) { res.status(400).json({ error }); return; }

        new UpdateCustomerUseCase(this.customerRepository)
            .execute(dto!)
            .then(customer => res.json(customer))
            .catch(err => handleError(err, res));
    };

    delete = (req: Request, res: Response) => {
        new DeleteCustomerUseCase(this.customerRepository)
            .execute(String(req.params['id']))
            .then(customer => res.json(customer))
            .catch(err => handleError(err, res));
    };
}
