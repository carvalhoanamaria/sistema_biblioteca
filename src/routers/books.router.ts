
import {Request, Response, Router} from 'express';
import BooksServices from '../services/books.services';
import { authorizationMiddleware } from '../middlewares/authorization.middleware';

const router = Router();


router.get('/', async (req: Request, res: Response) => {
    const books = await BooksServices.gelAll();
    res.send(books);
});

router.get('/:description', async (req: Request, res: Response) => {
    try{
        const book = await BooksServices.getByDescription(req.params.description);
        res.status(200).send(book);
    }catch(error: any){
        res.status(400).send({message: error.message});
     } 
});

router.get('/author/:author', async (req: Request, res: Response) => {
    try{
        const book = await BooksServices.getByAuthor(req.params.author);
        res.status(200).send(book);
    }catch(error: any){
        res.status(400).send({message: error.message});
     } 
});

router.get('/code/:code', async (req: Request, res: Response) => {
    try{
        const book = await BooksServices.getByCode(Number(req.params.code));
        res.status(200).send(book);
    }catch(error: any){
        res.status(400).send({message: error.message});
     } 
});

router.post('/', async (req: Request, res: Response) => {
    try{
        await BooksServices.create(req.body);
        res.status(201).send({message: 'Livro Criado com sucesso!'});
    }catch(error: any){
        res.status(400).send({message: error.message});
     }  
  });

/*   router.post('/authorization', async (req: Request, res: Response) => {
    try {
      const token = await StudentsServices.authorization(req.body.document, req.body.password);
      res.status(200).send({ token });
    } catch (error : any){
        res.status(401).send({ message: error.message});
    }
  });
   */


router.delete('/remove/:code', async (req: Request, res: Response) => {
    try{
     await  BooksServices.remove(Number(req.params.code));
       res.status(200).send({message:'Livro removido com sucesso!'});
    }catch(error: any){
       res.status(400).send({message: error.message});
    }
});

router.put('/:code', async (req: Request, res: Response) => {
    try{
        await  BooksServices.update(Number(req.params.code), req.body);
        res.status(200).send({ message: 'Livro atualizado com sucesso!'});
    }catch(error: any){
        res.status(400).send({message: error.message});
     }  
});

export default router;