import { CreateUserDto, RegisterUserDto } from '../../domain/dtos';
import { UserRepository } from '../../domain/repositories/user.repository';
import { JwtAdapter } from '../../config/jwt.adapter';
import { CustomError } from '../../domain/errors/custom.error';

export class RegisterUseCase {
    constructor(private readonly userRepository: UserRepository) {}

    async execute(dto: RegisterUserDto) {
        const [error, createDto] = CreateUserDto.create({ name: dto.name, email: dto.email, password: dto.password });
        if (error) throw CustomError.badRequest(error);

        const user = await this.userRepository.createUser(createDto!);
        const token = await JwtAdapter.generateToken({ id: user.id, email: user.email });

        return {
            token,
            user: { id: user.id, name: user.name, email: user.email }
        };
    }
}
