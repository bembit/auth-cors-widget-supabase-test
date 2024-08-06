// TypeScript Error: Property 'user' does not exist on type 'Request'
// This TypeScript error occurs because the Request type from Express does not natively include a user property. You need to extend the Request interface to include this property.

import { Request } from 'express';

declare module 'express' {
	interface Request {
		user?: any;
	}
}
