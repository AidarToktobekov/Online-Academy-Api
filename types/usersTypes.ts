import { Request } from "express";
import {Course} from "./coursesTypes";

export interface RequestWithUser extends Request{
    user: {
        id: number;
        email: string;
        username: string;
        createdAt: string;
        courses: Course[]
    }
}

export interface IUser {
    id: number;
    email: string;
    username: string;
    createdAt: string;
    courses: Course[]
}