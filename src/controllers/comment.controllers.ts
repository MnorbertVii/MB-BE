// import { CommentServices } from "../services/comment.services";
// import { Request, Response } from 'express';
// export class CommentController {
// 	static async postComment(req:Request, res:Response ) {
// 		try {
// 			const { message } = req.body;
// 			const comment : Comment = {
// 				name: res.locals.name,
// 				message: message,
// 			};
// 			const response = await CommentServices.sendComment(
// 				comment,
// 				req.params.id
// 			);
// 			if (response !== true) {
// 				res.status(400).json({ response });
// 			} else {
// 				res.status(200).json({ message: "comment added to " + req.params.id, comment: comment });
// 			}
// 		} catch (error) {
// 			console.log(error);
// 			res.status(500).json({ error: error });
// 		}
// 	}

// 	static async displayComments(req:Request, res:Response) {
// 		try {
// 			const comments = await CommentServices.displayComments(req.params.id);
// 			res.status(200).json({ comments });
// 		} catch (error) {
// 			console.log(error);
// 			res.status(404).json({ message: "No comments found" });
// 		}
// 	}

// 	static async removeComment(req:Request, res:Response) {
// 		try {
// 			await CommentServices.deleteComment(req.params.bid, req.params.cid);
// 			res.status(200).json({ message: "Comment Deleted" });
// 		} catch (error) {
// 			console.log(error);
// 			res.status(500).json({ error: error });
// 		}
// 	}
// }