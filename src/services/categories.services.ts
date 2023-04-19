
import { IUser } from "../models/user.models";
import CategoryRepository from "../repositories/category.repository";
import bcrypt from "bcrypt";
import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';
import { ICategory } from "../models/category.models";

dotenv.config();

const secretJWT = process.env.JWT_SECRET_KEY || "";

class UsersService {

    gelAll() {
        return CategoryRepository.getAll();
    }

    async getByCode(code: number) {
        const categoryIndex = await CategoryRepository.getByCode(code);

        if (!categoryIndex) throw new Error("Categoria não encontrada!");

        return CategoryRepository.getByCode(code);
    }

    async create(caregory: ICategory) {
        if (!caregory.description.trim()) {
            throw new Error("Por favor, informe uma descrição!");
        }


        return CategoryRepository.create(caregory);
    }

    async remove(code: number) {
        const categoryIndex = await CategoryRepository.getByCode(code);
        if (!categoryIndex) {
            throw new Error("Categoria não encontrada!");
        }
        return CategoryRepository.remove(code);
    }

    async update(code: number, caregory: Partial<ICategory>) {
        const categoryIndex = await CategoryRepository.getByCode(code);
        if (!categoryIndex) {
            throw new Error("Categoria não encontrada!");
        }
        return CategoryRepository.update(code, caregory);
    }
}


export default new UsersService();