import { Request, Response } from 'express';
import { AppDataSource } from '../config/database';
import { UserPreference } from '../entities/UserPreference';

export class CheckboxController {
    async getCheckboxState(req: Request, res: Response) {
        // const userRepo = AppDataSource.getRepository(User);
        const preferenceRepo = AppDataSource.getRepository(UserPreference);

        const userId = req.user.id; // Assuming user ID is available after authentication
        const preference = await preferenceRepo.findOne({ where: { user: { id: userId } } });

        if (!preference) {
            return res.status(404).json({ message: 'Preferences not found' });
        }

        res.json({ isChecked: preference.isChecked });
    }

    async saveCheckboxState(req: Request, res: Response) {
        // const userRepo = AppDataSource.getRepository(User);
        const preferenceRepo = AppDataSource.getRepository(UserPreference);

        const userId = req.user.id; // Assuming user ID is available after authentication
        const { isChecked } = req.body;

        let preference = await preferenceRepo.findOne({ where: { user: { id: userId } } });
        if (!preference) {
            preference = preferenceRepo.create({ user: { id: userId }, isChecked });
        } else {
            preference.isChecked = isChecked;
        }

        await preferenceRepo.save(preference);
        res.json({ message: 'Checkbox state saved' });
    }
}