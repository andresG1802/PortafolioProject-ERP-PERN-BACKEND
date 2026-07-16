import { UpdateCustomerDto } from '../../domain/dtos';
import { CustomerRepository } from '../../domain/repositories/customer.repository';

export class UpdateCustomerUseCase {
    constructor(private readonly customerRepository: CustomerRepository) {}
    execute(dto: UpdateCustomerDto) { return this.customerRepository.updateCustomer(dto); }
}
