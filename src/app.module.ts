import 'dotenv/config';
import { Module } from '@nestjs/common';
import { RedisModule } from '@nestjs-modules/ioredis';
import { redisConfig } from './modules/customer/config/redis.config';

import { CustomerModule } from './modules/customer/customer.module';
import { AuthModule } from './modules/auth/auth.module';

@Module({
  imports: [
    RedisModule.forRoot({
      config: redisConfig,
    }),
    CustomerModule,
    AuthModule,
  ],
})
export class AppModule {}
