import {Injectable} from '@nestjs/common';
import {AuthBody} from "@api/auth/auth.controller";
import {PrismaService} from "@api/prisma.service";

@Injectable()
export class AuthService {
    constructor(private readonly prisma: PrismaService) {
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

        const isPasswordSame = password === existingUser.password;

        if (!isPasswordSame) {
            throw new Error('Invalid password');
        }

        return existingUser;
    }
}
