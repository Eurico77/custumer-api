import { Controller, Post, Body, Put, Param, Get } from '@nestjs/common';

import { CreateCustomerUseCase } from '../usecases/create-customer.usecase';
import { UpdateCustomerUseCase } from '../usecases/update-customer.usecase';
import { GetCustomerByIdUseCase } from '../usecases/get-customer.usecase';
import { Customer } from '../entities/customer.entity';

@Controller('customers')
export class CustomerController {
  constructor(
    private readonly createCustomerUseCase: CreateCustomerUseCase,
    private readonly updateCustomerUseCase: UpdateCustomerUseCase,
    private readonly getCustomerByIdUseCase: GetCustomerByIdUseCase,
  ) {}

  @Post()
  async createCustomer(
    @Body() customer: Omit<Customer, 'id'>,
  ): Promise<Customer> {
    return await this.createCustomerUseCase.execute(customer);
  }

  @Put(':id')
  async updateCustomer(
    @Param('id') id: string,
    @Body() customer: Omit<Customer, 'id'>,
  ) {
    return await this.updateCustomerUseCase.execute(id, customer);
  }

  @Get(':id')
  async getCustomerById(@Param('id') id: string): Promise<Customer | null> {
    return await this.getCustomerByIdUseCase.execute(id);
  }
}
