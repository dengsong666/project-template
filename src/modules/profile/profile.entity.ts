import { IsOptional, IsPhoneNumber, IsUrl } from "class-validator";
import { BaseEntity } from "src/common/model";
import { Column, Entity } from "typeorm";

@Entity("profile")
export class Profile extends BaseEntity {
  /**
   * 昵称
   */
  @IsOptional()
  @Column({ length: 32, nullable: true })
  nickname?: string;
  /**
   * 头像
   */
  @IsOptional()
  @IsUrl({}, { message: "头像地址格式不正确" })
  @Column({ length: 100, nullable: true })
  avatar?: string;
  /**
   * 手机号
   */
  @IsOptional()
  @IsPhoneNumber("CN", { message: "手机号格式不正确" })
  @Column({ length: 11, nullable: true })
  phone?: string;
}
