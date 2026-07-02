import bcryptjs from 'bcryptjs';
import { PrismaClient } from '@prisma/client';
import { prisma } from '../database/prisma.client';
import { CreateUserDto, UpdateUserDto } from '../../domain/dtos';
import { UserDataSource } from '../../domain/datasources/user.datasource';
import { UserEntity } from '../../domain/entities/user.entity';
import { CustomError } from '../../domain/errors/custom.error';

export class UserDataSourceImpl implements UserDataSource {
    constructor(private readonly db: PrismaClient = prisma) {}

    async getAllUsers(): Promise<UserEntity[]> {
        const users = await this.db.user.findMany({ orderBy: { createdAt: 'desc' } });
        return users.map(UserEntity.fromObject);
    }

    async createUser(dto: CreateUserDto): Promise<UserEntity> {
        const exists = await this.db.user.findUnique({ where: { email: dto.email } });
        if (exists) throw CustomError.conflict('Email already in use');
        const hashed = await bcryptjs.hash(dto.password, 10);
        const user = await this.db.user.create({
            data: { name: dto.name, email: dto.email, password: hashed }
        });
        return UserEntity.fromObject(user);
    }

    async getUserByEmail(email: string): Promise<UserEntity> {
        const user = await this.db.user.findUnique({ where: { email } });
        if (!user) throw CustomError.notFound('User not found');
        return UserEntity.fromObject(user);
    }

    async getUserById(id: string): Promise<UserEntity> {
        const user = await this.db.user.findUnique({ where: { id } });
        if (!user) throw CustomError.notFound('User not found');
        return UserEntity.fromObject(user);
    }

    async updateUser(dto: UpdateUserDto): Promise<UserEntity> {
        await this.getUserById(dto.id);
        const values = dto.values;
        if (values['password']) values['password'] = await bcryptjs.hash(values['password'], 10);
        const user = await this.db.user.update({ where: { id: dto.id }, data: values });
        return UserEntity.fromObject(user);
    }

    async deleteUser(id: string): Promise<UserEntity> {
        await this.getUserById(id);
        const user = await this.db.user.delete({ where: { id } });
        return UserEntity.fromObject(user);
    }
}
