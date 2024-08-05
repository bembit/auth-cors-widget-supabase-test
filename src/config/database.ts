import { DataSource } from 'typeorm';
import 'dotenv/config';  // load the .env variables
import { User } from '../entities/User';
import { UserPreference } from '../entities/UserPreference';

const AppDataSource = new DataSource({
	type: 'postgres',
	url: process.env.SUPABASE_DB_URL,
	entities: [User, UserPreference],
	// true for now to sync user_preferences table
	synchronize: true,
	logging: false,
});

export { AppDataSource };
