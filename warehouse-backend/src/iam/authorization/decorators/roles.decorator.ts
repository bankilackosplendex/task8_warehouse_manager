import { SetMetadata } from '@nestjs/common';
import { Role } from 'generated/prisma';

// --- CUSTOM DECORATOR FOR USER ROLES -> ROLE BASED AUTHORIZATION ---
export const ROLES_KEY = 'roles';
export const Roles = (...roles: Role[]) => SetMetadata(ROLES_KEY, roles);