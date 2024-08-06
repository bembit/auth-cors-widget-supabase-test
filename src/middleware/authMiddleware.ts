// import { Request, Response, NextFunction } from 'express';
// import jwt from 'jsonwebtoken';

// export const authMiddleware = (req: Request, res: Response, next: NextFunction) => {
// 	const token = req.headers.authorization?.split(' ')[1];

// 	if (!token) {
// 		return res.status(401).json({ message: 'No token provided' });
// 	}

// 	try {
// 		const decoded = jwt.verify(token, process.env.JWT_SECRET || 'secret');
// 		req.user = decoded; // Attach the decoded user object to the request
// 		next();
// 	} catch (err) {
// 		return res.status(401).json({ message: 'Invalid token' });
// 	}
// };

import { Request, Response, NextFunction } from 'express';
import jwt, { JwtPayload } from 'jsonwebtoken';

// Extend the Request interface to include a user object
interface AuthRequest extends Request {
	user?: { id: string };
}

export const authMiddleware = (req: AuthRequest, res: Response, next: NextFunction) => {
	const token = req.headers.authorization?.split(' ')[1];

	if (!token) {
		return res.status(401).json({ message: 'No token provided' });
	}

	try {
		const decoded = jwt.verify(token, process.env.JWT_SECRET || 'secret') as JwtPayload;
		req.user = { id: decoded.id }; // Attach the user ID to the request object
		next();
	} catch (err) {
		return res.status(401).json({ message: 'Invalid token' });
	}
};

// import { Request, Response, NextFunction } from 'express';
// import jwt from 'jsonwebtoken';
// import { CustomJwtPayload } from '../types/CustomJWTPayload';

// export const authMiddleware = (req: Request, res: Response, next: NextFunction) => {
//     const token = req.headers.authorization?.split(' ')[1];

//     if (!token) {
//         return res.status(401).json({ message: 'No token provided' });
//     }

//     try {
//         const decoded = jwt.verify(token, process.env.JWT_SECRET || 'secret') as CustomJwtPayload;
//         req.user = decoded; // Attach the decoded user object to the request
//         next();
//     } catch (err) {
//         return res.status(401).json({ message: 'Invalid token' });
//     }
// };

