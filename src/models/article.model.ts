import mongoose, { Document, Schema } from "mongoose";

import { Comment } from "./comment";

interface Likes {
	likesNumber: number;
	users: any[];
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
	comments: [{ user: String, comment: String }],
	likes: {
		likesNumber: { type: Number, default: 0 },
		users: []
	},
});

const Article = mongoose.model<Article>("Article", articleSchema);
export default Article;