import { Injectable } from '@nestjs/common';
import { CustomerRepositoryAbstract } from '../contracts/customer.repository';
import { Customer } from '../entities/customer.entity';

interface CreateUserResponse {
  id: string;
  name: string;
  document: number;
}

@Injectable()
export class CreateCustomerUseCase {
  constructor(
    private readonly customerRepository: CustomerRepositoryAbstract,
  ) {}

  async execute(customer: Omit<Customer, 'id'>): Promise<CreateUserResponse> {
    return await this.customerRepository.save(customer);
  }
}
