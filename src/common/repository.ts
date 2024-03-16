import { FindOptionsOrder, Like, Repository } from "typeorm";
import { PageReq } from "./model";

export class MyRepository<E> extends Repository<E> {
  async findPageBy(query: PageReq) {
    console.log(query);
    const {
      pageNum,
      pageSize,
      sortBy = "updated_at",
      isAsc = true,
      ...where
    } = query;
    Object.entries(where).forEach(([k, v]) => (where[k] = Like(`%${v}%`)));
    const [list, total] = await this.findAndCount({
      where,
      skip: (pageNum - 1) * pageSize,
      take: pageSize,
      order: { [sortBy]: isAsc ? "ASC" : "DESC" } as FindOptionsOrder<E>,
    });
    return { list, total, pageNum, pageSize };
  }
}
