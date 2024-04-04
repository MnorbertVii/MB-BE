import express from 'express';
import UserControllers from '../../controllers/user.controllers';
import { ensureAuthenticated } from '../../middlewares/auth.pass';
import isAdmin from '../../middlewares/is.admin';

const route = express.Router();

route.post('/signup', UserControllers.register);
route.post('/login', UserControllers.loginUser);
route.get('/',ensureAuthenticated,isAdmin,UserControllers.getAllUsers);

export default route;