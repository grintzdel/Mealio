import {Module} from '@nestjs/common';
import {AuthController} from './auth.controller';
import {AuthService} from './auth.service';
import {PrismaService} from "@api/prisma.service";
import {JwtModule} from "@nestjs/jwt";
import {JwtStrategy} from "@api/auth/jwt.strategy";
import {UserService} from "@api/user/user.service";

@Module({
    controllers: [AuthController],
    providers: [AuthService, PrismaService, JwtStrategy, UserService],
    imports: [
        JwtModule.register({
            global: true,
            secret: process.env.JWT_SECRET,
            signOptions: {expiresIn: '30d'},
        }),
    ],
})
export class AuthModule {
}
