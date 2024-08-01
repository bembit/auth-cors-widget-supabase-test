// src/data-source/DataSource.ts

import { DataSource } from 'typeorm';
import { User } from '../entities/User'; // Ensure this path is correct

export const AppDataSource = new DataSource({
    type: 'postgres',
    url: process.env.SUPABASE_DB_URL,
    entities: [User], // Include the User entity
    synchronize: true, // Automatically sync schema
    logging: true, // Enable logging for debugging
});
