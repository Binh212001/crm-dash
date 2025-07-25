import { ConfigModule } from "@nestjs/config";

import { BunnyModule } from "./bunny/bunny.module";
import { UserModule } from "./user/user.module";
import { Module } from "@nestjs/common";
import { ProductModule } from "./product/product.module";
import { TagModule } from "./tag/tag.module";
import { CustomerModule } from "./customer/customer.module";
import { PermissionsModule } from "./permissions/permissions.module";
import { OrderModule } from "./order/order.module";
import { SettingModule } from "./settings/setting.module";
import { RoomsModule } from "./rooms/rooms.module";
import { ChatsModule } from "./chats/chats.module";
import { AuthModule } from "./auth/auth.module";

@Module({
  imports: [
    BunnyModule,
    UserModule,
    ProductModule,
    TagModule,
    CustomerModule,
    PermissionsModule,
    OrderModule,
    SettingModule,
    RoomsModule,
    ChatsModule,
    AuthModule,
  ],
})
export class ApiModule {}
