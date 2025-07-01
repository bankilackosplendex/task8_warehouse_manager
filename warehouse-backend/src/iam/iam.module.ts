import { Module } from '@nestjs/common';
import { AuthenticationController } from './authentication/authentication.controller';
import { AuthenticationService } from './authentication/authentication.service';
import { DatabaseModule } from 'src/database/database.module';
import { HashingService } from './hash/hashing.service';
import { BcryptService } from './hash/bcrypt.service';
import { JwtModule } from '@nestjs/jwt';
import jwtConfig from './config/jwt.config';
import { ConfigModule } from '@nestjs/config';

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
  ],
})
export class IamModule {}
