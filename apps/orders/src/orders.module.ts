import { Module } from '@nestjs/common';
import { OrdersController } from './orders.controller';
import { OrdersService } from './orders.service';
import { ConfigModule } from '@nestjs/config';
import * as joi from 'joi';
import { DatabaseModule } from '@app/common/database/database.module';
import { OrderRepository } from './order.repository';
import { MongooseModule } from '@nestjs/mongoose';
import { Order, OrderSchema } from './schemas/order.schema';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      validationSchema: joi.object({
        MONGODB_URI: joi.string().required(),
      }),
      envFilePath: './apps/order/src',
    }),
    DatabaseModule,
    MongooseModule.forFeature([{name: Order.name, schema: OrderSchema}]),
  ],
  controllers: [OrdersController],
  providers: [OrdersService, OrderRepository],
})
export class OrdersModule {}
