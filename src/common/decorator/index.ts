import { SetMetadata } from '@nestjs/common';
import { UserRole } from 'src/utils/enum';

export const Roles = (...roles: UserRole[]) => SetMetadata('ROLES', roles);
export const NoAuth = () => SetMetadata('NO_AUTH', true);
