import { ApiHideProperty } from "@nestjs/swagger";
import { Type } from "class-transformer";
import { IsBoolean, IsInt, Max, Min } from "class-validator";
import * as dayjs from "dayjs";
import {
  CreateDateColumn,
  DeleteDateColumn,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from "typeorm";
// 日期转换
const dateTransformer = {
  from: (value: Date) => value && dayjs(value).format("YYYY-MM-DD HH:mm:ss"),
  to: (value: Date) => value && dayjs(value).format("YYYY-MM-DD HH:mm:ss"),
};

export abstract class BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @ApiHideProperty()
  @CreateDateColumn({
    type: "datetime",
    transformer: dateTransformer,
    comment: "创建时间",
  })
  created_at: Date;

  @ApiHideProperty()
  @UpdateDateColumn({
    type: "datetime",
    transformer: dateTransformer,
    comment: "更新时间",
  })
  updated_at: Date;

  @ApiHideProperty()
  @DeleteDateColumn({
    type: "datetime",
    transformer: dateTransformer,
    comment: "删除时间",
    select: false,
  })
  deleted_at: Date;
}

export class BaseRes<T> {
  /**
   * 数据
   */
  public data: T;
  /**
   * 消息
   */
  public msg: string;
  /**
   * 0: 成功
   */
  public code: number;
  constructor(data: T, msg: string, code: number) {
    this.data = data;
    this.msg = msg;
    this.code = code;
  }
  static success<T>(
    msg: string = "操作成功",
    data: T = null,
    code: number = 0,
  ) {
    return new BaseRes(data, msg, code);
  }

  static fail(msg: string = "操作失败", code: number = 1) {
    return new BaseRes(null, msg, code);
  }
}
export class PageRes<T> {
  /**
   * 页码
   */
  private pageNum: number;
  /**
   * 每页条数
   */
  private pageSize: number;
  /**
   *  总条数
   */
  private total: number;
  /**
   * 数据
   */
  private list: T[];
  constructor(pageNum: number, pageSize: number, total: number, list: T[]) {
    this.pageNum = pageNum;
    this.pageSize = pageSize;
    this.total = total;
    this.list = list;
  }
}
export class PageReq {
  /**
   * 页码
   */
  @Type(() => Number)
  @Min(1)
  @IsInt()
  public pageNum?: number = 1;
  /**
   * 每页条数
   */
  @Type(() => Number)
  @Min(1)
  @Max(1000, { message: "参数$property最大值是1000, 您输入的值是:$value" })
  @IsInt()
  public pageSize?: number = 10;
  /**
   * 排序字段
   */
  public sortBy?: string = "updated_at";
  /**
   * 是否升序
   */
  @Type(() => Boolean)
  @IsBoolean()
  public isAsc?: boolean = true;
  constructor(
    pageNum: number,
    pageSize: number,
    sortBy: string,
    isAsc: boolean,
  ) {
    this.pageNum = pageNum;
    this.pageSize = pageSize;
    this.sortBy = sortBy;
    this.isAsc = isAsc;
  }
  static of(
    pageNum: number = 1,
    pageSize: number = 999,
    sortBy: string = "updated_at",
    isAsc: boolean = true,
  ) {
    return new PageReq(pageNum, pageSize, sortBy, isAsc);
  }
}
