import { CreateCustomerUseCase } from './create-customer.usecase';
import { InMemoryCustomerRepository } from '../repositories/inMemoryRepository/customer-in-memory-repository';
import { Customer } from '../entities/customer.entity';

describe('CreateCustomerUseCase', () => {
  let createCustomerUseCase: CreateCustomerUseCase;
  let customerRepository: InMemoryCustomerRepository;

  beforeEach(() => {
    customerRepository = new InMemoryCustomerRepository();
    createCustomerUseCase = new CreateCustomerUseCase(customerRepository);
  });

  it('should create a new customer', async () => {
    const customer = new Customer('John Doe', 123456789);
    const createdCustomer = await createCustomerUseCase.execute(customer);

    expect(createdCustomer).toBeInstanceOf(Customer);
    expect(createdCustomer.name).toBe(customer.name);
    expect(createdCustomer.document).toBe(customer.document);
    expect(createdCustomer.id).toBe(customer.id);
  });
});
