import express from 'express';
import bodyParser from 'body-parser';

import { dynamicCorsMiddleware } from './middleware/corsMiddleware';
import { authMiddleware } from './middleware/authMiddleware';

import routes from './routes';

const app = express();

app.use(bodyParser.json());

// Use the authentication middleware globally
// app.use(authMiddleware);

// Use the dynamic CORS middleware
// keep global for test purposes
// app.use(dynamicCorsMiddleware);

app.use('/api', routes);

export default app;
