import express from 'express';
import bodyParser from 'body-parser';
import routes from './routes';

const app = express();

app.use(bodyParser.json());
app.use('/api', routes);

export default app;

// import express from 'express';
// import authRoutes from './routes/authRoutes';

// const app = express();
// app.use(express.json());

// app.use('/api/auth', authRoutes);

// app.listen(process.env.PORT || 3000, () => {
//   console.log(`Server running on port ${process.env.PORT || 3000}`);
// });
