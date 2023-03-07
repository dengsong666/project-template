import { BaseEntity } from 'config/database';
import { Column, Entity } from 'typeorm';
import { Exclude } from 'class-transformer';

@Entity('user')
export class UserEntity extends BaseEntity {
  @Column()
  username: string;

  @Column({ nullable: true })
  age: number;

  @Column()
  @Exclude()
  password: string;

  @Column()
  @Exclude()
  pwdsalt: string;
}
