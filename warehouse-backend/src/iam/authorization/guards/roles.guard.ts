import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { Observable } from 'rxjs';
import { REQUEST_USER_KEY } from '../../iam.constants';
import { ActiveUserData } from '../../interfaces/active-user-data.interface';
import { ROLES_KEY } from '../decorators/roles.decorator';
import { Role } from 'generated/prisma';

@Injectable()
export class RolesGuard implements CanActivate {
  constructor(private readonly reflector: Reflector) {}

  // --- MAIN GUARD FUNCTION THAT CHECKS IF THE USER HAS THE REQUIRED ROLE(S) ---
  canActivate(
    context: ExecutionContext,
  ): boolean | Promise<boolean> | Observable<boolean> {
    // --- RETRIEVE REQUIRED ROLES FROM THE ROUTE HANDLER OR CONTROLLER CLASS ---
    const contextRoles = this.reflector.getAllAndOverride<Role[]>(ROLES_KEY, [
      context.getHandler(),
      context.getClass(),
    ]);

    // --- IF NO ROLES ARE SPECIFIED, ALLOW ACCESS ---
    if (!contextRoles) {
      return true;
    }

    // --- EXTRACT THE CURRENT USER FROM THE REQUEST OBJECT (SET BY AUTH GUARD EARLIER) ---
    const user: ActiveUserData = context.switchToHttp().getRequest()[
      REQUEST_USER_KEY
    ];

    // --- CHECK IF THE USER'S ROLE MATCHES ANY OF THE ALLOWED ROLES ---
    return contextRoles.some((role) => user.role === role);
  }
}