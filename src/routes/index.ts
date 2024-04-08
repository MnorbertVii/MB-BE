import express, { Router } from 'express';
import userRoutes from './api/user.routes';
import messageRoutes from './api/message.routes';
import articleRoutes from './api/article.routes';
import commentRoutes from './api/comment.routes';
import likeRoute from './api/like.route';

const routes: Router = express.Router();

routes.use('/users', userRoutes);
routes.use('/messages', messageRoutes);
routes.use('/articles', articleRoutes);
routes.use('/article', commentRoutes);
routes.use('/article', likeRoute);


export default routes;