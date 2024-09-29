import {Body, Controller, Get, Post, UseGuards, Request} from '@nestjs/common';
import {AuthService} from "@api/auth/auth.service";
import {JwtAuthGuard} from "@api/auth/jwt-auth.guard";
import {RequestWithUser} from "@api/auth/jwt.strategy";
import {UserService} from "@api/user/user.service";

export type AuthBody = {
    email: string;
    password: string;
}

@Controller('auth')
export class AuthController {
    constructor(private readonly authService: AuthService, private readonly userService: UserService) {
    }

    @Post('login')
    async login(@Body() authBody: AuthBody) {
        return await this.authService.login({authBody});
    }

    @UseGuards(JwtAuthGuard)
    @Get()
    async authenticateUser(@Request() request: RequestWithUser) {
        return await this.userService.getUser({userId: request.user.userId});
    }

}
