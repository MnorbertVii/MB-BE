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