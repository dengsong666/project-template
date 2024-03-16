import { Module } from "@nestjs/common";
import { JwtModule } from "@nestjs/jwt";
import { PassportModule } from "@nestjs/passport";
import { TypeOrmModule } from "@nestjs/typeorm";
import { JwtStrategy } from "./jwt.strategy";
import { UserController } from "./user.controller";
import { User } from "./user.entity";
import { UserService } from "./user.service";
import { JWT_SECRET } from "src/common/constant";
import { Role } from "../role/role.entity";
import { Order } from "../order/order.entity";
import { Profile } from "../profile/profile.entity";

@Module({
  imports: [
    TypeOrmModule.forFeature([User, Profile, Role, Order]),
    PassportModule,
    JwtModule.register({
      secret: JWT_SECRET,
      signOptions: { expiresIn: "8h" },
    }),
  ],
  providers: [UserService, JwtStrategy],
  controllers: [UserController],
  exports: [UserService],
})
export class UserModule {}
