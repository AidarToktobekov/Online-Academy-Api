import {Injectable} from "@nestjs/common";
import {PrismaService} from "../prisma/prisma.service";
import {CreateCourseDto} from "../dto/createCourse.dto";

@Injectable()
export class CoursesService {
    constructor(private prisma: PrismaService) {}

    async create(dto: CreateCourseDto, userId: number) {
        return this.prisma.course.create({
            data: {
                name: dto.name,
                description: dto.description,
                categoryId: dto.categoryId,
                authorId: userId
            }
        })
    }
}