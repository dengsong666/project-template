import { BaseEntity } from 'config/database';
import { Column, Entity } from 'typeorm';

@Entity('users')
export class UsersEntity extends BaseEntity {
  @Column()
  username: string;

  @Column()
  age: number;

  @Column()
  password: string;

  @Column()
  pwdsalt: string;
}
