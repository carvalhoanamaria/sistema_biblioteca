import { Router } from "express";
import usersRouter from './users.router';
import categoriesRouter from './categories.router';
import booksRouter from './books.router';
import customersRouter from './customers.router';
import loansRouter from './loans.router';

const router = Router();

router.use('/users', usersRouter);
router.use('/categories', categoriesRouter);
router.use('/books', booksRouter);
router.use('/customers', customersRouter);
router.use('/loans', loansRouter);


export default router;