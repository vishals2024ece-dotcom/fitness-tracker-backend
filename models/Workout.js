const mongoose = require('mongoose');

const workoutSchema = new mongoose.Schema({
    type: {
        type: String,
        required: true,
    },
    duration: {
        type: Number,
        required: true,
    },
    calories: {
        type: Number,
        required: true,
    },
    date: {
        type: Date,
        default: Date.now,
    },
}, { timestamps: true });

module.exports = mongoose.model('Workout', workoutSchema);
