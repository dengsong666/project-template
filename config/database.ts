import { TypeOrmModule } from '@nestjs/typeorm';
import * as dayjs from 'dayjs';
import {
  CreateDateColumn,
  DeleteDateColumn,
  Entity,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
// 日期转换
const dateTransformer = {
  from: (value: Date) => value && dayjs(value).format('YYYY-MM-DD HH:mm:ss'),
  to: (value: Date) => value && dayjs(value).format('YYYY-MM-DD HH:mm:ss'),
};
export default TypeOrmModule.forRootAsync({
  useFactory: () => ({
    type: 'mysql',
    host: process.env.DATABASE_HOST,
    port: +process.env.DATABASE_PORT,
    username: process.env.DATABASE_USER,
    password: process.env.DATABASE_PASSWORD,
    database: 'test',
    synchronize: !!process.env.DATABASE_SYNCHRONIZE,
    autoLoadEntities: true,
  }),
});
@Entity('Base')
export class BaseEntity {
  @PrimaryGeneratedColumn()
  id: string;

  @CreateDateColumn({
    type: 'datetime',
    transformer: dateTransformer,
    comment: '创建时间',
  })
  created_at: Date;

  @UpdateDateColumn({
    type: 'datetime',
    transformer: dateTransformer,
    comment: '更新时间',
  })
  updated_at: Date;

  @DeleteDateColumn({
    type: 'datetime',
    transformer: dateTransformer,
    comment: '删除时间',
  })
  deleted_at: Date;
}
