import { PrismaClient } from '@prisma/client';
import { prisma } from '../database/prisma.client';
import { CreateCustomerDto, UpdateCustomerDto } from '../../domain/dtos';
import { CustomerDataSource } from '../../domain/datasources/customer.datasource';
import { CustomerEntity } from '../../domain/entities/customer.entity';
import { CustomError } from '../../domain/errors/custom.error';

export class CustomerDataSourceImpl implements CustomerDataSource {
    constructor(private readonly db: PrismaClient = prisma) {}

    async createCustomer(dto: CreateCustomerDto): Promise<CustomerEntity> {
        const customer = await this.db.customer.create({ data: dto });
        return CustomerEntity.fromObject(customer);
    }

    async getCustomers(): Promise<CustomerEntity[]> {
        const customers = await this.db.customer.findMany({ orderBy: { name: 'asc' } });
        return customers.map(CustomerEntity.fromObject);
    }

    async getCustomerById(id: string): Promise<CustomerEntity> {
        const customer = await this.db.customer.findUnique({ where: { id } });
        if (!customer) throw CustomError.notFound('Customer not found');
        return CustomerEntity.fromObject(customer);
    }

    async updateCustomer(dto: UpdateCustomerDto): Promise<CustomerEntity> {
        await this.getCustomerById(dto.id);
        const customer = await this.db.customer.update({ where: { id: dto.id }, data: dto.values });
        return CustomerEntity.fromObject(customer);
    }

    async deleteCustomer(id: string): Promise<CustomerEntity> {
        await this.getCustomerById(id);
        const customer = await this.db.customer.delete({ where: { id } });
        return CustomerEntity.fromObject(customer);
    }
}
