import { v4 as uuidv4 } from 'uuid';
import { Customer } from '../../entities/customer.entity';
import { InMemoryCustomerRepository } from './customer-in-memory-repository';

describe('InMemoryCustomerRepository', () => {
  let customerRepository: InMemoryCustomerRepository;

  beforeEach(() => {
    customerRepository = new InMemoryCustomerRepository();
  });

  it('should save a customer', async () => {
    const customer = new Customer('John Doe', 123456789);
    const savedCustomer = await customerRepository.save(customer);

    expect(savedCustomer).toBeDefined();
    expect(savedCustomer.id).toBeDefined();
    expect(savedCustomer.name).toEqual(customer.name);
    expect(savedCustomer.document).toEqual(customer.document);
  });

  it('should update a customer', async () => {
    const customer = new Customer('John Doe', 123456789);
    await customerRepository.save(customer);

    const updatedCustomerData: Customer = {
      id: customer.id,
      name: 'Jane Smith',
      document: 987654321,
    };

    const updatedCustomer = await customerRepository.update(
      customer.id,
      updatedCustomerData,
    );

    expect(updatedCustomer).toBeDefined();
    expect(updatedCustomer.id).toEqual(customer.id);
    expect(updatedCustomer.name).toEqual(updatedCustomerData.name);
    expect(updatedCustomer.document).toEqual(updatedCustomerData.document);
  });

  it('should return null when trying to update a non-existent customer', async () => {
    const updatedCustomerData: Customer = {
      id: uuidv4(),
      name: 'Jane Smith',
      document: 987654321,
    };

    const updatedCustomer = await customerRepository.update(
      updatedCustomerData.id,
      updatedCustomerData,
    );

    expect(updatedCustomer).toBeNull();
  });

  it('should find a customer by ID', async () => {
    const customer = new Customer('John Doe', 123456789);
    await customerRepository.save(customer);

    const foundCustomer = await customerRepository.findById(customer.id);

    expect(foundCustomer).toBeDefined();
    expect(foundCustomer.id).toEqual(customer.id);
    expect(foundCustomer.name).toEqual(customer.name);
    expect(foundCustomer.document).toEqual(customer.document);
  });

  it('should return null when trying to find a non-existent customer', async () => {
    const nonExistentCustomerId = uuidv4();
    const foundCustomer = await customerRepository.findById(
      nonExistentCustomerId,
    );

    expect(foundCustomer).toBeNull();
  });
});
