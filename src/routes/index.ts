import express, { Router } from 'express';
import userRoutes from './api/user.routes';
import messageRoutes from './api/message.routes';
import articleRoutes from './api/article.routes';

const routes: Router = express.Router();

routes.use('/users', userRoutes);
routes.use('/messages', messageRoutes);
routes.use('/articles', articleRoutes);

export default routes;