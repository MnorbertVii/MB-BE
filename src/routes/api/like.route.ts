import express from "express";
import LikeController from "../../controllers/like.controller";
import authMiddleware from "../../middlewares/auth.mid";
const route = express.Router();

route.post("/:id/like",authMiddleware,LikeController.like);

export default route;