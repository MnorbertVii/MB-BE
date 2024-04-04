import Article from "../models/article.model";
import mongoose from 'mongoose';
import validateArticle from "../validations/article.validation";

let ObjectId = mongoose.Types.ObjectId;

export default class ArticleServices {
	static async postArticle(data: any): Promise<boolean | string[]> {
		const { error, value } = validateArticle(data);

		if (error) {
			return error.details.map((err: any) => err.message);
		} else {
			const article = new Article(value);
			await article.save();
			return true;
		}
	}

	static async displayArticles(): Promise<Article[]> {
		const articles = await Article.find();
		return articles;
	}

	static async displaySingleArticle(id: string): Promise<Article | null> {
		const article = await Article.findById(new ObjectId(id));
		return article;
	}

	static async removeArticle(id: string): Promise<any> {
		return await Article.deleteOne({ _id: id });
	}

	static async editArticle(id: string, data: any): Promise<boolean | string[]> {
		const { error, value } = validateArticle(data);
		if (error) {
			return error.details.map((detail: any) => detail.message);
		} else {
			const article = await Article.findOne({ _id: id });
			if (!article) {
				throw new Error('Article not found');
			}
			if (data.title !== null) {
				article.title = data.title;
			}
			if (data.content !== null) {
				article.content = data.content;
			}
			if (data.image !== null) {
				article.image = data.image;
			}
			await article.save();
			return true;
		}
	}
}