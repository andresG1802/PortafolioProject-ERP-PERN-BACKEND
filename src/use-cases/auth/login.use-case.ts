import bcryptjs from 'bcryptjs';
import { LoginUserDto } from '../../domain/dtos';
import { UserRepository } from '../../domain/repositories/user.repository';
import { JwtAdapter } from '../../config/jwt.adapter';
import { CustomError } from '../../domain/errors/custom.error';

export class LoginUseCase {
    constructor(private readonly userRepository: UserRepository) {}

    async execute(dto: LoginUserDto) {
        const user = await this.userRepository.getUserByEmail(dto.email).catch(() => {
            throw CustomError.unauthorized('Invalid credentials');
        });

        const passwordMatch = await bcryptjs.compare(dto.password, user.password);
        if (!passwordMatch) throw CustomError.unauthorized('Invalid credentials');

        const token = await JwtAdapter.generateToken({ id: user.id, email: user.email });

        return {
            token,
            user: { id: user.id, name: user.name, email: user.email }
        };
    }
}
