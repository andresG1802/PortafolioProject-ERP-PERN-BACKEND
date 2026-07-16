import { Request, Response, NextFunction } from 'express';
import { JwtAdapter } from '../../config/jwt.adapter';
import { UserDataSourceImpl } from '../../infrastructure/datasources/user.datasource.impl';
import { UserRepositoryImpl } from '../../infrastructure/repositories/user.repository.impl';
import { CustomError } from '../../domain/errors/custom.error';

const userRepository = new UserRepositoryImpl(new UserDataSourceImpl());

export const authMiddleware = async (req: Request, res: Response, next: NextFunction) => {
    const authorization = req.headers['authorization'];
    if (!authorization || !authorization.startsWith('Bearer ')) {
        res.status(401).json({ error: 'No token provided' });
        return;
    }

    const token = authorization.split(' ')[1] ?? '';

    try {
        const payload = await JwtAdapter.verifyToken<{ id: string; email: string }>(token);
        const user = await userRepository.getUserById(payload.id);
        req.body = { ...(req.body ?? {}), user };
        next();
    } catch {
        res.status(401).json({ error: 'Invalid or expired token' });
    }
};
