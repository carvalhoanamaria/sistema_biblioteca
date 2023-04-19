import {Request, Response, Router} from 'express';
import CategoriesServices from '../services/categories.services';
import { authorizationMiddleware } from '../middlewares/authorization.middleware';

const router = Router();



router.get('/', async (req: Request, res: Response) => {
    const users = await CategoriesServices.gelAll();
    res.send(users);
});

router.get('/:code', async (req: Request, res: Response) => {
    try{
        const user = await CategoriesServices.getByCode(Number(req.params.code));
        res.status(200).send(user);
    }catch(error: any){
        res.status(400).send({message: error.message});
     } 
});

router.post('/', async (req: Request, res: Response) => {
    try{
        await CategoriesServices.create(req.body);
        res.status(201).send({message: 'Categoria Criada com sucesso!'});
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
     await  CategoriesServices.remove(Number(req.params.code));
       res.status(200).send({message:'Categoria removida com sucesso!'});
    }catch(error: any){
       res.status(400).send({message: error.message});
    }
});

router.put('/:code', async (req: Request, res: Response) => {
    try{
        await  CategoriesServices.update(Number(req.params.code), req.body);
        res.status(200).send({ message: 'Categoria atualizado com sucesso!'});
    }catch(error: any){
        res.status(400).send({message: error.message});
     }  
});

export default router;