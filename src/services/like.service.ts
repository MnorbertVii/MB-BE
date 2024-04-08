import Article from '../models/article.model';
import mongoose from 'mongoose';

export class LikeServices {
	static async like(id: string, email: string) { 
		console.log(id);
		const article = await Article.findById(new mongoose.Types.ObjectId(id));
		if (!article) {
			throw new Error('Article not found');
        }
		console.log(article.likes);
		if (article.likes.user.includes(email)) {
			let c = article.likes.likesNumber > 0 ? article.likes.likesNumber - 1 : 0;
			let b = article.likes.user.filter((p: string) => p !== email);
			await Article.findOneAndUpdate(
				{ _id: new mongoose.Types.ObjectId(id) },
				{ likes: { likesNumber: c, user: b } }
			);
			console.log(c);
		} else {
			let a = article.likes.likesNumber + 1;
			let p = article.likes.user;
			p.push(email);
			await Article.findOneAndUpdate(
				{_id: new mongoose.Types.ObjectId(id) },
				{ likes: { likesNumber: a, user: p } }
			);
			console.log(a);
		}

		const likedArticle = await Article.findById(new mongoose.Types.ObjectId(id));

		return { type: "response", data: likedArticle };
	}
}