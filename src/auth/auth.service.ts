import { Injectable, UnauthorizedException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';

@Injectable()
export class AuthService {
    constructor(private prisma: PrismaService, private jwtService: JwtService) {}

    async register(data: {email: string, password: string, username: string}) {
        const hashedPassword = await bcrypt.hash(data.password, 10);

        return this.prisma.user.create({
            data:{
                email: data.email,
                password: hashedPassword,
                username: data.username,
            },
            include: {
                courses: true,
            }
        })
    }

    async login(email: string, password: string) {
        const user = await this.prisma.user.findUnique({where: {email}, include: {courses: true}});

        if (!user || !(await bcrypt.compare(password, user.password))){
            throw new UnauthorizedException('Invalid credentials');
        }

        const payload = {sub: user.id, email: user.email};
        const token = await this.jwtService.signAsync(payload);
        return {
            access_token: token,
            user: {
                id: user.id,
                email: user.email,
                username: user.username,
                createdAt: user.createdAt,
                courses: user.courses,
            }
        }
    }
}