
import { IBook } from "../models/book.models";
import BookRepository from "../repositories/book.repository";
import bcrypt from "bcrypt";
import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';

dotenv.config();

const secretJWT = process.env.JWT_SECRET_KEY || "";

class BooksRouter {

    gelAll() {
        return BookRepository.getAll();
    }

    async getByDescription(description: string) {
        const bookIndex = await BookRepository.getByDescription(description);

        if (!bookIndex) throw new Error("Livro não encontrado!");

        return BookRepository.getByDescription(description);
    }

    async getByAuthor(author: string) {
        const bookIndex = await BookRepository.getByAuthor(author);

        if (!bookIndex) throw new Error("Autor não encontrado!");

        return BookRepository.getByAuthor(author);
    }

    async getByCode(code: number) {
        const bookIndex = await BookRepository.getByCode(code);

        if (!bookIndex) throw new Error("Livro não encontrado!");

        return BookRepository.getByCode(code);
    }

    async create(book: IBook) {
        if (!book.description.trim()) {
            throw new Error("Por favor, informe o titulo do livro!");
        }

        return BookRepository.create(book);
    }

    async remove(code: number) {
        const bookIndex = await BookRepository.getByCode(code);
        if (!bookIndex) {
            throw new Error("Livro não encontrado!");
        }
        return BookRepository.remove(code);
    }

    async update(code: number, book: Partial<IBook>) {
        const bookIndex = await BookRepository.getByCode(code);
        if (!bookIndex) {
            throw new Error("Livro não encontrado!");
        }
        return BookRepository.update(code, book);
    }


}


export default new BooksRouter();