import dotenv from  'dotenv';
import { NextFunction, Request, Response } from 'express';
import jwt from 'jsonwebtoken';
import { decode } from 'punycode';

dotenv.config();
const secretJWT = process.env.JWT_SECRET_KEY  || "";

export function authorizationMiddleware (req: Request, res: Response, next: NextFunction){
  const token = req.headers['authorization'];

  if(!token){
     return res.status(401).send({ message: 'Acesso negado!' });
  }

  const tokenSplited = token.split('Bearer ');

  const decoded =  jwt.verify(tokenSplited[1], secretJWT);

  if(!decoded) return res.status(401).send({ message: 'Acesso negado!'});

  next();

}
