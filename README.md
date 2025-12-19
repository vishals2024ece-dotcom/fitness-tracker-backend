# Fitness Tracker Backend

Complete Node.js/Express backend for the Fitness Tracker application.

## Features

- **Workout Management**: CRUD operations for workout logging
- **BMI Calculation**: Calculate and store BMI history
- **Goal Tracking**: Set and track fitness goals
- **Dashboard Stats**: Analytics and progress tracking
- **MongoDB Integration**: Persistent data storage

## API Endpoints

### Workouts
- `GET /api/workouts` - Get all workouts
- `POST /api/workouts` - Create new workout
- `DELETE /api/workouts/:id` - Delete workout

### Goals
- `GET /api/goals` - Get user goals
- `PUT /api/goals` - Update goals

### BMI
- `POST /api/bmi` - Calculate and save BMI
- `GET /api/bmi` - Get BMI history
- `GET /api/bmi/latest` - Get latest BMI

### Stats
- `GET /api/stats` - Get dashboard statistics

## Quick Start

1. Install dependencies:
```bash
npm install
```

2. Start MongoDB (make sure it's running on localhost:27017)

3. Run the server:
```bash
npm run dev
```

The server will start on http://localhost:5000

## Environment Variables

Create a `.env` file:
```
PORT=5000
MONGO_URI=mongodb://localhost:27017/fitness_tracker
NODE_ENV=development
```

## Database Models

- **Workout**: type, duration, calories, date
- **Goal**: weeklyWorkouts, targetWeight, targetCalories
- **BMI**: height, weight, bmi, category

## CORS Enabled

The API accepts requests from any origin for development purposes.