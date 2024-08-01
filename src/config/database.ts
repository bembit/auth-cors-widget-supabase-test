import { DataSource } from 'typeorm';
import 'dotenv/config';  // To load the .env variables
import { User } from '../entities/User';
// import { Appointment } from '../entities/Appointment';

const AppDataSource = new DataSource({
  type: 'postgres',
  url: process.env.SUPABASE_DB_URL,
  entities: [User],
  synchronize: false,  // This should be set to false in production for safety
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
