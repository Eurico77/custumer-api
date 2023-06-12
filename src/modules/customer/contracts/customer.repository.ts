import { Customer } from '../entities/customer.entity';

export abstract class CustomerRepositoryAbstract {
  abstract save(customer: Omit<Customer, 'id'>): Promise<Customer>;
  abstract update(id: string, customer: Partial<Customer>): Promise<Customer>;
  abstract findById(id: string): Promise<Customer | null>;
}
