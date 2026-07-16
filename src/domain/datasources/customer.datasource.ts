import { CreateCustomerDto, UpdateCustomerDto } from '../dtos';
import { CustomerEntity } from '../entities/customer.entity';

export abstract class CustomerDataSource {
    abstract createCustomer(dto: CreateCustomerDto): Promise<CustomerEntity>;
    abstract getCustomers(): Promise<CustomerEntity[]>;
    abstract getCustomerById(id: string): Promise<CustomerEntity>;
    abstract updateCustomer(dto: UpdateCustomerDto): Promise<CustomerEntity>;
    abstract deleteCustomer(id: string): Promise<CustomerEntity>;
}
