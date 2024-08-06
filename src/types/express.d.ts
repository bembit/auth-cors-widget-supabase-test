// TypeScript Error: Property 'user' does not exist on type 'Request'
// This TypeScript error occurs because the Request type from Express does not natively include a user property. You need to extend the Request interface to include this property.

// Add the following code to extend the Request interface:

import { Request } from 'express';

declare module 'express' {
	interface Request {
		user?: any;
	}
}

// import { Request } from 'express';
// import { CustomJwtPayload } from './CustomJWTPayload';

// declare module 'express' {
//     interface Request {
//         user?: CustomJwtPayload; // Replace 'any' with your custom type
//     }
// }


// src/types/express.d.ts
// import { User } from '../entities/User'; // Adjust path to your User entity

// declare module 'express-serve-static-core' {
//   interface Request {
//     user?: User; // Adjust the type as needed, could be an object or just an ID
//   }
// }
