import { BaseEntity } from 'config/database';
import { Column, Entity } from 'typeorm';

@Entity('user')
export class UserEntity extends BaseEntity {
  @Column()
  username: string;

  @Column({ nullable: true })
  age: number;

  @Column({ select: true })
  password: string;

  @Column({ select: true })
  pwdsalt: string;
}
