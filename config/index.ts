import { ConfigModule } from '@nestjs/config';
import database from './database';
import email from './email';

export default [
  ConfigModule.forRoot({
    isGlobal: true,
    envFilePath: [`.env.${process.env.NODE_ENV}`, '.env'],
  }),
  database,
  email,
];
