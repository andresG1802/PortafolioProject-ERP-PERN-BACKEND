import { UserRepository } from '../../domain/repositories/user.repository';

export class GetUserByIdUseCase {
    constructor(private readonly userRepository: UserRepository) {}
    execute(id: string) { return this.userRepository.getUserById(id); }
}
