import { CustomerRepository } from '../../domain/repositories/customer.repository';

export class GetCustomersUseCase {
    constructor(private readonly customerRepository: CustomerRepository) {}
    execute() { return this.customerRepository.getCustomers(); }
}
