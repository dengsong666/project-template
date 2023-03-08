import { BaseEntity } from 'config/database';
import { BeforeInsert, BeforeUpdate, Column, Entity } from 'typeorm';
import { Exclude } from 'class-transformer';
import { UserRole } from 'src/utils/enum';
import * as bcrypt from 'bcrypt';
@Entity('user')
export class UserEntity extends BaseEntity {
  @Column({ length: 100, comment: '用户名', primary: true })
  username: string;

  @Column({ length: 100, nullable: true, comment: '昵称' })
  nickname: string;

  @Column({ type: 'int', nullable: true, comment: '年龄' })
  age: number;

  @Column({ type: 'enum', enum: UserRole, default: UserRole.GHOST })
  role: UserRole;

  @Column({ comment: '密码' })
  @Exclude()
  password: string;

  @BeforeInsert()
  @BeforeUpdate()
  async encryptPwd() {
    console.log('pwd:' + this.password);

    const salt = await bcrypt.genSalt(10);
    this.password = await bcrypt.hash(this.password, salt);
  }
}
