import passport from "passport";
import { Strategy as JwtStrategy, ExtractJwt } from "passport-jwt";
import { User } from "../models/user.model";
import express from 'express';
import { IMsg } from "../models/message.model";

const SECRET_KEY = process.env.SECRET_KEY!;

async function Authenticator() {
	passport.use(
		new JwtStrategy(
			{
				jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
				secretOrKey: SECRET_KEY,
			},
			async (jwtPayload, done) => {
				try {
					// console.log("Payload:", jwtPayload);
					const user = await User.findOne({ _id: jwtPayload.id });
					if (!user) {
						console.log("User not found");
						return done(null, false);
					}
					return done(null, user);
				} catch (err) {
					console.error("Error:", err);
					return done(err);
				}
			}
		)
	);
}

export default Authenticator;

export function ensureAuthenticated(req: express.Request, res: express.Response, next: express.NextFunction) {
	passport.authenticate('jwt', { session: false }, (err: Error, user: IMsg | false) => {
		if (err) {
			return next(err);
		}
		if (!user) {
			return res.status(401).json({ message: 'Authentication failed, please sign in' });
		}
		req.user = user;
		next();
	})(req, res, next);
}