import { Request, Response } from 'express';
import { AppDataSource } from '../config/database';
import { User } from '../entities/User';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';

import { UserPreference } from '../entities/UserPreference';

export class AuthController {
  async register(req: Request, res: Response) {
    const { username, password } = req.body;
    const userRepo = AppDataSource.getRepository(User);
    const preferenceRepo = AppDataSource.getRepository(UserPreference);

    // Check if the user already exists
    let user = await userRepo.findOne({ where: { username } });
    if (user) {
      return res.status(400).json({ message: 'User already exists' });
    }

    // Hash the password before saving
    const hashedPassword = await bcrypt.hash(password, 10);

    // Create the new user
    user = userRepo.create({ username, password: hashedPassword });
    await userRepo.save(user);

    // Create a default UserPreference for the new user
    const preferences = preferenceRepo.create({ user });
    await preferenceRepo.save(preferences);

    return res.status(201).json({ message: 'User registered' });
  }

  async login(req: Request, res: Response) {
    const { username, password } = req.body;
    const userRepo = AppDataSource.getRepository(User);

    const user = await userRepo.findOne({ where: { username } });
    if (!user) {
      return res.status(400).json({ message: 'Invalid credentials' });
    }

    // Compare the entered password with the hashed password in the database
    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      return res.status(400).json({ message: 'Invalid credentials' });
    }

    const token = jwt.sign({ id: user.id }, process.env.JWT_SECRET || 'secret', {
      expiresIn: '1h',
    });

    return res.json({ token });
  }

  // checkbox test

  // async getCheckboxState(req: Request, res: Response) {
  //   const userRepo = AppDataSource.getRepository(User);
  //   const preferenceRepo = AppDataSource.getRepository(UserPreference);
  //   const userId = (req as any).user.id;

  //   const user = await userRepo.findOne({ where: { id: userId }, relations: ['preferences'] });
  //   if (!user) {
  //     return res.status(404).json({ message: 'User not found' });
  //   }

  //   const preference = await preferenceRepo.findOne({ where: { user: { id: userId } } });
  //   return res.json({ isChecked: preference?.isChecked || false });
  // }

  // async updateCheckboxState(req: Request, res: Response) {
  //   const preferenceRepo = AppDataSource.getRepository(UserPreference);
  //   const userId = (req as any).user.id;
  //   const { isChecked } = req.body;

  //   let preference = await preferenceRepo.findOne({ where: { user: { id: userId } } });

  //   if (!preference) {
  //     preference = preferenceRepo.create({ user: { id: userId }, isChecked });
  //   } else {
  //     preference.isChecked = isChecked;
  //   }

  //   await preferenceRepo.save(preference);
  //   return res.json({ message: 'Checkbox state updated', isChecked: preference.isChecked });
  // }

  async getCheckboxState(req: Request, res: Response) {
    const userRepo = AppDataSource.getRepository(User);
    const preferenceRepo = AppDataSource.getRepository(UserPreference);

    const userId = req.user.id; // Assuming user ID is available after authentication
    const preference = await preferenceRepo.findOne({ where: { user: { id: userId } } });

    if (!preference) {
      return res.status(404).json({ message: 'Preferences not found' });
    }

    res.json({ isChecked: preference.isChecked });
  }

  async saveCheckboxState(req: Request, res: Response) {
    const userRepo = AppDataSource.getRepository(User);
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