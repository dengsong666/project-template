import { Injectable } from "@nestjs/common";
import { MyRepository } from "src/common/repository";
import { Role } from "./role.entity";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";

@Injectable()
export class RoleService extends MyRepository<Role> {
  constructor(@InjectRepository(Role) repo: Repository<Role>) {
    super(repo.target, repo.manager);
  }
}
