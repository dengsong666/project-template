import { TypeOrmModule } from "@nestjs/typeorm";
import { Order } from "src/modules/order/order.entity";
import { Product } from "src/modules/product/product.entity";
import { Profile } from "src/modules/profile/profile.entity";
import { Role } from "src/modules/role/role.entity";
import { User } from "src/modules/user/user.entity";
import { Logger } from "typeorm";
console.log(process.env.NODE_ENV);

export default TypeOrmModule.forRootAsync({
  useFactory: () => ({
    type: "mysql",
    host: process.env.DATABASE_HOST,
    port: +process.env.DATABASE_PORT,
    username: process.env.DATABASE_USER,
    password: process.env.DATABASE_PASSWORD,
    database: "nest",
    // synchronize: process.env.NODE_ENV === "dev",
    // autoLoadEntities: true,
    entities: [User, Role, Profile, Order, Product],
    logging: process.env.NODE_ENV === "dev" ? "all" : false,
    logger: new MyLogger(),
    maxQueryExecutionTime: 1000,
  }),
});

export class MyLogger implements Logger {
  logQuery(query: string) {
    const e = `\x1B[31m${query.match(/`(\w+)Entity`/)?.[0]?.replace(/`/g, "")}：\x1B[0m`;
    const q = query
      .replace(/`/g, "")
      .replace(/(\w+)Entity[\.| ]/g, "")
      .replace(/ AS \w+/g, "")
      .replace(/([A-Z]+)(\(\d\))?/g, (m) => `\x1B[32m${m}\x1B[0m`);
    console.log(e + q);
  }

  logQueryError() {}

  logQuerySlow() {}

  logSchemaBuild() {}

  logMigration() {}

  log() {}
}
