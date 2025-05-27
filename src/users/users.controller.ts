import { BadRequestException, Body, Controller, Delete, ForbiddenException, Get, Post } from '@nestjs/common';
import { AuthService } from '../auth/auth.service';
import { PrismaService } from '../prisma/prisma.service';
import * as bcrypt from 'bcrypt';

@Controller('users')
export class UsersController {
    constructor(private authService: AuthService, private prisma: PrismaService) {}

    @Get("")
    getAll() {
        return this.prisma.user.findMany();
    }

    @Post("login")
    login(@Body() body: {email: string; password: string}) {
        return this.authService.login(body.email, body.password);
    }

    @Post("register")
    async registerUser(@Body() body: {username: string, password: string, email: string, confirmPassword: string}) {
        try {

            if (body.password !== body.confirmPassword) {
                throw new BadRequestException('Passwords do not match');
            }
            const user = await this.authService.register(body);


            return this.authService.login(user.email, body.password);
        } catch (err) {
            throw err;
        }
    }

    @Delete()
    async deleteUser(@Body() body: {id: number, password: string}) {
        try {
            const user = await this.prisma.user.findUnique({where: {id: body.id}});

            if (!user || !(await bcrypt.compare(body.password, user.password))){
                throw new ForbiddenException('Forbidden');
            }

            await this.prisma.user.delete({where: {id: body.id}});

            return {
                message: 'User deleted successfully.',
            };
        }catch (err){
            throw err;
        }
    }
}
