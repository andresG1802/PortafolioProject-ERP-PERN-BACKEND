import { CustomerRepository } from '../../domain/repositories/customer.repository';

export class DeleteCustomerUseCase {
    constructor(private readonly customerRepository: CustomerRepository) {}
    execute(id: string) { return this.customerRepository.deleteCustomer(id); }
}
