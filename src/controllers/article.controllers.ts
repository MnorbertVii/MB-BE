import Article from "../models/article.model";
import ArticleServices from "../services/article.services";
import { Request, Response } from "express";
import {v2 as cloudinary} from 'cloudinary';

export class ArticleControllers {
	static async createArticle(req: Request, res: Response) {
		try {
			const { title, content } = req.body;
			if (!req.file || !req.file.path) {
				console.log(req.file);
				return res.status(400).json({ error: 'No file provided' });
			}
			const result = await cloudinary.uploader.upload(req.file.path);
			if (!result || !result.secure_url) {
                return res.status(500).json({ error: 'Failed to upload image to Cloudinary' });
            }
			const imageUrl = result.secure_url;
			const response = await ArticleServices.postArticle({title, content, image: imageUrl});
			console.log(response);
			if (response !== true) {
				return res.status(400).json({ response });
			} else {
			const data = new Article({
				title: title,
				content: content,
				image: imageUrl,
			});
				return res.status(200).json({
					message: "Article created successfully",
					informationOnArticle: data
				
				});
			}
		} catch (error: any) {
			console.log(error);
			return res.status(500).json({ error: error.message });
		}
	}

	static async viewArticles(req: Request, res: Response) {
		try {
			const articles = await ArticleServices.displayArticles();
			if (articles.length === 0) {
				return res.status(200).json({ message: "Oops, no blogs created to display" });
			} else {
				return res.status(200).json({
					message: "List of Articles found",
					Articles: articles
				});
			}
		} catch (error: any) {
			console.log(error);
			return res.status(500).json({ error: error.message });
		}
	}

	static async viewSingleArticle(req: Request, res: Response) {
		try {
			const article = await ArticleServices.displaySingleArticle(req.params.id);
			return res.status(200).json({
				message: "Article found",
				Article: article
			});
		} catch (error: any) {
			console.log(error);
			return res.status(500).json({ error: error.message });
		}
	}


	static async updateArticle(req: Request, res: Response) {
		try {
			let data: any = {};
			if (req.body.title) {
				data.title = req.body.title;
			}
			if (req.body.content) {
				data.content = req.body.content;
			}
			if (req.file) {
				const result = await cloudinary.uploader.upload(req.file.path);
				if (!result || !result.secure_url) {
					return res.status(500).json({ error: 'Failed to upload image to Cloudinary' });
				}
				data.image = result.secure_url;
			}
			const response = await ArticleServices.editArticle(req.params.id, data);
			if (response instanceof Article) {
				return res.status(200).json({
					message: `Article with id:${req.params.id} Updated successfully`, 
					UpdatedArticle: response
				});
			} else {
				return res.status(400).json({ response });
			}
		} catch (error: any) {
			console.log(error);
			return res.status(500).json({ error: error.message });
		}
	}





	static async deleteArticle(req: Request, res: Response) {
		try {
			await ArticleServices.removeArticle(req.params.id);
			return res.status(200).json({ message: `Article with id:${req.params.id} Deleted successfully` });
		} catch (error: any) {
			console.log(error);
			return res.status(404).json({ error: error.message });
		}
	}


}