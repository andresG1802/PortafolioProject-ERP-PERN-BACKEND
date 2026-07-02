import { CreateUserDto, UpdateUserDto } from '../../domain/dtos';
import { UserDataSource } from '../../domain/datasources/user.datasource';
import { UserEntity } from '../../domain/entities/user.entity';
import { UserRepository } from '../../domain/repositories/user.repository';

export class UserRepositoryImpl implements UserRepository {
    constructor(private readonly datasource: UserDataSource) {}

    createUser(dto: CreateUserDto): Promise<UserEntity> { return this.datasource.createUser(dto); }
    getAllUsers(): Promise<UserEntity[]> { return this.datasource.getAllUsers(); }
    getUserByEmail(email: string): Promise<UserEntity> { return this.datasource.getUserByEmail(email); }
    getUserById(id: string): Promise<UserEntity> { return this.datasource.getUserById(id); }
    updateUser(dto: UpdateUserDto): Promise<UserEntity> { return this.datasource.updateUser(dto); }
    deleteUser(id: string): Promise<UserEntity> { return this.datasource.deleteUser(id); }
}
