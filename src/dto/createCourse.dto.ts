import { IsString, IsNumber } from 'class-validator'

export class CreateCourseDto {
    @IsString()
    name: string;

    @IsString()
    description: string;

    @IsNumber()
    categoryId: number;
}