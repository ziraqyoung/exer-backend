const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const app = express();
// configure dotenv
require('dotenv').config();
/**
 * Constants
 */
const port = process.env.PORT || 5000;
const mongoUrl = process.env.MONGO_URI;
const exerciseRoutes = require('./routes/exercisesRoute');
/**
 * Middlewares
 */
app.use(cors());
app.use(express.json());
/**
 * Database connection
 */
mongoose.connect(mongoUrl, { useCreateIndex: true, useNewUrlParser: true });
const connection = mongoose.connection;
connection.on('error', (err) => console.log(err));
connection.once('open', () => {
  console.log('MongoDB connection establishes successfully.');
});
/**
 *  Routes registrations
 */
app.get('/', (req, res) => res.send('Hi welcome to Exercise tracker App!'))
app.use('/api/exercise', exerciseRoutes);
/**
 * Configurations
 */
app.listen(port, () => console.log(`Exprepp API listening on port ${port}`));
