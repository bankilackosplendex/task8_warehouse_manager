import {
  CanActivate,
  ExecutionContext,
  Inject,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { ConfigType } from '@nestjs/config';
import { JwtService } from '@nestjs/jwt';
import jwtConfig from '../../config/jwt.config';
import { Request } from 'express';
import { REQUEST_USER_KEY } from '../../iam.constants';

@Injectable()
export class AccessTokenGuard implements CanActivate {
  constructor(
    private readonly jwtService: JwtService,
    @Inject(jwtConfig.KEY)
    private readonly jwtConfiguration: ConfigType<typeof jwtConfig>,
  ) {}

  // --- MAIN GUARD FUNCTION ---
  async canActivate(context: ExecutionContext): Promise<boolean> {
    const request = context.switchToHttp().getRequest();

    // --- EXTRACT THE JWT FROM THE AUTHORIZATION HEADER ---
    const token = this.extractTokenFromHeader(request);

    // --- IF NO TOKEN IS PROVIDED, THROW UNAUTHORIZED ERROR ---
    if (!token) {
      throw new UnauthorizedException();
    }
    try {
      // --- VERIFY THE TOKEN'S SIGNATURE AND VALIDITY USING JWT SERVICE ---
      const payload = await this.jwtService.verifyAsync(
        token,
        this.jwtConfiguration,
      );
      request[REQUEST_USER_KEY] = payload;
    } catch {
      throw new UnauthorizedException();
    }
    return true;
  }

  // --- EXTRACT JWT FROM AUTH HEADER FUNCTION ---
  private extractTokenFromHeader(request: Request): string | undefined {
    const [_, token] = request.headers.authorization?.split(' ') ?? [];
    return token;
  }
}