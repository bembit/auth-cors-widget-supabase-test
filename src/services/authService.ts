// src/services/authService.ts

import { AppDataSource } from '../config/database';
import { User } from '../entities/User';
import jwt from 'jsonwebtoken';

export class AuthService {
    private userRepository = AppDataSource.getRepository(User);

    async register(email: string, password: string) {
        const user = new User();
        user.email = email;
        user.password = password;
        await user.hashPassword();

        return this.userRepository.save(user);
    }

    async login(email: string, password: string) {
        const user = await this.userRepository.findOne({ where: { email } });
        if (!user || !(await user.validatePassword(password))) {
            throw new Error('Invalid email or password');
        }

        const token = jwt.sign({ userId: user.id }, process.env.JWT_SECRET as string, {
            expiresIn: '1h',
        });

        return { token, user };
    }

    async verifyToken(token: string) {
        try {
            return jwt.verify(token, process.env.JWT_SECRET as string);
        } catch (error) {
            throw new Error('Invalid or expired token');
        }
    }
}
