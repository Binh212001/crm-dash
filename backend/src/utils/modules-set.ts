import { ApiModule } from "@/api/api.module";
import { BackgroundModule } from "@/background/background.module";
import appConfig from "@/config/app.config";
import { TypeOrmConfigService } from "@/database/typeorm-config.service";
import { EventModule } from "@/events/event.module";
import { BullModule } from "@nestjs/bull";
import { ModuleMetadata } from "@nestjs/common";
import { ConfigModule, ConfigService } from "@nestjs/config";
import { ServeStaticModule } from "@nestjs/serve-static";
import { TypeOrmModule } from "@nestjs/typeorm";
import { ClsModule } from "nestjs-cls";
import path from "path";
import { DataSource, DataSourceOptions } from "typeorm";
import {
  addTransactionalDataSource,
  initializeTransactionalContext,
  StorageDriver,
} from "typeorm-transactional";
import { MailerModule } from '@nestjs-modules/mailer';
import { HandlebarsAdapter } from '@nestjs-modules/mailer/dist/adapters/handlebars.adapter';

function generateModulesSet() {
  const imports: ModuleMetadata["imports"] = [
    ConfigModule.forRoot({
      isGlobal: true,
      load: [appConfig],
      envFilePath: [".env"],
    }),
    ServeStaticModule.forRoot({
      rootPath: path.join(__dirname, "../../../", "public"),
    }),
    BackgroundModule ,
    MailerModule.forRootAsync({
      useFactory: () => ({
        transport: 'smtps://user@domain.com:pass@smtp.domain.com',
        defaults: {
          from: '"nest-modules" <modules@nestjs.com>',
        },
        template: {
          dir: __dirname + '/templates',
          adapter: new HandlebarsAdapter(),
          options: {
            strict: true,
          },
        },
      }),
    }),
  ];

  const redisModule = BullModule.forRootAsync({
    imports: [ConfigModule],
    useFactory: async (configService: ConfigService) => ({
      redis: {
        host: configService.get("REDIS_HOST", "localhost"),
        port: configService.get("REDIS_PORT", 8002),
        password: configService.get("REDIS_PASSWORD", "redispass"),
      },
    }),
    inject: [ConfigService],
  });

  const dbModule = TypeOrmModule.forRootAsync({
    useClass: TypeOrmConfigService,
    dataSourceFactory: async (options: DataSourceOptions) => {
      if (!options) {
        throw new Error("Invalid options passed");
      }
      initializeTransactionalContext({
        storageDriver: StorageDriver.ASYNC_LOCAL_STORAGE,
      });

      return addTransactionalDataSource(new DataSource(options));
    },
  });

  const clsModule = ClsModule.forRootAsync({
    global: true,
    useFactory: () => ({
      middleware: {
        mount: true,
        setup: (cls, req) => {
          cls.set("origin", req.headers["origin"] ?? "http://localhost:3000");
          cls.set("tenantId", req.headers["x-tenant-id"] ?? "root");
        },
      },
    }),
  });

  const customModules = [clsModule, dbModule, redisModule, ApiModule , EventModule];

  return imports.concat(customModules);
}

export default generateModulesSet;
