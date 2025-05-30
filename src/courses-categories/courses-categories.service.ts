import {Injectable} from "@nestjs/common";
import {PrismaService} from "../prisma/prisma.service";
import {CreateCategoryDto} from "../dto/createCategory.dto";

@Injectable()
export class CoursesCategoriesService {
    constructor(private prisma: PrismaService) {}

    async create(dto: CreateCategoryDto) {
        return this.prisma.category.create({data:{
                title: dto.title,
                description: dto.description,
            }});
    }
}