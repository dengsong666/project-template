import { BadRequestException, Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { MyRepository } from "src/common/repository";
import { DataSource, Repository } from "typeorm";
import { Product } from "../product/product.entity";
import { User } from "../user/user.entity";
import { Order } from "./order.entity";

@Injectable()
export class OrderService extends MyRepository<Order> {
  constructor(
    @InjectRepository(Order) orderRepo: Repository<Order>,
    @InjectRepository(User) private userRepo: Repository<User>,
    @InjectRepository(User) private productRepo: Repository<Product>,
    private dataSource: DataSource,
  ) {
    super(orderRepo.target, orderRepo.manager);
  }
  /**
   * 添加订单
   */
  async addOrderToUser(
    userId: number,
    productIds: number[],
    order: Order,
  ): Promise<Order> {
    const products = [];
    const user = await this.userRepo.findOneBy({ id: userId });
    if (!user) throw new BadRequestException("用户不存在");
    return this.dataSource.transaction(async (manager) => {
      for (const pid of productIds) {
        const product = await this.productRepo.findOneBy({ id: pid });

        if (!product) {
          throw new BadRequestException(`商品${pid}不存在`);
        }
        if (product.stock < order.productNum) {
          throw new BadRequestException(`商品${product.name}库存不够`);
        }
        // 更新库存
        product.stock -= order.productNum;
        // await manager.save(product);
        products.push(product);
      }
      order.user = user;
      order.products = products;
      return manager.save(order);
    });
  }
}
