import {Body, Controller, Get, Post, Req, UseGuards} from '@nestjs/common';
import {PrismaService} from "../prisma/prisma.service";
import {CreateCategoryDto} from "../dto/createCategory.dto";
import {AuthGuard} from "@nestjs/passport";
import {RequestWithUser} from "../../types/usersTypes";
import {CoursesCategoriesService} from "./courses-categories.service";

@Controller('courses-categories')
export class CoursesCategoriesController {
    constructor(private prisma: PrismaService, private readonly createCategoryService: CoursesCategoriesService) {}

    @Get()
    getAll(){
        return this.prisma.category.findMany();
    }

    @UseGuards(AuthGuard("jwt"))
    @Post()
    create(@Body() createCategoryDto: CreateCategoryDto) {
        return this.createCategoryService.create(createCategoryDto);
    }
}
