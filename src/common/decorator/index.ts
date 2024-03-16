import { SetMetadata } from "@nestjs/common";
import { UserRole } from "src/common/enum";
import { AUTH_META } from "../constant";

export const Roles = (...roles: UserRole[]) =>
  SetMetadata(AUTH_META.ROLE, roles);
export const Public = () => SetMetadata(AUTH_META.PUBLIC, true);
