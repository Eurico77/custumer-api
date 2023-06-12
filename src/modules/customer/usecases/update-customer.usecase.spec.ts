import { uuid } from 'uuidv4';
import { Customer } from '../entities/customer.entity';
import { InMemoryCustomerRepository } from '../repositories/inMemoryRepository/customer-in-memory-repository';
import { UpdateCustomerUseCase } from './update-customer.usecase';

describe('UpdateCustomerUseCase', () => {
  let updateCustomerUseCase: UpdateCustomerUseCase;
  let customerRepository: InMemoryCustomerRepository;
  let nonExistentId: string;

  beforeEach(() => {
    customerRepository = new InMemoryCustomerRepository();
    updateCustomerUseCase = new UpdateCustomerUseCase(customerRepository);
    nonExistentId = uuid();
  });

  it('should update the customer with the given ID', async () => {
    const originalCustomer = new Customer('John Doe', 123456789);
    await customerRepository.save(originalCustomer);

    const updatedCustomerData = {
      name: 'Jane Smith',
    };

    const updatedCustomer = await updateCustomerUseCase.execute(
      originalCustomer.id,
      updatedCustomerData,
    );

    expect(updatedCustomer).toBeDefined();
    expect(updatedCustomer.name).toEqual(updatedCustomerData.name);
    expect(updatedCustomer.document).toEqual(originalCustomer.document);
  });

  it('should return null when the customer is not found', async () => {
    const updatedCustomerData = {
      name: 'Jane Smith',
    };

    const updatedCustomer = await updateCustomerUseCase.execute(
      nonExistentId,
      updatedCustomerData,
    );
    expect(updatedCustomer).toBeNull();
  });
});
