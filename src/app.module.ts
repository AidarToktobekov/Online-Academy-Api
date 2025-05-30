import { Module } from '@nestjs/common';
import { AppService } from './app.service';
import { UsersController } from './users/users.controller';
import {JwtModule, JwtService} from "@nestjs/jwt";
import {PassportModule} from "@nestjs/passport";
import {MulterModule} from "@nestjs/platform-express";
import {ConfigModule, ConfigService} from "@nestjs/config";
import {AuthService} from "./auth/auth.service";
import {PrismaService} from "./prisma/prisma.service";
import {AppController} from "./app.controller";
import { CoursesController } from './courses/courses.controller';
import {JwtStrategy} from "./auth/jwt.strategy";
import {CoursesService} from "./courses/courses.service";
import { CoursesCategoriesController } from './courses-categories/courses-categories.controller';
import {CoursesCategoriesService} from "./courses-categories/courses-categories.service";

@Module({
  imports: [
      MulterModule.register({
          dest: './uploads',
      }),
      PassportModule,
      ConfigModule.forRoot({
          isGlobal: true,
      }),
      JwtModule.registerAsync({
          inject: [ConfigService],
          useFactory: (config: ConfigService) => ({
              secret: config.get<string>("JWT_SECRET"),
              signOptions: { expiresIn: "1h",}
          }),
      }),
  ],
  controllers: [ UsersController, AppController, CoursesController, CoursesCategoriesController],
  providers: [AppService, AuthService, PrismaService, JwtStrategy, CoursesService, CoursesCategoriesService],
})
export class AppModule {}
