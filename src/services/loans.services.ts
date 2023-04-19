
import { ILoan ,Loan } from "../models/loan.models";
import LoanRepository from "../repositories/loan.repository";
import bcrypt from "bcrypt";
import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';
import moment from 'moment';
import mongoose, { Types } from 'mongoose';

dotenv.config();

const secretJWT = process.env.JWT_SECRET_KEY || "";

class BooksRouter {

    gelAll() {
        return LoanRepository.getAll();
    }

    async getByCliente(client: string) {
        const loanIndex = await LoanRepository.getByCliente(client);

        if (!loanIndex) throw new Error("Emprestimo não encontrado!");
    
        return LoanRepository.getByCliente(client);
    }

    async getByDescriptionBook(book: string) {

        const loanIndex = await LoanRepository.getByDescriptionBook(book);

        if (!loanIndex) throw new Error("Emprestimo não encontrado!");

        return LoanRepository.getByDescriptionBook(book);
    }


    async getByIdBook(book: string) {

        const loanIndex = await LoanRepository.getByIdBook(book);

        if (!loanIndex) throw new Error("Emprestimo não encontrado!");

        return LoanRepository.getByIdBook(book);
    }

    async create(loan: ILoan) {
       // const bookId = new mongoose.Types.ObjectId(loan.book);
   

        return LoanRepository.create(loan);
    }

    async consultarMulta(_id: Types.ObjectId) {

        const loanIndex = await LoanRepository.getById(_id);

        if (!loanIndex) {
            throw new Error('Empréstimo não encontrado');
        }

        await this.calcMulta(_id, {});

        if (loanIndex && loanIndex.multa > 0) {
            return (`Esse emprestimo tem multa de R$${loanIndex.multa} !`);
        } else {
            return ('Esse emprestimo não tem multa!');
        }
        
    }

    async pay_fine(_id: Types.ObjectId, loan: Partial<ILoan>) {

        const loanIndex = await LoanRepository.getById(_id);

        if (!loanIndex) {
            throw new Error('Empréstimo não encontrado');
        }

        await this.calcMulta(_id, {});

        const multaAtual = loanIndex.multa;
        const valorPago = Number(loan.multa);


        if (multaAtual == 0) {
            throw new Error('Esse emprestimo não tem multa!');
        }

        if (valorPago == 0) {
            throw new Error('O valor recebido não pode ser zero!');
        }

        if (valorPago > multaAtual) {
            throw new Error('O valor recebido não pode ser maior que o valor da multa atual!');
        }

        loan.multa = multaAtual - valorPago;

        return LoanRepository.update(_id, loan);
    }


    async devolution(_id: Types.ObjectId, loan: Partial<ILoan>) {

        const loanIndex = await LoanRepository.getById(_id);

        if (!loanIndex) {
            throw new Error('Empréstimo não encontrado');
        }

        await this.calcMulta(_id, {});

        if (loanIndex && loanIndex.multa > 0 && loan.status == 'devolvido') {
            throw new Error(`Esse emprestimo tem multa de R$ ${loanIndex.multa}, não pode ser atualizado com status para devolvido!`);
        }

        return LoanRepository.update(_id, loan);
    }



    async calcMulta(_id: Types.ObjectId, loan: Partial<ILoan>) {

        const loanIndex = await LoanRepository.getById(_id);

        if (!loanIndex) {
            throw new Error('Empréstimo não encontrado');
        }

        const dataDevolucao = moment(loanIndex.data_devolucao);
        const dataAtual = moment();
        const diferencaEmDias = dataAtual.diff(dataDevolucao, 'days');
        const multa = diferencaEmDias * 1;//taxa de multa por dia é 1 real

        loan.multa = multa;

        return LoanRepository.update(_id, loan);
    }


}


export default new BooksRouter();