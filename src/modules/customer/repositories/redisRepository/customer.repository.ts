import { Injectable } from '@nestjs/common';
import { Redis } from 'ioredis';
import { CustomerRepositoryAbstract } from '../../contracts/customer.repository';
import { Customer } from '../../entities/customer.entity';

@Injectable()
export class CustomerRepository implements CustomerRepositoryAbstract {
  constructor(private readonly redisClient: Redis) {}

  async save({ name, document }: Customer): Promise<Customer> {
    const customer = new Customer(name, document);
    await this.redisClient.set(
      `customer:${customer.id}`,
      JSON.stringify(customer),
    );
    return customer;
  }

  async update(id: string, customer: Omit<Customer, 'id'>): Promise<Customer> {
    const updatedCustomer = { ...customer, id };
    await this.redisClient.set(
      `customer:${id}`,
      JSON.stringify(updatedCustomer),
    );
    return updatedCustomer;
  }

  async findById(id: string): Promise<Customer | null> {
    const customerData = await this.redisClient.get(`customer:${id}`);
    if (!customerData) return null;
    return JSON.parse(customerData) as Customer;
  }
}
