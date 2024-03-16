import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
} from "@nestjs/common";
import { ProductService } from "./product.service";
import { Product } from "./product.entity";
import { ApiTags } from "@nestjs/swagger";

@ApiTags("商品")
@Controller("product")
export class ProductController {
  constructor(private readonly productService: ProductService) {}
  /**
   * 创建产品
   */
  @Post()
  async addProduct(@Body() data: Product) {
    return this.productService.create(data);
  }
  /**
   * 查询产品
   */
  @Get(":id")
  queryProduct(@Param("id") id: number) {
    return this.productService.findOneBy({ id });
  }
  /**
   * 修改产品
   */
  @Put()
  updateProduct(@Body() data: Product) {
    this.productService.update(
      {
        id: data.id,
      },
      data,
    );
  }
  /**
   * 删除产品
   */
  @Delete(":id")
  delProduct(@Param("id") id: number) {
    this.productService.softDelete({ id });
  }
}
