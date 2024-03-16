import { BaseEntity } from "src/common/model";
import { Column, Entity } from "typeorm";

@Entity("product")
export class Product extends BaseEntity {
  /**
   * 产品名字
   */
  @Column({ length: 32 })
  name: string;
  /**
   * 产品描述
   */
  @Column({ length: 256, nullable: true })
  desc: string;
  /**
   * 产品库存
   */
  @Column({ default: 0 })
  stock: number;
}
