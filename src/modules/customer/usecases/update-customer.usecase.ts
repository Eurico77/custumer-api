import { Injectable } from '@nestjs/common';
import { CustomerRepositoryAbstract } from '../contracts/customer.repository';
import { Customer } from '../entities/customer.entity';

@Injectable()
export class UpdateCustomerUseCase {
  constructor(
    private readonly customerRepository: CustomerRepositoryAbstract,
  ) {}

  async execute(
    id: string,
    customer: Partial<Customer>,
  ): Promise<Partial<Customer>> {
    return await this.customerRepository.update(id, customer);
  }
}
