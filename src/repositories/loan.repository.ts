import { ILoan, Loan } from "../models/loan.models";
import mongoose, { Types } from 'mongoose';


class LoanRepository {

    getAll() {
        return Loan.find().populate('client', 'name').populate('book', 'description');
    }

    async getByCliente(client: string) {
        const regex = new RegExp(client, 'i');

        const loans = await Loan.find({})
            .populate('book', 'description')
            .populate({
                path: 'client',
                match: { name: regex }
            })
            .exec();

        const filt = loans.filter((loan) => loan.client !== null);

        if (filt.length === 0) {
            throw new Error("Cliente não encontrado!");
        }

        return filt;
    }

    async getByDescriptionBook(book: string) {
        const regex = new RegExp(book, 'i');

        const loans = await Loan.find({})
            .populate('client', 'name')
            .populate({
                path: 'book',
                match: { description: regex }
            })
            .exec();

        const filt = loans.filter((loan) => loan.client !== null && loan.status !== 'emprestado');

        if (filt.length === 0) {
            throw new Error("Livro não disponível para empréstimo!");
        }

        return filt;
    }

    //   const id = new mongoose.Types.ObjectId(req.params._id);
    //await LoansServices.devolution(id, req.body);

    async getByIdBook(book: string) {

        const regex = new mongoose.Types.ObjectId(book);

        const loans = await Loan.find({})
            .populate('client', 'name')
            .populate({
                path: 'book',
                match: { _id: regex }
            })
            .exec();



        const filt = loans.filter(
            (loan) => loan.book !== null && loan.status !== 'emprestado'
        );

        if (filt.length === 0) {
            throw new Error("Livro não disponível para empréstimo!");
        }

        return filt;
    }


    create(loan: ILoan) {
        return Loan.create(loan);
    }

    update(_id: Types.ObjectId, loan: Partial<ILoan>) {
        return Loan.updateOne({ _id: _id }, { $set: loan });
    }


    getById(_id: Types.ObjectId) {
        return Loan.findOne({ _id });
    }

}


export default new LoanRepository();
