import { Request, Response, NextFunction } from 'express';
import { User } from "../models/user.model";

const isAdmin = async (req: Request, res: Response, next: NextFunction) => {
	try {
		const user = await User.findOne({ email: (req.user as any).email });
        // console.log(user)
		if (!user || !user.isAdmin) {
			return res.status(403).json({ message: 'The route is only accessible by admin' });
		}

		next();
	} catch (error) {
		return res.status(500).json({ message: 'Internal Server Error' });
	}
};

export default isAdmin;