const express = require('express');
const router = express.Router();
const Goal = require('../models/Goal');

// GET user goals
router.get('/', async (req, res) => {
    try {
        let goal = await Goal.findOne({ userId: 'default_user' });
        if (!goal) {
            goal = new Goal({ userId: 'default_user' });
            await goal.save();
        }
        res.json(goal);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

// PUT update goals
router.put('/', async (req, res) => {
    try {
        const goal = await Goal.findOneAndUpdate(
            { userId: 'default_user' },
            req.body,
            { new: true, upsert: true }
        );
        res.json(goal);
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
});

module.exports = router;