import { BaseEntity } from "src/common/model";
import { Column, Entity, ManyToMany } from "typeorm";
import { User } from "../user/user.entity";
import { ApiHideProperty } from "@nestjs/swagger";

@Entity("role")
export class Role extends BaseEntity {
  /**
   * 角色名字
   */
  @Column({ length: 32, unique: true })
  name: string;
  /**
   * 角色描述
   */
  @Column({ length: 256, nullable: true })
  desc: string;

  /**
   * 用户
   */
  @ApiHideProperty()
  @ManyToMany(() => User, (user) => user.roles, { onDelete: "CASCADE" })
  users: User[];
}
