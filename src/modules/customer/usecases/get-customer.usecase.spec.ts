import { v4 as uuidv4 } from 'uuid';
import { Customer } from '../entities/customer.entity';
import { InMemoryCustomerRepository } from '../repositories/inMemoryRepository/customer-in-memory-repository';
import { GetCustomerByIdUseCase } from './get-customer.usecase';

describe('GetCustomerByIdUseCase', () => {
  let getCustomerByIdUseCase: GetCustomerByIdUseCase;
  let customerRepository: InMemoryCustomerRepository;

  beforeEach(() => {
    customerRepository = new InMemoryCustomerRepository();
    getCustomerByIdUseCase = new GetCustomerByIdUseCase(customerRepository);
  });

  it('should return the customer with the given ID', async () => {
    const customer = new Customer('John Doe', 123456789);
    await customerRepository.save(customer);
    const result = await getCustomerByIdUseCase.execute(customer.id);
    expect(result).toEqual(customer);
  });

  it('should return null when the customer is not found', async () => {
    const result = await getCustomerByIdUseCase.execute(uuidv4());
    expect(result).toBeNull();
  });
});
