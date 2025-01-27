require('dotenv').config();
const express = require('express');
const cors = require('cors');
const knex = require('knex');
const knexConfig = require('./knexfile');

const app = express();
const environment = process.env.NODE_ENV || 'development';
const db = knex(knexConfig[environment]);

app.use(cors());
app.use(express.json());

// Root endpoint
app.get('/', (req, res) => {
  res.json({ message: 'Welcome to the API' });
});

// Health check endpoint
app.get('/api/health', (req, res) => {
  res.json({ status: 'ok' });
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});