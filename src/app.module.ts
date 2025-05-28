import { Module } from '@nestjs/common';
import { AppService } from './app.service';
import { UsersController } from './users/users.controller';
import {JwtModule} from "@nestjs/jwt";
import {PassportModule} from "@nestjs/passport";
import {MulterModule} from "@nestjs/platform-express";
import {ConfigModule, ConfigService} from "@nestjs/config";
import {AuthService} from "./auth/auth.service";
import {PrismaService} from "./prisma/prisma.service";
import {AppController} from "./app.controller";
import { CoursesController } from './courses/courses.controller';

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
  controllers: [ UsersController, AppController, CoursesController],
  providers: [AppService, AuthService, PrismaService],
})
export class AppModule {}
