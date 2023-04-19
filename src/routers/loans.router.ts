import { Request, Response, Router } from 'express';
import LoansServices from '../services/loans.services';
import { authorizationMiddleware } from '../middlewares/authorization.middleware';
import { Loan } from '../models/loan.models';
import mongoose, { Types } from 'mongoose';


const router = Router();


router.get('/', async (req: Request, res: Response) => {
    const loan = await LoansServices.gelAll();
    res.send(loan);
});

router.get('/client/:client', async (req: Request, res: Response) => {
    try {
        const loan = await LoansServices.getByCliente(req.params.client);
        res.status(200).send(loan);
    } catch (error: any) {
        res.status(400).send({ message: error.message });
    }
});

router.get('/descriptionBook/:book', async (req: Request, res: Response) => {
    try {
        const loan = await LoansServices.getByDescriptionBook(req.params.book);

        
        res.status(200).send(loan);
    } catch (error: any) {
        res.status(400).send({ message: error.message });
    }
});


router.get('/getByIdBook/:book', async (req: Request, res: Response) => {
    try {
        const loan = await LoansServices.getByIdBook(req.params.book);

        res.status(200).send(loan);
    } catch (error: any) {
        res.status(400).send({ message: error.message });
    }
});

router.post('/',async (req: Request, res: Response) => {
    try {
        const loan = await LoansServices.create(req.body);
        const dataDevolucao = new Date(loan.data_devolucao).toLocaleDateString('pt-BR');
        res.status(201).send({ message: `Empréstimo realizado com sucesso! A data de devolução será para o dia ${dataDevolucao}` });
    } catch (error: any) {
        res.status(400).send({ message: error.message });
    }
});


router.put('/devolution/:_id',async (req: Request, res: Response) => {
    try {

        const id = new mongoose.Types.ObjectId(req.params._id);
        await LoansServices.devolution(id, req.body);
        res.status(200).send({ message: 'Livro devolvido com sucesso!' });
    } catch (error: any) {
        res.status(400).send({ message: error.message });
    }
});


router.put('/pay_fine/:_id', async (req: Request, res: Response) => {
    try {

        const id = new mongoose.Types.ObjectId(req.params._id);
        await LoansServices.pay_fine(id, req.body);
        res.status(200).send({ message: 'Pagamento realizado com sucesso!' });
    } catch (error: any) {
        res.status(400).send({ message: error.message });
    }
});



router.get('/consultaMulta/:_id', async (req: Request, res: Response) => {
    try {
        const id = new mongoose.Types.ObjectId(req.params._id);
        const loan = await LoansServices.consultarMulta(id);
        res.status(200).send({ message: loan });
    } catch (error: any) {
        res.status(400).send({ message: error.message });
    }
});


export default router;