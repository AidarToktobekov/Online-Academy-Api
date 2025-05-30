import {IUser} from "./usersTypes";

export interface Course {
    id: string;
    name: string;
    category: CourseCategory;
    categoryId: number;
    author: IUser;
    authorId: number;
    createdAt: string;
    description: string;
}

export interface CourseCategory {
    id: number;
    name: string;
    description: string;
    course: Course[];
}

export interface CreateCourseDto {
    title: string;
    description: string;
    categoryId: number;
}