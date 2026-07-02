import { UserRepository } from '../../domain/repositories/user.repository';

export class GetUsersUseCase {
    constructor(private readonly userRepository: UserRepository) {}
    execute() { return this.userRepository.getAllUsers(); }
}
