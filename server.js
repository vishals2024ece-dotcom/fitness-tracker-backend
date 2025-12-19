const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
require('dotenv').config();

const workoutRoutes = require('./routes/workoutRoutes');
const goalRoutes = require('./routes/goalRoutes');
const bmiRoutes = require('./routes/bmiRoutes');
const statsRoutes = require('./routes/statsRoutes');

const app = express();
const PORT = process.env.PORT || 5000;
const MONGO_URI = process.env.MONGO_URI || 'mongodb://localhost:27017/fitness_tracker';

// Middleware
app.use(cors());
app.use(express.json());

// Health check
app.get('/health', (req, res) => {
    res.json({ status: 'OK', message: 'Fitness Tracker API is running' });
});

// Routes
app.use('/api/workouts', workoutRoutes);
app.use('/api/goals', goalRoutes);
app.use('/api/bmi', bmiRoutes);
app.use('/api/stats', statsRoutes);

// 404 handler
app.use((req, res) => {
    res.status(404).json({ message: 'Route not found' });
});

// Error handler
app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).json({ message: 'Something went wrong!' });
});

// Database Connection
mongoose.connect(MONGO_URI)
    .then(() => {
        console.log('✅ Connected to MongoDB');
        app.listen(PORT, () => console.log(`🚀 Server running on port ${PORT}`));
    })
    .catch((err) => console.error('❌ MongoDB connection error:', err));
