import { Request, Response } from 'express';
import { AppDataSource } from '../config/database';
import { UserCorsPreference } from '../entities/UserCorsPreference';

export class CorsPreferencesController {

  // Get CORS preferences for the authenticated user
  async getCorsPreferences(req: Request, res: Response) {
    try {
      const userId = req.user?.id;
      if (!userId) {
        return res.status(401).json({ message: 'Unauthorized' });
      }
      
      const corsRepo = AppDataSource.getRepository(UserCorsPreference);
      const preference = await corsRepo.findOne({ where: { user: { id: userId } } });
      
      if (!preference) {
        return res.status(404).json({ message: 'CORS preference not found' });
      }

      res.json({ domain: preference.domain });
    } catch (error) {
      console.error('Error fetching CORS preferences:', error);
      res.status(500).json({ message: 'Internal server error' });
    }
  }

  // Update CORS preferences for the authenticated user
  async updateCorsPreferences(req: Request, res: Response) {
    try {
      const userId = req.user?.id;
      if (!userId) {
        return res.status(401).json({ message: 'Unauthorized' });
      }
      
      const { domain } = req.body; // Expecting a single domain string
      
      if (typeof domain !== 'string') {
        return res.status(400).json({ message: 'Invalid request format' });
      }
      
      const corsRepo = AppDataSource.getRepository(UserCorsPreference);
      
      // Find existing preferences for the user
      let existingPreference = await corsRepo.findOne({ where: { user: { id: userId } } });
      
      // If no preference found, create a new one
      if (!existingPreference) {
        existingPreference = corsRepo.create({ user: { id: userId }, domain });
      } else {
        // Update the existing preference
        existingPreference.domain = domain;
      }
      
      // Save the updated or new preference
      await corsRepo.save(existingPreference);
      
      res.json({ message: 'CORS preferences updated successfully' });
    } catch (error) {
      console.error('Error updating CORS preferences:', error);
      res.status(500).json({ message: 'Internal server error' });
    }
  }
}
