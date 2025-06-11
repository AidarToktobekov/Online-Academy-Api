import {
    BadRequestException,
    Body,
    Controller,
    Delete,
    ForbiddenException,
    Get,
    Post, UploadedFile,
    UseInterceptors
} from '@nestjs/common';
import { AuthService } from '../auth/auth.service';
import { PrismaService } from '../prisma/prisma.service';
import * as bcrypt from 'bcrypt';
import {FileInterceptor} from "@nestjs/platform-express";
import { diskStorage } from "multer";
import { extname } from 'path';

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
    @UseInterceptors(FileInterceptor('avatar', {
        storage: diskStorage({
            destination: "./uploads/images",
            filename(req, file, callback) {
                const unique = Date.now() + "-" + Math.round(Math.random() * 1e9);
                callback(null, unique + extname(file.originalname));
            },
        }),
    }))
    async registerUser(@Body() body: {username: string, password: string, email: string, confirmPassword: string}, @UploadedFile() avatar: Express.Multer.File) {
        try {
            if (body.password !== body.confirmPassword) {
                throw new BadRequestException('Passwords do not match');
            }
            const avatarUrl = avatar ? `/uploads/images/${avatar.filename}` : null;

            const user = await this.authService.register({...body, avatarUrl: avatarUrl});


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
