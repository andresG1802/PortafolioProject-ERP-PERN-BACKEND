import{ CreateUserDto, UpdateUserDto } from "../dtos";
import { UserEntity } from "../entities/user.entity";
export abstract class UserRepository {
    abstract createUser(createUserDto: CreateUserDto):Promise<UserEntity>;
    abstract getUserByEmail(email:string):Promise<UserEntity>;
    abstract getUserById(id:string):Promise<UserEntity>;
    abstract updateUser(updateUserDto: UpdateUserDto):Promise<UserEntity>;
    abstract deleteUser(id:string):Promise<UserEntity>;
}   