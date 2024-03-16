import { BaseEntity } from "src/common/model";
import { Column, Entity, JoinTable, ManyToMany, ManyToOne } from "typeorm";
import { User } from "../user/user.entity";
import { Product } from "../product/product.entity";
import { ApiTags } from "@nestjs/swagger";

@ApiTags("订单")
@Entity("order")
export class Order extends BaseEntity {
  /**
   * 收货地址
   */
  @Column({ length: 256 })
  address: string;

  /**
   * 商品数量
   */
  @Column()
  productNum: number;

  /**
   * 用户
   */
  @ManyToOne(() => User, (user) => user.orders)
  user: User;

  /**
   * 商品
   */
  @ManyToMany(() => Product, null, { cascade: ["update", "soft-remove"] })
  @JoinTable()
  products: Product[];
}
