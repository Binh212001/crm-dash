import { DataSource, DataSourceOptions } from "typeorm";
import { SeederOptions } from "typeorm-extension";
import { SnakeNamingStrategy } from "typeorm-naming-strategies";

export const AppDataSource = new DataSource({
  type: process.env.DATABASE_TYPE,
  url: process.env.DATABASE_URL,
  host: process.env.DATABASE_HOST,
  port: process.env.DATABASE_PORT
    ? parseInt(process.env.DATABASE_PORT, 10)
    : 5432,
  username: process.env.DATABASE_USERNAME,
  password: process.env.DATABASE_PASSWORD,
  database: process.env.DATABASE_NAME,
  synchronize: process.env.DATABASE_SYNCHRONIZE === "true",
  dropSchema: false,
  keepConnectionAlive: true,
  logging: process.env.NODE_ENV !== "production",
  namingStrategy: new SnakeNamingStrategy(),
  entities: [__dirname + "/../**/*.entity{.ts,.js}"],
  migrations: [__dirname + "/migrations/**/*{.ts,.js}"],
  migrationsTableName: "migrations",
  poolSize: process.env.DATABASE_MAX_CONNECTIONS
    ? parseInt(process.env.DATABASE_MAX_CONNECTIONS, 10)
    : 100,
  ssl:
    process.env.DATABASE_SSL_ENABLED === "true"
      ? {
          rejectUnauthorized:
            process.env.DATABASE_REJECT_UNAUTHORIZED === "true",
          ca: process.env.DATABASE_CA ?? undefined,
          key: process.env.DATABASE_KEY ?? undefined,
          cert: process.env.DATABASE_CERT ?? undefined,
        }
      : undefined,
  seeds: ["src/database/seeds/**/*{.ts,.js}"],
  seedTracking: true,
  factories: [__dirname + "/factories/**/*{.ts,.js}"],
} as DataSourceOptions & SeederOptions);
