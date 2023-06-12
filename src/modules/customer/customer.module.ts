import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
import { CustomerController } from './controllers/customer.controller';
import { CustomerRepository } from './repositories/redisRepository/customer.repository';
import { CreateCustomerUseCase } from './usecases/create-customer.usecase';
import { GetCustomerByIdUseCase } from './usecases/get-customer.usecase';
import { UpdateCustomerUseCase } from './usecases/update-customer.usecase';
import { AuthMiddleware } from './middlewares/auth.middleware';
import { CustomerRepositoryAbstract } from '../customer/contracts/customer.repository';
import { Redis } from 'ioredis';

@Module({
  controllers: [CustomerController],
  providers: [
    Redis,
    {
      provide: CustomerRepositoryAbstract,
      useClass: CustomerRepository,
    },
    CreateCustomerUseCase,
    UpdateCustomerUseCase,
    GetCustomerByIdUseCase,
  ],
})
export class CustomerModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(AuthMiddleware).forRoutes(CustomerController);
  }
}
