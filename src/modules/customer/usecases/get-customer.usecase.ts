import { Injectable } from '@nestjs/common';
import { CustomerRepositoryAbstract } from '../contracts/customer.repository';
import { Customer } from '../entities/customer.entity';

@Injectable()
export class GetCustomerByIdUseCase {
  constructor(
    private readonly customerRepository: CustomerRepositoryAbstract,
  ) {}

  async execute(id: string): Promise<Customer | null> {
    return await this.customerRepository.findById(id);
  }
}
