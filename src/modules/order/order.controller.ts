import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Query,
} from "@nestjs/common";
import { OrderService } from "./order.service";
import { Order } from "./order.entity";
import { ApiTags } from "@nestjs/swagger";

@ApiTags("订单")
@Controller("order")
export class OrderController {
  constructor(private readonly orderService: OrderService) {}
  /**
   * 创建订单
   */
  @Post(":userId")
  async addOrder(
    @Param() userId: number,
    @Query() productIds: number[],
    @Body() data: Order,
  ) {
    return this.orderService.addOrderToUser(userId, productIds, data);
  }
  /**
   * 删除订单
   */
  @Delete(":id")
  async delOrder(@Param() id: number) {
    return this.orderService.softDelete({ id });
  }
  /**
   * 查询订单
   */
  @Get(":id")
  async queryOrder(@Param() id: number) {
    return this.orderService.findOneBy({ id });
  }
}
