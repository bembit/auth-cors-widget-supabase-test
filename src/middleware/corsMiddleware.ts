import { Request, Response, NextFunction } from 'express';
import { AppDataSource } from '../config/database';
import { UserCorsPreference } from '../entities/UserCorsPreference';
import cors from 'cors';

export const dynamicCorsMiddleware = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const userId = req.user?.id;
    if (userId) {
      const corsRepo = AppDataSource.getRepository(UserCorsPreference);
      const preferences = await corsRepo.find({ where: { user: { id: userId } } });
      const allowedOrigins = preferences.map(p => p.domain);
      console.log('Allowed Origins:', allowedOrigins);

      const corsMiddleware = cors({
        origin: (origin, callback) => {
          if (!origin || allowedOrigins.includes(origin)) {

            console.log('Applying CORS middleware for userId:', userId);
            console.log('Current allowed origins:', allowedOrigins);

            callback(null, true);
          } else {

            console.log('Applying CORS middleware for userId:', userId);
            console.log('Current allowed origins:', allowedOrigins);
            
            callback(new Error('Not allowed by CORS'));
          }
        },
        credentials: true,
      });

      corsMiddleware(req, res, next);
    } else {
      res.status(401).json({ message: 'Unauthorized' });
    }
  } catch (error) {
    console.error('Error in CORS middleware:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
};
