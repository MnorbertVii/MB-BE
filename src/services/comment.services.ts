// import Article from "../models/article.model";
// import validateComment from "../validations/comment.validation";
// import {  Comment } from "../models/comment";
// export class CommentServices {
// 	static async sendComment(data: Comment, id: string): Promise<boolean | string[]> {
// 		const article = await Article.findOne({ _id: id });
// 		if(!article) {
// 			throw new Error('Article not found');
// 		}	
// 		console.log(data.message);
// 		const { error } = validateComment(data.message);

// 		article.comments.push(data);
// 		await article.save();
// 		return true;
// 	}

// 	static async displayComments(id: string): Promise<any[]> {
// 		const article = await Article.findOne({ _id: id });
// 		if(!article) {
// 			throw new Error('Article not found');
// 		}	
// 		return article.comments;
// 	}

// 	static async deleteComment(aId: string, cId: string): Promise<Article | string[]> {
// 		const article = await Article.findOne({ _id: aId });
// 		if(!article) {
// 			throw new Error('Article not found');
// 		}	
// 		const newComments = article.comments.filter((comment) => comment._id != cId);
// 		article.comments = newComments;
// 		return await article.save();
// 	}
// }
