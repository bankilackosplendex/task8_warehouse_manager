import { Module } from '@nestjs/common';
import { AuthenticationController } from './authentication/authentication.controller';
import { AuthenticationService } from './authentication/authentication.service';
import { DatabaseModule } from 'src/database/database.module';
import { HashingService } from './hash/hashing.service';
import { BcryptService } from './hash/bcrypt.service';
import { JwtModule } from '@nestjs/jwt';
import jwtConfig from './config/jwt.config';
import { ConfigModule } from '@nestjs/config';
import { APP_GUARD } from '@nestjs/core';
import { AccessTokenGuard } from './authentication/guards/access-token.guard';
import { AuthenticationGuard } from './authentication/guards/authentication.guard';
import { RefreshTokenIdsStorage } from './authentication/refresh-token-ids.storage/refresh-token-ids.storage';
import { RolesGuard } from './authorization/guards/roles.guard';

@Module({
  imports: [
    DatabaseModule,
    JwtModule.registerAsync(jwtConfig.asProvider()),
    ConfigModule.forFeature(jwtConfig),
  ],
  controllers: [AuthenticationController],
  providers: [
    AuthenticationService,
    {
      provide: HashingService,
      useClass: BcryptService,
    },
    {
      provide: APP_GUARD,
      useClass: AuthenticationGuard,
    },
    {
      provide: APP_GUARD,
      useClass: RolesGuard,
    },
    AccessTokenGuard,
    RefreshTokenIdsStorage,
  ],
})
export class IamModule {}
