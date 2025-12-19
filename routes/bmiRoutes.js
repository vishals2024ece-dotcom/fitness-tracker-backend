const express = require('express');
const router = express.Router();
const BMI = require('../models/BMI');

// POST calculate and save BMI
router.post('/', async (req, res) => {
    const { height, weight } = req.body;
    
    try {
        const heightInMeters = height / 100;
        const bmiValue = weight / (heightInMeters * heightInMeters);
        
        let category;
        if (bmiValue < 18.5) category = 'Underweight';
        else if (bmiValue < 25) category = 'Normal Weight';
        else if (bmiValue < 30) category = 'Overweight';
        else category = 'Obese';
        
        const bmiRecord = new BMI({
            userId: 'default_user',
            height,
            weight,
            bmi: parseFloat(bmiValue.toFixed(1)),
            category
        });
        
        await bmiRecord.save();
        res.json(bmiRecord);
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
});

// GET BMI history
router.get('/', async (req, res) => {
    try {
        const bmiHistory = await BMI.find({ userId: 'default_user' })
            .sort({ createdAt: -1 })
            .limit(10);
        res.json(bmiHistory);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

// GET latest BMI
router.get('/latest', async (req, res) => {
    try {
        const latestBMI = await BMI.findOne({ userId: 'default_user' })
            .sort({ createdAt: -1 });
        res.json(latestBMI || null);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

module.exports = router;