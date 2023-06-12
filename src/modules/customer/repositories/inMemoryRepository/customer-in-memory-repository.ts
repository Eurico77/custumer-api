import { Injectable } from '@nestjs/common';
import { CustomerRepositoryAbstract } from '../../contracts/customer.repository';
import { Customer } from '../../entities/customer.entity';

@Injectable()
export class InMemoryCustomerRepository implements CustomerRepositoryAbstract {
  private customers: Record<string, Customer> = {};

  async save(customer: Customer): Promise<Customer> {
    this.customers[customer.id] = customer;
    return customer;
  }

  async update(id: string, customer: Customer): Promise<Customer> {
    if (this.customers[id]) {
      const existingCustomer = this.customers[id];
      const updatedCustomer = { ...existingCustomer, ...customer };
      this.customers[id] = updatedCustomer;
      return updatedCustomer;
    }
    return null;
  }

  async findById(id: string): Promise<Customer | null> {
    const customer = this.customers[id];
    if (customer) {
      return customer;
    }
    return null;
  }
}
