import { SetMetadata } from '@nestjs/common';

export const Roles = (...roles: string[]) => SetMetadata('ROLES', roles);
export const NoAuth = () => SetMetadata('NO_AUTH', true);
