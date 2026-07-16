import { CustomerRepository } from '../../domain/repositories/customer.repository';

export class GetCustomerByIdUseCase {
    constructor(private readonly customerRepository: CustomerRepository) {}
    execute(id: string) { return this.customerRepository.getCustomerById(id); }
}
