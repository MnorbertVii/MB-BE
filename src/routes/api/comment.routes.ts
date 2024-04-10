import express from "express";
import { CommentController } from "../../controllers/comment.controllers";
import authMiddleware from "../../middlewares/auth.mid";

const route = express.Router();

route.post("/:id/comment",authMiddleware,CommentController.postComment);
route.get("/:id/comments", CommentController.displayComments);
route.delete("/:aId/comment/:cId", CommentController.removeComment);

export default route;