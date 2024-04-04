import express, { Router } from "express";
import { MessageControllers } from "../../controllers/message.controllers";
import Authenticator, { ensureAuthenticated } from "../../middlewares/auth.pass";
import isAdmin from "../../middlewares/is.admin";

const route: Router = express.Router();

Authenticator().then(() => {
    route.post("/", MessageControllers.postMessage);
    route.get("/",ensureAuthenticated,isAdmin,MessageControllers.displayMessages);
    route.delete("/:id",ensureAuthenticated,isAdmin,MessageControllers.removeMessage);
});


export default route;