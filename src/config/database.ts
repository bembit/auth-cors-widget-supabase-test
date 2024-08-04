import { DataSource } from 'typeorm';
import 'dotenv/config';  // To load the .env variables
import { User } from '../entities/User';
// import { Appointment } from '../entities/Appointment';
import { UserPreference } from '../entities/UserPreference';

const AppDataSource = new DataSource({
	type: 'postgres',
	url: process.env.SUPABASE_DB_URL,
	entities: [User, UserPreference],
	// true for now to sync user_preferences table
	synchronize: true,
	logging: false,
});

AppDataSource.initialize()
	.then(() => {
		console.log('Data Source has been initialized!');
	})
	.catch((err) => {
		console.error('Error during Data Source initialization:', err);
	});

export { AppDataSource };
