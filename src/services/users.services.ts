
import { IUser } from "../models/user.models";
import UserRepository from "../repositories/user.repository";
import bcrypt from "bcrypt";
import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';

dotenv.config();

const secretJWT = process.env.JWT_SECRET_KEY || "";

class UsersService {

    gelAll() {
        return UserRepository.getAll();
    }

    async getByDocument(document: string) {
        const userIndex = await UserRepository.getByDocument(document);

        if (!userIndex) throw new Error("Usuario não encontrado!");

        return UserRepository.getByDocument(document);
    }

    async create(user: IUser) {
        if(user.password){
            user.password = await bcrypt.hash(user.password, 10);
        }

        if (!user.document.trim()) {
            throw new Error("Por favor, informe um documento!");
        }

        if ((user.profile != "admin") && (user.profile != "operator")) {
            throw new Error('Apenas é permitido criar usuarios com perfil admin ou operador!');
        }

        return UserRepository.create(user);
    }

    async remove(document: string) {
        const userIndex = await UserRepository.getByDocument(document);
        if (!userIndex) {
            throw new Error("Usuario não encontrado!");
        }
        return UserRepository.remove(document);
    }

    async update(document: string, user: Partial<IUser>) {
        const userIndex = await UserRepository.getByDocument(document);
        if (!userIndex) {
            throw new Error("Usuario não encontrado!");
        }
        return UserRepository.update(document, user);
    }


    async authorization(document: string, password: string){
        const userIndex = await UserRepository.getByDocument(document);
  
        if(!userIndex) throw new Error('Usuario não encontrado!');
  
        const result = await bcrypt.compare(password, userIndex.password);
  
        if(result){
          return jwt.sign( { document: userIndex.document, id: userIndex._id }, secretJWT , {
              expiresIn: '1h'
          });
        };
  
        throw new Error('Falha na autenticação!');
      }
}


export default new UsersService();