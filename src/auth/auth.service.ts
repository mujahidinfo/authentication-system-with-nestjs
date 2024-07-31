import {Injectable, UnauthorizedException} from '@nestjs/common';
import {UsersService} from "../users/users.service";
import {JwtService} from "@nestjs/jwt";

type AuthInput = {
    username: string;
    password: string;
}

type SignInData = {
    userId: number;
    username: string;
}

type AuthResult = {
    accessToken: string;
    userId: number;
    username: string;
}

@Injectable()
export class AuthService {
    constructor(
        private usersService: UsersService,
        private JwtService: JwtService
    ) {}

    async authenticate(input:AuthInput): Promise<AuthResult> {
      const user = await this.validateUser(input);

      if(!user) {
       throw new UnauthorizedException('Invalid credentials');
      }

      return this.signIn(user);
    }

    async validateUser(input:AuthInput): Promise<SignInData> {
        const user = await this.usersService.findUserByName(input.username);
        if (user && user.password === input.password) {
            return {
                userId: user.userId,
                username: user.username
            };
        }
        return null;
    }

    async signIn(user: SignInData): Promise<AuthResult> {
        const tokenPayload = {
            sub: user.userId,
            username: user.username
        }

        const accessToken = this.JwtService.sign(tokenPayload);

        return {
            accessToken,
            userId: user.userId,
            username: user.username
        };
    }
}
