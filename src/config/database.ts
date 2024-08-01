// src/config/database.ts

import { DataSource } from 'typeorm';
import { User } from '../entities/User';
import 'dotenv/config';

export const AppDataSource = new DataSource({
    type: 'postgres',
    url: process.env.SUPABASE_DB_URL,
    entities: [User],
    synchronize: true,
});
