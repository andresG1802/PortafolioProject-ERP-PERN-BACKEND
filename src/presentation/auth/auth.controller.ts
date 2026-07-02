import { Request, Response } from 'express';
import { RegisterUserDto, LoginUserDto } from '../../domain/dtos';
import { RegisterUseCase } from '../../use-cases/auth/register.use-case';
import { LoginUseCase } from '../../use-cases/auth/login.use-case';
import { UserRepositoryImpl } from '../../infrastructure/repositories/user.repository.impl';
import { UserDataSourceImpl } from '../../infrastructure/datasources/user.datasource.impl';
import { handleError } from '../shared/handle-error';

export class AuthController {
    private readonly userRepository = new UserRepositoryImpl(new UserDataSourceImpl());

    register = async (req: Request, res: Response) => {
        const [error, dto] = RegisterUserDto.create(req.body);
        if (error) { res.status(400).json({ error }); return; }

        new RegisterUseCase(this.userRepository)
            .execute(dto!)
            .then(data => res.status(201).json(data))
            .catch(err => handleError(err, res));
    };

    login = async (req: Request, res: Response) => {
        const [error, dto] = LoginUserDto.create(req.body);
        if (error) { res.status(400).json({ error }); return; }

        new LoginUseCase(this.userRepository)
            .execute(dto!)
            .then(data => res.json(data))
            .catch(err => handleError(err, res));
    };
}
