import { BaseEntity } from 'config/database';
import { Column, Entity } from 'typeorm';
import { Exclude } from 'class-transformer';
import { UserRole } from 'src/utils/enum';

@Entity('user')
export class UserEntity extends BaseEntity {
  @Column({ length: 100, comment: '用户名' })
  username: string;

  @Column({ length: 100, nullable: true, comment: '昵称' })
  nickname: string;

  @Column({ type: 'int', nullable: true, comment: '年龄' })
  age: number;

  @Column({ type: 'enum', enum: UserRole, default: UserRole.GHOST })
  @Exclude()
  role: UserRole;

  @Column({ comment: '密码' })
  @Exclude()
  password: string;

  @Column({ comment: '密码盐' })
  @Exclude()
  pwdsalt: string;
}
