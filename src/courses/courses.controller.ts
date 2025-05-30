import {Body, Controller, Get, Post, Req, UseGuards} from '@nestjs/common';
import {PrismaService} from "../prisma/prisma.service";
import {AuthGuard} from "@nestjs/passport";
import {RequestWithUser} from "../../types/usersTypes";
import {CoursesService} from "./courses.service";
import {CreateCourseDto} from "../dto/createCourse.dto";

@Controller('courses')
export class CoursesController {
    constructor(private prisma: PrismaService, private readonly coursesService: CoursesService) {}

    @Get("")
    getAll(){
        return this.prisma.course.findMany();
    }

    @Get(":id")
    getOne(id: number){
        return this.prisma.course.findUnique({where: {id}});
    }

    @UseGuards(AuthGuard("jwt"))
    @Post()
    async create(@Body() dto: CreateCourseDto, @Req() req: RequestWithUser){
        const user = req.user as {id: number};

        return await this.coursesService.create(dto, user.id);
    }

}
