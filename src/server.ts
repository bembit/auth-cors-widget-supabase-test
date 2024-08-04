import app from './app';
import { AppDataSource } from './config/database';

import express from 'express';
import path from 'path';

const PORT = process.env.PORT || 3000;

app.use(express.static(path.join(__dirname, '../public')));

AppDataSource.initialize()
	.then(() => {
		app.listen(PORT, () => {
		console.log(`Server running on port ${PORT}`);
		});
	})
  .catch((error) => console.log(error));
