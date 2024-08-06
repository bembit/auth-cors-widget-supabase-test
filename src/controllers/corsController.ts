import { Request, Response } from 'express';
import { AppDataSource } from '../config/database';
import { UserCorsPreference } from '../entities/UserCorsPreference';

export class CorsController {
  async getCorsPreferences(req: Request, res: Response) {
    const userId = req.user.id; // Assuming `req.user` contains authenticated user's info
    const corsRepo = AppDataSource.getRepository(UserCorsPreference);
    
    const preferences = await corsRepo.find({ where: { user: { id: userId } } });
    return res.json(preferences);
  }

  async addCorsPreference(req: Request, res: Response) {
    const userId = req.user.id;
    const { domain } = req.body;
    const corsRepo = AppDataSource.getRepository(UserCorsPreference);

    const preference = corsRepo.create({ domain, user: { id: userId } });
    await corsRepo.save(preference);

    return res.status(201).json(preference);
  }

  async deleteCorsPreference(req: Request, res: Response) {
    const userId = req.user.id;
    const { domainId } = req.params;
    const corsRepo = AppDataSource.getRepository(UserCorsPreference);

    const result = await corsRepo.delete({ id: parseInt(domainId), user: { id: userId } });
    if (result.affected === 0) {
      return res.status(404).json({ message: 'Domain not found' });
    }

    return res.status(200).json({ message: 'Domain deleted' });
  }
}
