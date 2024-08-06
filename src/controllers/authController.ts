import { Request, Response } from 'express';
import { AppDataSource } from '../config/database';
import { User } from '../entities/User';
import { UserPreference } from '../entities/UserPreference';
import { UserCorsPreference } from '../entities/UserCorsPreference';

import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
export class AuthController {
	async register(req: Request, res: Response) {
		const { username, password } = req.body;
		const userRepo = AppDataSource.getRepository(User);
		const preferenceRepo = AppDataSource.getRepository(UserPreference);
		const corsRepo = AppDataSource.getRepository(UserCorsPreference);

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

		const defaultCorsPreference = corsRepo.create({ domain: 'http://localhost:3000', user });
		await corsRepo.save(defaultCorsPreference);

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
}