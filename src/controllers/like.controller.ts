import { Request, Response } from "express";
import { LikeServices } from "../services/like.service";

export default class LikeController {
	static async like(req: Request, res: Response) {
		try {
			const response = await LikeServices.like(req.params.id, res.locals.email);
			res.status(200).json({ likedArticle: response.data });
		} catch (error) {
			console.log(error);
			res.status(500).json({ error: error });
		}
	}
}