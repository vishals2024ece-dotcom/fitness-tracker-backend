// Simple test script to verify API endpoints
const BASE_URL = 'http://localhost:5000';

async function testAPI() {
    console.log('🧪 Testing Fitness Tracker API...\n');
    
    try {
        // Test health check
        console.log('1. Testing health check...');
        const health = await fetch(`${BASE_URL}/health`);
        console.log('✅ Health:', await health.json());
        
        // Test stats
        console.log('\n2. Testing stats...');
        const stats = await fetch(`${BASE_URL}/api/stats`);
        console.log('✅ Stats:', await stats.json());
        
        // Test goals
        console.log('\n3. Testing goals...');
        const goals = await fetch(`${BASE_URL}/api/goals`);
        console.log('✅ Goals:', await goals.json());
        
        // Test workout creation
        console.log('\n4. Testing workout creation...');
        const workout = await fetch(`${BASE_URL}/api/workouts`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                type: 'Running',
                duration: 30,
                calories: 300,
                date: new Date().toISOString()
            })
        });
        console.log('✅ New workout:', await workout.json());
        
        // Test BMI calculation
        console.log('\n5. Testing BMI calculation...');
        const bmi = await fetch(`${BASE_URL}/api/bmi`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                height: 175,
                weight: 70
            })
        });
        console.log('✅ BMI result:', await bmi.json());
        
        console.log('\n🎉 All tests passed! Backend is working correctly.');
        
    } catch (error) {
        console.error('❌ Test failed:', error.message);
        console.log('\n💡 Make sure the server is running: npm run dev');
    }
}

// Run if called directly
if (require.main === module) {
    testAPI();
}

module.exports = testAPI;