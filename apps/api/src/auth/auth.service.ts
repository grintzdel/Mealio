import {Injectable} from '@nestjs/common';
import {AuthBody, CreateUser} from "@api/auth/auth.controller";
import {PrismaService} from "@api/prisma.service";
import {hash, compare} from "bcrypt";
import {JwtService} from "@nestjs/jwt";
import {UserPayload} from "@api/auth/jwt.strategy";

@Injectable()
export class AuthService {
    constructor(private readonly prisma: PrismaService, private readonly jwtService: JwtService) {
    }

    async register({registerBody}: { registerBody: CreateUser }) {
        const {email, userName, password} = registerBody;
        const existingUser = await this.prisma.user.findUnique({
            where: {
                email,
            },
        });

        if (existingUser) {
            throw new Error('Account already exists');
        }

        const hashedPassword = await this.hashPassword({password});

        const createdUser = await this.prisma.user.create({
            data: {
                email,
                userName,
                password: hashedPassword,
            },
        });

        return this.authenticateUser({userId: createdUser.id});
    }

    async login({authBody}: { authBody: AuthBody }) {
        const {email, password} = authBody;
        const existingUser = await this.prisma.user.findUnique({
            where: {
                email: authBody.email,
            },
        });

        if (!existingUser) {
            throw new Error('User not found');
        }

        const isPasswordValid = await this.isPasswordValid({password, hashedPassword: existingUser.password});

        if (!isPasswordValid) {
            throw new Error('Invalid password');
        }

        return this.authenticateUser({userId: existingUser.id});
    }

    private async hashPassword({password}: { password: string }) {
        const hashedPassword = await hash(password, 10);
        return hashedPassword;
    }

    private async isPasswordValid({password, hashedPassword}: { password: string, hashedPassword: string }) {
        const isPasswordValid = await compare(password, hashedPassword);
        return isPasswordValid;
    }

    private authenticateUser({userId}: UserPayload) {
        const payload: UserPayload = {userId};
        return {
            access_token: this.jwtService.sign(payload),
        };
    }

}
