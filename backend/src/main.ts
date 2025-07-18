import { NestFactory, Reflector } from "@nestjs/core";
import { AppModule } from "./app.module";
import { DocumentBuilder, SwaggerModule } from "@nestjs/swagger";
import { ConfigService } from "@nestjs/config";
import { AllConfigType } from "./config/config.type";
import { json } from "express";
import {
  ClassSerializerInterceptor,
  HttpStatus,
  UnprocessableEntityException,
  ValidationPipe,
} from "@nestjs/common";
import { ValidationError } from "class-validator";
import path from "path";
import * as express from "express";
import { MicroserviceOptions, Transport } from "@nestjs/microservices";
import { AuthGuard } from "./guards/auth.graud";
import { JwtService } from "./api/auth/services/jwt.service";
import { UserService } from "./api/user/user.service";
import { GlobalExceptionFilter } from "./filters/global-exception.filter";
async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const reflector = app.get(Reflector);
  const configService = app.get(ConfigService<AllConfigType>);

  app.connectMicroservice<MicroserviceOptions>({
    transport: Transport.RMQ,
    options: {
      urls: ["amqp://localhost:5672"],
      queue: "send_mail",
      queueOptions: {
        durable: false,
      },
      noAck: false,
      exchange: "send_email",
      exchangeType: "direct",
      routingKey: "info",
    },
  });

  await app.startAllMicroservices();
  app.useGlobalFilters(new GlobalExceptionFilter());

  const corsOrigin = configService.getOrThrow("app.corsOrigin", {
    infer: true,
  });
  app.enableCors({
    preflightContinue: false,
    origin: corsOrigin,
    methods: "GET,HEAD,PUT,PATCH,POST,DELETE",
    allowedHeaders: [
      "Content-Type",
      "Accept",
      "Authorization",
      "authorizationexpire",
      "tus-resumable",
      "upload-length",
      "upload-metadata",
      "videoid",
      "upload-offset",
      "upload-concat",
      "x-os",
      "x-device",
      "x-device-id",
      "x-tenant-id",
    ],
    credentials: true,
  });
  app.use(json({ limit: "500kb" }));

  app.useGlobalGuards(
    new AuthGuard(reflector, app.get(JwtService), app.get(UserService))
  );
  app.useGlobalPipes(
    new ValidationPipe({
      transform: true,
      whitelist: true,
      errorHttpStatusCode: HttpStatus.UNPROCESSABLE_ENTITY,
      exceptionFactory: (errors: ValidationError[]) => {
        return new UnprocessableEntityException(errors);
      },
    })
  );

  app.useGlobalInterceptors(new ClassSerializerInterceptor(reflector, {}));

  // Cấu hình Swagger
  const config = new DocumentBuilder()
    .setTitle("CRM API")
    .setVersion("1.0")
    .addBearerAuth()
    .build();

  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup("api", app, document); // Swagger UI sẽ chạy tại /api
  app.use("/public", express.static(path.join(__dirname, "public")));

  // Serve Socket.IO client library
  app.use(
    "/socket.io",
    express.static(
      path.join(__dirname, "../node_modules/socket.io/client-dist")
    )
  );

  await app.listen(
    configService.getOrThrow("app.port", { infer: true }),
    () => {
      console.log(
        `Application is running on: ${configService.getOrThrow("app.url", {
          infer: true,
        })}`
      );
    }
  );
}
bootstrap();
