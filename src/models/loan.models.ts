
import { Schema } from 'mongoose';
import mongoose from 'mongoose';
import { Types } from 'mongoose';
import moment from 'moment';
import { Book, IBook } from './book.models';
import { Client, IClient } from './client.models';



type StatusType = 'emprestado' | 'devolvido';

export interface ILoan {
    client: Types.ObjectId | IClient;
    book: Types.ObjectId | IBook;
    data_emprestimo: Date;
    data_devolucao: Date;
    multa: number;
    status: StatusType;
    createAt: string | Date;
}


export const loanSchema = new Schema<ILoan>({
    client: {
        type: Schema.Types.ObjectId,
        ref: 'Client',
    },
    book: {
        type: Schema.Types.ObjectId,
        ref: 'Book',
    },
    data_emprestimo: {
        type: Date,
        default: new Date()
    },
    data_devolucao: {
        type: Date,
        default: moment().add(30, 'days')
    },
    multa: {
        type: Number,
        default: 0
    },
    status: {
        type: String,
        enum: ['emprestado', 'devolvido'],
        default: 'emprestado'
    },
    createAt: {
        type: Date,
        default: new Date()
    }
});


export const Loan = mongoose.model<ILoan>('Loan', loanSchema);