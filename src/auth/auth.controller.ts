import {Body, Controller, Get, HttpCode, HttpStatus, Post, UseGuards, Request} from '@nestjs/common';
import {AuthService} from "./auth.service";
import {AuthGuard} from "./guards/auth.guard";

@Controller('auth')
export class AuthController {
    constructor(private authService: AuthService){}

    @HttpCode(HttpStatus.OK)
    @Post('login')
    login(@Body() input: {username: string, password: string}) {
        return this.authService.authenticate(input);
    }

    @UseGuards(AuthGuard)
    @Get('me')
    getUserInfo(@Request() req: {user: {userId: number, username: string}}) {
        return req.user;
    }
}