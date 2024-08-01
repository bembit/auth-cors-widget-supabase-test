import { Request, Response } from 'express';
import { AppDataSource } from '../config/database';
import { User } from '../entities/User';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';

export class AuthController {
  async register(req: Request, res: Response) {
    const { username, password } = req.body;
    const userRepo = AppDataSource.getRepository(User);

    let user = await userRepo.findOne({ where: { username } });
    if (user) {
      return res.status(400).json({ message: 'User already exists' });
    }

    user = userRepo.create({ username, password });
    await userRepo.save(user);

    return res.status(201).json({ message: 'User registered' });
  }

  async login(req: Request, res: Response) {
    const { username, password } = req.body;
    const userRepo = AppDataSource.getRepository(User);

    const user = await userRepo.findOne({ where: { username } });
    if (!user) {
      return res.status(400).json({ message: 'Invalid credentials' });
    }

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
