import express, { Router } from "express";
import { MessageControllers } from "../../controllers/message.controllers";
import Authenticator, { ensureAuthenticated } from "../../middlewares/auth.pass";
import isAdmin from "../../middlewares/is.admin";

const route: Router = express.Router();

Authenticator().then(() => {
    route.post("/", MessageControllers.postMessage);
    route.get("/",MessageControllers.displayMessages);
    route.delete("/:id",MessageControllers.removeMessage);
});


export default route;