const express = require('express');
const router = express.Router();
const Workout = require('../models/Workout');

// GET all workouts
router.get('/', async (req, res) => {
    try {
        const workouts = await Workout.find().sort({ createdAt: -1 });
        res.json(workouts);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

// POST a new workout
router.post('/', async (req, res) => {
    const { type, duration, calories, date } = req.body;

    try {
        const newWorkout = new Workout({
            type,
            duration,
            calories,
            date: date || undefined
        });

        const savedWorkout = await newWorkout.save();
        res.status(201).json(savedWorkout);
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
});

// DELETE a workout
router.delete('/:id', async (req, res) => {
    try {
        const workout = await Workout.findByIdAndDelete(req.params.id);
        if (!workout) return res.status(404).json({ message: 'Workout not found' });
        res.json({ message: 'Workout deleted' });
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

module.exports = router;
