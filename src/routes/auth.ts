// // src/routes/auth.ts

// import { Router } from 'express';
// import { User } from '../entities/User'; // Adjust the path as necessary
// import { AppDataSource } from '../config/database'; // Adjust the path as necessary

// const router = Router();

// // POST /api/auth/register
// router.post('/register', async (req, res) => {
//     const { email, password } = req.body;

//     if (!email || !password) {
//         return res.status(400).json({ message: 'Email and password are required.' });
//     }

//     try {
//         const userRepository = AppDataSource.getRepository(User);
//         const existingUser = await userRepository.findOneBy({ email });

//         if (existingUser) {
//             return res.status(400).json({ message: 'Email already in use.' });
//         }

//         const user = new User();
//         user.email = email;
//         user.password = password; // This will be hashed in the entity's `BeforeInsert` hook

//         await userRepository.save(user);

//         res.status(201).json({ message: 'User registered successfully', user });
//     } catch (error) {
//         console.error('Error registering user:', error);
//         res.status(500).json({ message: 'Internal server error' });
//     }
// });

// export default router;
