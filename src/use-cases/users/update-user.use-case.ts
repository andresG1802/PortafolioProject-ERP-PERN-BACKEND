import { UpdateUserDto } from '../../domain/dtos';
import { UserRepository } from '../../domain/repositories/user.repository';

export class UpdateUserUseCase {
    constructor(private readonly userRepository: UserRepository) {}
    execute(dto: UpdateUserDto) { return this.userRepository.updateUser(dto); }
}
