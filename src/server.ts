import app from './app';
import { AppDataSource } from './config/database';

import { UserPreference } from './entities/UserPreference';

import express from 'express';
import path from 'path';

const PORT = process.env.PORT || 3000;

// Serve static files from the "public" directory
app.use(express.static(path.join(__dirname, '../public')));

const preferenceRepo = AppDataSource.getRepository(UserPreference);

// Endpoint to get the checkbox state for a specific user
app.get('/api/checkbox-state', async (req, res) => {
  try {
      const { userId } = req.query; // Get userId from query parameter

      if (!userId) {
          return res.status(400).json({ message: 'User ID is required' });
      }

      // Fetch the state for the specified user
      const state = await preferenceRepo.findOne({ where: { user: { id: userId } } });

      if (!state) {
          return res.status(404).json({ message: 'User not found' });
      }

      res.json({ checked: state.isChecked });
  } catch (error) {
      console.error('Error fetching checkbox state:', error);
      res.status(500).json({ message: 'Internal server error' });
  }
});

// Endpoint to update the checkbox state for a specific user (authentication should be handled)
app.post('/api/checkbox-state', async (req, res) => {
  try {
      const { userId } = req.body; // Get userId from request body
      const { checked } = req.body;

      if (!userId) {
          return res.status(400).json({ message: 'User ID is required' });
      }

      // Save the state for the specified user
      await preferenceRepo.save({ user: { id: userId }, checked });
      res.json({ message: 'Checkbox state updated successfully' });
  } catch (error) {
      console.error('Error updating checkbox state:', error);
      res.status(500).json({ message: 'Internal server error' });
  }
});


// Initialize the database and start the server
AppDataSource.initialize()
  .then(() => {
    app.listen(PORT, () => {
      console.log(`Server running on port ${PORT}`);
    });
  })
  .catch((error) => console.log(error));
