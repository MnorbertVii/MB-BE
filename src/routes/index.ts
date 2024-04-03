import express, { Router } from 'express';
import userRoutes from './api/user.routes';
import messageRoutes from './api/message.routes';

const routes: Router = express.Router();

routes.use('/users', userRoutes);
routes.use('/messages', messageRoutes);

export default routes;