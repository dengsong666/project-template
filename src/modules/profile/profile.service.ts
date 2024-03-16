import { Injectable } from "@nestjs/common";
import { Profile } from "./profile.entity";
import { MyRepository } from "src/common/repository";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";

@Injectable()
export class ProfileService extends MyRepository<Profile> {
  constructor(@InjectRepository(Profile) repo: Repository<Profile>) {
    super(repo.target, repo.manager);
  }
}
