import {IsArray, IsString} from "class-validator";
import {Course} from "../../types/coursesTypes";

export class CreateCategoryDto {
    @IsString()
    title: string;

    @IsString()
    description: string;

    @IsArray()
    courses: Course[];
}