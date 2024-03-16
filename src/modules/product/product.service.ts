import { Injectable } from "@nestjs/common";
import { Product } from "./product.entity";
import { MyRepository } from "src/common/repository";
import { Repository } from "typeorm";
import { InjectRepository } from "@nestjs/typeorm";

@Injectable()
export class ProductService extends MyRepository<Product> {
  constructor(@InjectRepository(Product) repo: Repository<Product>) {
    super(repo.target, repo.manager);
  }
}
