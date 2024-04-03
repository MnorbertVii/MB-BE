import express from 'express';
import UserControllers from '../../controllers/user.controllers';
import authMiddleware from '../../middlewares/auth.mid';
import isAdmin from '../../middlewares/is.admin';

const route = express.Router();

route.post('/signup', UserControllers.register);
route.post('/login', UserControllers.loginUser);
route.get('/',isAdmin,authMiddleware,UserControllers.getAllUsers);

export default route;