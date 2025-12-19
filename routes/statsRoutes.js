const express = require('express');
const router = express.Router();
const Workout = require('../models/Workout');
const Goal = require('../models/Goal');

// GET dashboard stats
router.get('/', async (req, res) => {
    try {
        const workouts = await Workout.find();
        const goals = await Goal.findOne({ userId: 'default_user' });
        
        // Calculate stats
        const totalWorkouts = workouts.length;
        const totalCalories = workouts.reduce((sum, w) => sum + w.calories, 0);
        
        // Weekly progress
        const oneWeekAgo = new Date();
        oneWeekAgo.setDate(oneWeekAgo.getDate() - 7);
        const weeklyWorkouts = workouts.filter(w => new Date(w.date) >= oneWeekAgo).length;
        
        // Monthly progress
        const oneMonthAgo = new Date();
        oneMonthAgo.setMonth(oneMonthAgo.getMonth() - 1);
        const monthlyWorkouts = workouts.filter(w => new Date(w.date) >= oneMonthAgo).length;
        const monthlyCalories = workouts
            .filter(w => new Date(w.date) >= oneMonthAgo)
            .reduce((sum, w) => sum + w.calories, 0);
        
        res.json({
            totalWorkouts,
            totalCalories,
            weeklyWorkouts,
            monthlyWorkouts,
            monthlyCalories,
            weeklyGoal: goals?.weeklyWorkouts || 4,
            weeklyProgress: goals ? (weeklyWorkouts / goals.weeklyWorkouts) * 100 : 0
        });
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

module.exports = router;