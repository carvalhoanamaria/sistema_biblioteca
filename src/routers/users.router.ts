import {Request, Response, Router} from 'express';
import UsersServices from '../services/users.services';
import { authorizationMiddleware } from '../middlewares/authorization.middleware';

const router = Router();

//Apenas admin pode acessar
router.get('/', authorizationMiddleware, async (req: Request, res: Response) => {
    const users = await UsersServices.gelAll();
    res.send(users);
});


//Apenas admin pode acessa
router.get('/:document', authorizationMiddleware, async (req: Request, res: Response) => {
    try{
        const user = await UsersServices.getByDocument(req.params.document);
        res.status(200).send(user);
    }catch(error: any){
        res.status(400).send({message: error.message});
     } 
});

//Apenas admin pode acessa
router.post('/',  authorizationMiddleware, async (req: Request, res: Response) => {
    try{
        await UsersServices.create(req.body);
        res.status(201).send({message: 'Usuario Criado com sucesso!'});
    }catch(error: any){
        res.status(400).send({message: error.message});
     }  
  });


//Apenas admin pode acessa
router.delete('/remove/:document',  authorizationMiddleware, async (req: Request, res: Response) => {
    try{
     await  UsersServices.remove(req.params.document);
       res.status(200).send({message:'Usuario removido com sucesso!'});
    }catch(error: any){
       res.status(400).send({message: error.message});
    }
});

// Admin e Operador podem acessa
router.put('/:document', async (req: Request, res: Response) => {
    try{
        await  UsersServices.update(req.params.document, req.body);
        res.status(200).send({ message: 'Usuario atualizado com sucesso!'});
    }catch(error: any){
        res.status(400).send({message: error.message});
     }  
});

  // Rota para se autenticar no sistema
  router.post('/authorization', async (req: Request, res: Response) => {
    try {
      const token = await UsersServices.authorization(req.body.document, req.body.password);
      res.status(200).send({ token });
    } catch (error : any){
        res.status(401).send({ message: error.message});
    }
  }); 

export default router;