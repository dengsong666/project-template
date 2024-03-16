import { BullModule } from "@nestjs/bull";
import { ConfigModule } from "@nestjs/config";
import { ThrottlerModule } from "@nestjs/throttler";
import database from "./database";
import email from "./email";
import file from "./file";
import redis from "./redis";

export default [
  ConfigModule.forRoot({
    isGlobal: true,
    envFilePath: [`.env.${process.env.NODE_ENV}`, ".env"],
  }),
  ThrottlerModule.forRoot([
    {
      ttl: 60,
      limit: 10,
    },
  ]),
  BullModule.registerQueue(
    {
      name: "audio",
      redis: {
        host: process.env.REDIS_HOST,
        port: +process.env.REDIS_PORT,
      },
    },
    {
      name: "audio",
      redis: {
        host: process.env.REDIS_HOST,
        port: +process.env.REDIS_PORT,
      },
    },
  ),
  database,
  email,
  redis,
  file,
];
