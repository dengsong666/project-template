import { BadRequestException, Injectable } from "@nestjs/common";
import { JwtService } from "@nestjs/jwt";
import { InjectRepository } from "@nestjs/typeorm";
import * as bcrypt from "bcrypt";
import { plainToClass } from "class-transformer";
import { logger } from "config/logger";
import { MyRepository } from "src/common/repository";
import { DataSource, Repository } from "typeorm";
import { Role } from "../role/role.entity";
import {
  Token,
  User,
  UserLoginDto,
  UserPwdDto,
  UserRegisterDto,
} from "./user.entity";
@Injectable()
export class UserService extends MyRepository<User> {
  constructor(
    @InjectRepository(User) userRepo: Repository<User>,
    @InjectRepository(Role) private roleRepo: Repository<Role>,
    private readonly jwtService: JwtService,
    private readonly dataSource: DataSource,
  ) {
    super(userRepo.target, userRepo.manager);
  }
  /**
   * 用户登录
   * @param data
   * @returns
   */
  async login(data: UserLoginDto): Promise<Token> {
    const { username, password } = data;
    const { id, password: pwd } = await this.findOne({
      where: { username },
      select: ["id", "password"],
    });
    if (id) {
      logger.info(password, pwd);
      if (bcrypt.compareSync(password, pwd)) {
        const token = this.jwtService.sign({ username, id });
        return { token };
      }
      throw new BadRequestException("密码错误");
    }
    throw new BadRequestException("用户不存在");
  }
  /**
   * 用户注册
   * @param data
   * @returns
   */
  async register(data: UserRegisterDto) {
    const { username } = data;
    const u = await this.findOneBy({ username });
    if (u) throw new BadRequestException("用户已存在");
    const user = await this.save(plainToClass(UserRegisterDto, data));
    delete user.password;
    return user;
  }
  /**
   * 修改密码
   */
  async updatePassword(data: UserPwdDto) {
    const { id, password, newPassword } = data;
    const user = await this.findOneBy({ id });
    if (bcrypt.compareSync(password, user.password)) {
      user.password = newPassword;
      return this.save(user);
    } else throw new BadRequestException("原密码错误");
  }
  /**
   * 设置角色
   */
  async setRoles(userId: number, roleIds: number[]) {
    const user = await this.findOneBy({ id: userId });
    const roles = [];
    if (!user) throw new BadRequestException("用户不存在");

    return this.dataSource.transaction(async (manager) => {
      for (const rid of roleIds) {
        const role = await this.roleRepo.findOneBy({ id: rid });
        if (!role) throw new BadRequestException(`角色${rid}不存在`);
        roles.push(role);
      }

      user.roles = roles;
      delete user.password;
      return manager.save(user);
    });
  }
}
