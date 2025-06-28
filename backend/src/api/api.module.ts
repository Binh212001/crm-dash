import { ConfigModule } from "@nestjs/config";

import { BunnyModule } from "./bunny/bunny.module";
import { UserModule } from "./user/user.module";
import { Module } from "@nestjs/common";
import { ProductModule } from './product/product.module';
import { TagModule } from './tag/tag.module';
import { CustomerModule } from './customer/customer.module';
import { PermissionsModule } from './permissions/permissions.module';
import { OrderModule } from './order/order.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    BunnyModule,
    UserModule,
    ProductModule,
    TagModule,
    CustomerModule,
    PermissionsModule,
    OrderModule,
  ],
})
export class ApiModule {}
