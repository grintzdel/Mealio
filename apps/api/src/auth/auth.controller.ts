import {Body, Controller, Get, Post, UseGuards, Request} from '@nestjs/common';
import {AuthService} from "@api/auth/auth.service";
import {JwtAuthGuard} from "@api/auth/jwt-auth.guard";
import {RequestWithUser} from "@api/auth/jwt.strategy";
import {UserService} from "@api/user/user.service";
import {CreateUserDto} from "@api/auth/dto/create-user.dto";
import {LogUserDto} from "@api/auth/dto/login-user.dto";

@Controller('auth')
export class AuthController {
    constructor(private readonly authService: AuthService, private readonly userService: UserService) {
    }

    @Post('register')
    async register(@Body() registerBody: CreateUserDto) {
        return await this.authService.register({registerBody});
    }

    @Post('login')
    async login(@Body() authBody: LogUserDto) {
        return await this.authService.login({authBody});
    }

    @UseGuards(JwtAuthGuard)
    @Get()
    async getAuthenticatedUser(@Request() request: RequestWithUser) {
        return await this.userService.getUser({userId: request.user.userId});
    }

}
