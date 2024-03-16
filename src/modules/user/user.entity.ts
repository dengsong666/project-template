import {
  BeforeInsert,
  BeforeUpdate,
  Column,
  Entity,
  JoinColumn,
  JoinTable,
  ManyToMany,
  OneToMany,
  OneToOne,
} from "typeorm";
import { IsOptional, IsStrongPassword, IsNotEmpty } from "class-validator";
import * as bcrypt from "bcrypt";
import { BaseEntity, PageReq } from "src/common/model";
import { Order } from "../order/order.entity";
import { Profile } from "../profile/profile.entity";
import { Role } from "../role/role.entity";

@Entity("user")
export class User extends BaseEntity {
  /**
   * 用户名
   */
  @IsNotEmpty({ message: "用户名不能为空" })
  @Column({ length: 32, unique: true, update: false })
  username: string;
  /**
   * 密码
   */
  @IsOptional()
  @IsStrongPassword(
    {
      minLength: 6,
      minUppercase: 1,
      minLowercase: 1,
      minNumbers: 1,
    },
    { message: "密码必须包含大小写字母和数字，且至少6位" },
  )
  @Column({ length: 60, default: "123456", select: false })
  password: string;

  /**
   * 角色
   */
  @ManyToMany(() => Role, (role) => role.users, { onDelete: "CASCADE" })
  @JoinTable()
  roles: Role[];

  /**
   * 订单
   */
  @OneToMany(() => Order, (order) => order.user, { cascade: true })
  orders?: Order[];

  /**
   * 形象
   */
  @OneToOne(() => Profile, null, { cascade: true })
  @JoinColumn()
  profile: Profile;

  @BeforeInsert()
  @BeforeUpdate()
  encrypt() {
    this.password = bcrypt.hashSync(
      this.password || "123456",
      bcrypt.genSaltSync(10),
    );
  }
}

export class UserQueryDto extends PageReq {
  username?: string;
}
export class UserRegisterDto {
  @IsNotEmpty({ message: "用户名不能为空" })
  username: string = "root";
  password: string = "123456";
}
export class UserLoginDto {
  @IsNotEmpty({ message: "用户名不能为空" })
  username: string = "root";
  password: string = "123456";
}
export class UserPwdDto {
  id: number;
  password: string;
  newPassword: string;
}
export class Token {
  @IsNotEmpty({ message: "token不能为空" })
  token: string;
}
