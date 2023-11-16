import express, { Express, Request, Response, Errback } from 'express';
import connection from '../utils/database';
import 'dotenv/config';
import { z } from 'zod';
import UserSchema from '../schemas/UserSchema';
import registerRoute from './register';
import loginRoute from './login';

require('dotenv').config();
const namespace = process.env.NAME_SPACE_KEY;
const RouterRoutes = express.Router();

type User = z.infer<typeof UserSchema>;

RouterRoutes.get('/', (req: Request, res: Response) => {
	res.send('Hello World!');
});

RouterRoutes.post('/register', registerRoute);

RouterRoutes.post('/login', loginRoute);

export default RouterRoutes;
