import {Request, Response, Router} from 'express';
import CustomersServices from '../services/customers.services';
import { authorizationMiddleware } from '../middlewares/authorization.middleware';

const router = Router();


router.get('/', async (req: Request, res: Response) => {
    const customers = await CustomersServices.gelAll();
    res.send(customers);
});

router.get('/:document', async (req: Request, res: Response) => {
    try{
        const client = await CustomersServices.getByDocument(req.params.document);
        res.status(200).send(client);
    }catch(error: any){
        res.status(400).send({message: error.message});
     } 
});

router.post('/', async (req: Request, res: Response) => {
    try{
        await CustomersServices.create(req.body);
        res.status(201).send({message: 'Cliente Criado com sucesso!'});
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


router.delete('/remove/:document', async (req: Request, res: Response) => {
    try{
     await  CustomersServices.remove(req.params.document);
       res.status(200).send({message:'Cliente removido com sucesso!'});
    }catch(error: any){
       res.status(400).send({message: error.message});
    }
});

router.put('/:document', async (req: Request, res: Response) => {
    try{
        await  CustomersServices.update(req.params.document, req.body);
        res.status(200).send({ message: 'Cliente atualizado com sucesso!'});
    }catch(error: any){
        res.status(400).send({message: error.message});
     }  
});

export default router;