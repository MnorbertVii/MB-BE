import mongoose, { Document, Schema } from "mongoose";

import { Comment } from "./comment";

interface Likes {
	likesNumber: number;
	user: any[];
}

interface Article extends Document {
	title: string;
	content: string;
	image: string;
	comments: Comment[];
	likes: Likes;
}

const articleSchema: Schema<Article> = new Schema({
	title: String,
	content: String,
	image: String,
	comments: [{ name: String, message: String, email: String}],
	likes: {
		likesNumber: { type: Number, default: 0 },
		user: []
	},
});

const Article = mongoose.model<Article>("Article", articleSchema);
export default Article;