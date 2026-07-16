import { CreateCustomerDto, UpdateCustomerDto } from '../../domain/dtos';
import { CustomerDataSource } from '../../domain/datasources/customer.datasource';
import { CustomerEntity } from '../../domain/entities/customer.entity';
import { CustomerRepository } from '../../domain/repositories/customer.repository';

export class CustomerRepositoryImpl implements CustomerRepository {
    constructor(private readonly datasource: CustomerDataSource) {}

    createCustomer(dto: CreateCustomerDto): Promise<CustomerEntity> { return this.datasource.createCustomer(dto); }
    getCustomers(): Promise<CustomerEntity[]> { return this.datasource.getCustomers(); }
    getCustomerById(id: string): Promise<CustomerEntity> { return this.datasource.getCustomerById(id); }
    updateCustomer(dto: UpdateCustomerDto): Promise<CustomerEntity> { return this.datasource.updateCustomer(dto); }
    deleteCustomer(id: string): Promise<CustomerEntity> { return this.datasource.deleteCustomer(id); }
}
