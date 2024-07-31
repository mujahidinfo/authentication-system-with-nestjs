import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import {UsersModule} from "../users/users.module";
import {JwtModule} from "@nestjs/jwt";
import {PassportModule} from "@nestjs/passport";
import {AuthV2Controller} from "./auth-v2.controller";
import {LocalStrategy} from "./strategies/local.strategy";
import {JwtStrategy} from "./strategies/jwt.strategy";

@Module({
  providers: [AuthService, LocalStrategy, JwtStrategy],
  controllers: [AuthController, AuthV2Controller],
  imports: [
      UsersModule,
      JwtModule.register({
        global: true,
        secret: "ksajdflkasjdas", // FIXME: Move to .env
        signOptions: { expiresIn: '1d' },
      }),
      PassportModule,

  ]
})
export class AuthModule {}

