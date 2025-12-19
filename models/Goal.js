const mongoose = require('mongoose');

const goalSchema = new mongoose.Schema({
    userId: {
        type: String,
        default: 'default_user', // Simple single-user system
    },
    weeklyWorkouts: {
        type: Number,
        default: 4,
    },
    targetWeight: {
        type: Number,
        default: 70,
    },
    targetCalories: {
        type: Number,
        default: 2000,
    },
}, { timestamps: true });

module.exports = mongoose.model('Goal', goalSchema);