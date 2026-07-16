import { CreateCustomerDto } from '../../domain/dtos';
import { CustomerRepository } from '../../domain/repositories/customer.repository';

export class CreateCustomerUseCase {
    constructor(private readonly customerRepository: CustomerRepository) {}
    execute(dto: CreateCustomerDto) { return this.customerRepository.createCustomer(dto); }
}
