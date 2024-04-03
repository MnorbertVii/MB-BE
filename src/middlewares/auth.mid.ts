import jwt from "jsonwebtoken";
import { Request, Response, NextFunction } from "express";
import { User } from "../models/user.model";

const SECRET_KEY = process.env.SECRET_KEY!;

const authMiddleware = async (req: Request, res: Response, next: NextFunction) => {
	try {
		const bearerToken = req.header("Authorization");
		if (!bearerToken) {
			return res.status(401).json({ message: "Please sign in" });
		}

		const token = bearerToken.split(" ")[1];
		const verified = jwt.verify(token, SECRET_KEY) as { email: string, name: string };
		const userEmail = verified.email;
		const userName = verified.name;

		const existingUser = await User.findOne({ email: userEmail });
		if (!existingUser) {
			return res.status(401).json({ message: "Please sign in" });
		}

		res.locals.email = userEmail;
		res.locals.name = userName;
		next();
	} catch (error) {
		res.status(500).json({ error: error });
		console.log(error);
	}
};

export default authMiddleware;


// import express from 'express';
// import passport from 'passport';
// import authLikeComment from './authLikeComment';
// import Authenticator from './Authenticator';
// import { isAdmin } from './isAdmin'; // This is a hypothetical middleware function

// const app = express();

// // Set up Passport.js JWT strategy
// Authenticator();

// // Use Passport.js JWT strategy for viewing blog posts
// app.get('/api/blog/:id', passport.authenticate('jwt', { session: false }), (req, res) => {
//   // Handle request
// });

// // Use custom JWT middleware for commenting and liking
// app.post('/api/blog/:id/comment', authLikeComment, (req, res) => {
//   // Handle request
// });
// app.post('/api/blog/:id/like', authLikeComment, (req, res) => {
//   // Handle request
// });

// // Use Passport.js JWT strategy and isAdmin middleware for CRUD operations
// app.post('/api/blog', passport.authenticate('jwt', { session: false }), isAdmin, (req, res) => {
//   // Handle request
// });
// app.put('/api/blog/:id', passport.authenticate('jwt', { session: false }), isAdmin, (req, res) => {
//   // Handle request
// });
// app.delete('/api/blog/:id', passport.authenticate('jwt', { session: false }), isAdmin, (req, res) => {
//   // Handle request
// });

