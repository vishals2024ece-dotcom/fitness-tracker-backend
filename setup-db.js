const mongoose = require('mongoose');
const Workout = require('./models/Workout');
const Goal = require('./models/Goal');
const BMI = require('./models/BMI');

const MONGO_URI = 'mongodb://localhost:27017/fitness_tracker';

async function setupDatabase() {
    try {
        console.log('🔗 Connecting to MongoDB...');
        await mongoose.connect(MONGO_URI);
        console.log('✅ Connected to MongoDB');
        
        // Create sample data
        console.log('📝 Creating sample data...');
        
        // Sample workouts
        const sampleWorkouts = [
            { type: 'Running', duration: 30, calories: 300, date: new Date() },
            { type: 'Cycling', duration: 45, calories: 400, date: new Date(Date.now() - 86400000) },
            { type: 'Weightlifting', duration: 60, calories: 250, date: new Date(Date.now() - 172800000) }
        ];
        
        await Workout.deleteMany({}); // Clear existing
        await Workout.insertMany(sampleWorkouts);
        console.log('✅ Sample workouts created');
        
        // Default goals
        await Goal.deleteMany({});
        await Goal.create({
            userId: 'default_user',
            weeklyWorkouts: 4,
            targetWeight: 70,
            targetCalories: 2000
        });
        console.log('✅ Default goals created');
        
        // Sample BMI
        await BMI.deleteMany({});
        await BMI.create({
            userId: 'default_user',
            height: 175,
            weight: 70,
            bmi: 22.9,
            category: 'Normal Weight'
        });
        console.log('✅ Sample BMI record created');
        
        console.log('\n🎉 Database setup complete!');
        console.log('You can now start the server with: npm run dev');
        
    } catch (error) {
        console.error('❌ Setup failed:', error.message);
    } finally {
        await mongoose.disconnect();
    }
}

setupDatabase();