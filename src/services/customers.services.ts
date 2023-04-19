
import { IClient } from "../models/client.models";
import ClientRepository from "../repositories/client.repository";
import bcrypt from "bcrypt";
import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';

dotenv.config();

const secretJWT = process.env.JWT_SECRET_KEY || "";

class UsersService {

    gelAll() {
        return ClientRepository.getAll();
    }

    async getByDocument(document: string) {
        const userIndex = await ClientRepository.getByDocument(document);

        if (!userIndex) throw new Error("Cliente não encontrado!");

        return ClientRepository.getByDocument(document);
    }

    async create(client: IClient) {
        if (!client.document.trim()) {
            throw new Error("Por favor, informe um documento!");
        }

        return ClientRepository.create(client);
    }

    async remove(document: string) {
        const userIndex = await ClientRepository.getByDocument(document);
        if (!userIndex) {
            throw new Error("Cliente não encontrado!");
        }
        return ClientRepository.remove(document);
    }

    async update(document: string, user: Partial<IClient>) {
        const userIndex = await ClientRepository.getByDocument(document);
        if (!userIndex) {
            throw new Error("Cliente não encontrado!");
        }
        return ClientRepository.update(document, user);
    }
}


export default new UsersService();