import { v4 as uuidv4 } from 'uuid';
import { Redis } from 'ioredis';
import { Customer } from '../../entities/customer.entity';
import { CustomerRepository } from './customer.repository';

describe('CustomerRepository', () => {
  let customerRepository: CustomerRepository;
  let redisClient: Redis;

  beforeEach(() => {
    redisClient = {
      get: jest.fn(),
      set: jest.fn(),
    } as unknown as Redis;

    customerRepository = new CustomerRepository(redisClient);
  });

  it('should save a customer', async () => {
    const customer = new Customer('John Doe', 123456789);
    const savedCustomer = await customerRepository.save(customer);

    expect(savedCustomer).toBeDefined();
    expect(savedCustomer.name).toEqual(customer.name);
    expect(savedCustomer.document).toEqual(customer.document);
  });

  it('should update a customer', async () => {
    const customerId = uuidv4();
    const customer = new Customer('John Doe', 123456789);
    const updatedCustomer = { ...customer, id: customerId };
    const setMock = jest.spyOn(redisClient, 'set').mockImplementation();
    const customerRepository = new CustomerRepository(redisClient);
    const result = await customerRepository.update(customerId, customer);

    expect(result).toEqual(updatedCustomer);
    expect(setMock).toHaveBeenCalledWith(
      `customer:${customerId}`,
      JSON.stringify(updatedCustomer),
    );
  });

  it('should find a customer by ID', async () => {
    const customerId = uuidv4();
    const customer = new Customer('John Doe', 123456789);
    const customerData = JSON.stringify(customer);
    jest.spyOn(redisClient, 'get').mockResolvedValue(customerData);

    const foundCustomer = await customerRepository.findById(customerId);

    expect(foundCustomer).toBeDefined();
    expect(foundCustomer?.name).toEqual(customer.name);
    expect(foundCustomer?.document).toEqual(customer.document);
  });

  it('should return null when trying to find a non-existent customer', async () => {
    const customerId = uuidv4();
    jest.spyOn(redisClient, 'get').mockResolvedValue(null);

    const foundCustomer = await customerRepository.findById(customerId);

    expect(foundCustomer).toBeNull();
  });
});
