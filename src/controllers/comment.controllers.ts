import { CommentServices } from "../services/comment.services";
import { Request, Response } from 'express';
import { Comment } from  "../models/comment";
export class CommentController {
	static async postComment(req:Request, res:Response ) {
		try {
			const { name, comment } = req.body;
			const setComment : Comment = {
				name: res.locals.name,
				comment: comment,
			};
			const response = await CommentServices.sendComment(
				setComment,
				req.params.id
			);
			if (response !== true) {
				res.status(400).json({ response });
			} else {
				res.status(200).json({ message: "comment added successfully added to blog " + req.params.id, commentary: setComment });
			}
		} catch (error) {
			console.log(error);
			res.status(500).json({ error: error });
		}
	}

	static async displayComments(req:Request, res:Response) {
		try {
			const comments = await CommentServices.displayComments(req.params.id);
			if (comments.length === 0) {
				res.status(200).json({ message: `No comments found for blog ${req.params.id}` });
			} else {
				res.status(200).json({ message: `Comments to a blog ${req.params.id} found`, listOfComments: comments});
			} 
		} catch (error) {
			console.log(error);
			res.status(404).json({ message: "No comments found" });
		}
	}

	static async removeComment(req:Request, res:Response) {
		try {
			await CommentServices.deleteComment(req.params.aId, req.params.cId);
			res.status(200).json({ message: "Comment Removed successfully" });
		} catch (error) {
			console.log(error);
			res.status(500).json({ error: error });
		}
	}
}