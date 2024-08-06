// import app from './app';
// import { AppDataSource } from './config/database';

// import express from 'express';
// import path from 'path';

// const PORT = process.env.PORT || 3000;

// app.use(express.static(path.join(__dirname, '../public')));

// AppDataSource.initialize()
// 	.then(() => {
// 		app.listen(PORT, () => {
// 		console.log(`Server running on port ${PORT}`);
// 		});
// 	})
//   .catch((error) => console.log(error));

// -----------------------------------------------

import app from './app';
import { AppDataSource } from './config/database';

import express from 'express';
import path from 'path';
import cors from 'cors';
import { authMiddleware } from './middleware/authMiddleware';
import { UserCorsPreference } from './entities/UserCorsPreference';

const PORT = process.env.PORT || 3000;

// Serve static files from the "public" directory
app.use(express.static(path.join(__dirname, '../public')));

// Use the authentication middleware globally
app.use(authMiddleware);

// Dynamic CORS configuration based on user preferences
app.use(async (req, res, next) => {
	try {
		// Extract the authenticated user's ID
		const userId = req.user?.id;
		if (userId) {
			const corsRepo = AppDataSource.getRepository(UserCorsPreference);
			const preferences = await corsRepo.find({ where: { user: { id: userId } } });
			const allowedOrigins = preferences.map(p => p.domain);

			// Setup dynamic CORS
			cors({
				origin: (origin, callback) => {
					if (!origin || allowedOrigins.includes(origin)) {
						callback(null, true);
					} else {
						callback(new Error('Not allowed by CORS'));
					}
				},
				credentials: true,
			})(req, res, next);
		} else {
			// If no user is found, return an unauthorized error
			res.status(401).json({ message: 'Unauthorized' });
		}
	} catch (error) {
		console.error('Error in CORS middleware:', error);
		res.status(500).json({ message: 'Internal server error' });
	}
});

// Initialize the database and start the server
AppDataSource.initialize()
	.then(() => {
		app.listen(PORT, () => {
			console.log(`Server running on port ${PORT}`);
		});
	})
	.catch((error) => console.log(error));

