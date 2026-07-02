import { Request, Response } from 'express';
import { UpdateUserDto } from '../../domain/dtos';
import { GetUsersUseCase } from '../../use-cases/users/get-users.use-case';
import { GetUserByIdUseCase } from '../../use-cases/users/get-user-by-id.use-case';
import { UpdateUserUseCase } from '../../use-cases/users/update-user.use-case';
import { DeleteUserUseCase } from '../../use-cases/users/delete-user.use-case';
import { UserRepositoryImpl } from '../../infrastructure/repositories/user.repository.impl';
import { UserDataSourceImpl } from '../../infrastructure/datasources/user.datasource.impl';
import { handleError } from '../shared/handle-error';

export class UserController {
    private readonly userRepository = new UserRepositoryImpl(new UserDataSourceImpl());

    getAll = (_req: Request, res: Response) => {
        new GetUsersUseCase(this.userRepository)
            .execute()
            .then(users => res.json(users))
            .catch(err => handleError(err, res));
    };

    getById = (req: Request, res: Response) => {
        new GetUserByIdUseCase(this.userRepository)
            .execute(String(req.params['id']))
            .then(user => res.json(user))
            .catch(err => handleError(err, res));
    };

    update = (req: Request, res: Response) => {
        const [error, dto] = UpdateUserDto.create({ ...req.body, id: req.params['id'] });
        if (error) { res.status(400).json({ error }); return; }

        new UpdateUserUseCase(this.userRepository)
            .execute(dto!)
            .then(user => res.json(user))
            .catch(err => handleError(err, res));
    };

    delete = (req: Request, res: Response) => {
        new DeleteUserUseCase(this.userRepository)
            .execute(String(req.params['id']))
            .then(user => res.json(user))
            .catch(err => handleError(err, res));
    };
}
