import express, { Router } from "express";
import { ArticleControllers } from "../../controllers/article.controllers";
import Authenticator, { ensureAuthenticated } from "../../middlewares/auth.pass";
import isAdmin from "../../middlewares/is.admin";
import upload from "../../middlewares/multer";

Authenticator();

const route: Router = express.Router();

route.post("/",ensureAuthenticated,isAdmin,upload.single('image'), ArticleControllers.createArticle);
route.get("/", ArticleControllers.viewArticles);
route.get("/:id", ArticleControllers.viewSingleArticle);
route.delete("/:id",ensureAuthenticated,isAdmin,ArticleControllers.deleteArticle);
route.put("/:id",ensureAuthenticated,isAdmin,upload.single('image'),ArticleControllers.updateArticle);

export default route;