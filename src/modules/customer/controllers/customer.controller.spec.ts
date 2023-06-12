import { HttpStatus, INestApplication } from '@nestjs/common';
import { Test } from '@nestjs/testing';
import * as request from 'supertest';
import { Customer } from '../entities/customer.entity';
import { CreateCustomerUseCase } from '../usecases/create-customer.usecase';
import { GetCustomerByIdUseCase } from '../usecases/get-customer.usecase';
import { UpdateCustomerUseCase } from '../usecases/update-customer.usecase';
import { CustomerController } from './customer.controller';
import { CustomerRepositoryAbstract } from '../contracts/customer.repository';
import { InMemoryCustomerRepository } from '../repositories/inMemoryRepository/customer-in-memory-repository';

describe('CustomerController (E2E)', () => {
  let app: INestApplication;
  let customerController: CustomerController;
  let createCustomerUseCase: CreateCustomerUseCase;
  let updateCustomerUseCase: UpdateCustomerUseCase;
  let getCustomerByIdUseCase: GetCustomerByIdUseCase;

  beforeAll(async () => {
    const moduleFixture = await Test.createTestingModule({
      controllers: [CustomerController],
      providers: [
        CreateCustomerUseCase,
        UpdateCustomerUseCase,
        GetCustomerByIdUseCase,
        {
          provide: CustomerRepositoryAbstract,
          useClass: InMemoryCustomerRepository,
        },
      ],
    }).compile();

    app = moduleFixture.createNestApplication();
    await app.init();

    customerController =
      moduleFixture.get<CustomerController>(CustomerController);
    createCustomerUseCase = moduleFixture.get<CreateCustomerUseCase>(
      CreateCustomerUseCase,
    );
    updateCustomerUseCase = moduleFixture.get<UpdateCustomerUseCase>(
      UpdateCustomerUseCase,
    );
    getCustomerByIdUseCase = moduleFixture.get<GetCustomerByIdUseCase>(
      GetCustomerByIdUseCase,
    );
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  describe('createCustomer', () => {
    it('should create a customer', async () => {
      const customer = {
        name: 'John Doe',
        document: 123456789,
      };
      const expectedResult: Customer = {
        ...customer,
        id: 'some-id',
      };

      jest
        .spyOn(createCustomerUseCase, 'execute')
        .mockResolvedValue(expectedResult);

      const response = await request(app.getHttpServer())
        .post('/customers')
        .set('Authorization', 'Bearer your-mocked-token')
        .send(customer)
        .expect(HttpStatus.CREATED);

      expect(response.body).toEqual(expectedResult);
    });
  });

  describe('updateCustomer', () => {
    it('should update a customer', async () => {
      const id = 'some-id';
      const updatedCustomer = {
        name: 'Jane Doe',
        document: 987654321,
      };
      const expectedResult: Customer = {
        id,
        ...updatedCustomer,
      };

      jest
        .spyOn(updateCustomerUseCase, 'execute')
        .mockResolvedValue(expectedResult);

      const response = await request(app.getHttpServer())
        .put(`/customers/${id}`)
        .set('Authorization', 'Bearer your-mocked-token')
        .send(updatedCustomer)
        .expect(HttpStatus.OK);

      expect(response.body).toEqual(expectedResult);
    });
  });

  describe('getCustomerById', () => {
    it('should get a customer by id', async () => {
      const id = 'some-id';
      const customer: Customer = {
        id,
        name: 'John Doe',
        document: 123456789,
      };

      jest.spyOn(getCustomerByIdUseCase, 'execute').mockResolvedValue(customer);

      const response = await request(app.getHttpServer())
        .get(`/customers/${id}`)
        .set('Authorization', 'Bearer your-mocked-token')
        .expect(HttpStatus.OK);

      expect(response.body).toEqual(customer);
    });
  });
});
