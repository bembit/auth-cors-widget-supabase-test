// src/controllers/authController.ts

import { Request, Response } from 'express';
import { AuthService } from '../services/authService';

const authService = new AuthService();

export const register = async (req: Request, res: Response) => {
    try {
        const { email, password } = req.body;
        const user = await authService.register(email, password);
        res.status(201).json({ message: 'User registered successfully', user });
    } catch (error) {
        // res.status(400).json({ message: error.message });
        res.status(400).json({ message: 'Error registering user' });
    }
};

export const login = async (req: Request, res: Response) => {
    try {
        const { email, password } = req.body;
        const { token, user } = await authService.login(email, password);
        res.status(200).json({ token, user });
    } catch (error) {
        // res.status(400).json({ message: error.message });
        res.status(400).json({ message: 'Error logging in user' });
    }
};
