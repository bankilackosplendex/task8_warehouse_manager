import {
  CanActivate,
  ExecutionContext,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { AUTH_TYPE_KEY } from '../decorators/auth.decorator';
import { AuthType } from '../enums/auth-type.enum';
import { AccessTokenGuard } from './access-token.guard';

@Injectable()
export class AuthenticationGuard implements CanActivate {
  // --- DEFAULT AUTHENTICATION -> BEARER (JWT) ---
  private static readonly defaultAuthType = AuthType.Bearer;

  // --- MAPPING BETWEEN AUTH TYPES AND THEIR CORRESPONDING GUARDS ---
  private readonly authTypeGuardMap: Record<
    AuthType,
    CanActivate | CanActivate[]
  >;

  constructor(
    private readonly reflector: Reflector,
    private readonly accessTokenGuard: AccessTokenGuard,
  ) {
    // --- DEFINE WHICH GUARD TO USE FOR EACH AUTH TYPE ---
    this.authTypeGuardMap = {
      [AuthType.Bearer]: this.accessTokenGuard, // JWT based auth
      [AuthType.None]: { canActivate: () => true }, // --- No auth needed, always allow
    };
  }

  // --- MAIN GUARD FUNCTION ---
  async canActivate(context: ExecutionContext): Promise<boolean> {
    // --- READ AUTH TYPE(S) FROM CUSTOM DECORATOR ---
    const authTypes = this.reflector.getAllAndOverride<AuthType[]>(
      AUTH_TYPE_KEY,
      [context.getHandler(), context.getClass()],
    ) ?? [AuthenticationGuard.defaultAuthType]; // Default if not specified

    // --- GET CORRESPONDING GUARD(S) FOR EACH AUTH TYPE ---
    const guards = authTypes.map((type) => this.authTypeGuardMap[type]).flat();

    // --- DEFAULT ERROR TO THROW IF ALL FAIL ---
    let error = new UnauthorizedException();

    // --- TRY EACH GUARD UNTIL ONE PASSES ---
    for (const instance of guards) {
      const canActivate = await Promise.resolve(
        instance.canActivate(context),
      ).catch((err) => {
        error = err;
      });

      // --- AUTH SUCCEEDED FOR ONE GUARD ---
      if (canActivate) {
        return true;
      }
    }
    throw error;
  }
}
