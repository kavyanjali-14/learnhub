import express from 'express';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import User from './models/User.js';
import Course from './models/Course.js';
import Assessment from './models/Assessment.js';
import Workshop from './models/Workshop.js';
import Discussion from './models/Discussion.js';
import Progress from './models/Progress.js';
import Communication from './models/Communication.js';
import Profile from './models/Profile.js';

dotenv.config();

const app = express();
app.use(express.json());

// Replace with your actual MongoDB URI
const mongoURI = process.env.MONGODB_URI;

mongoose.connect(mongoURI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log('MongoDB connected'))
  .catch(err => console.log(err));

app.get('/', (req, res) => {
  res.send('Backend is running!');
});

app.post('/api/users', async (req, res) => {
  try {
    const user = new User(req.body);
    await user.save();
    res.status(201).json(user);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

// Course routes
app.post('/api/courses', async (req, res) => {
  try {
    const course = new Course(req.body);
    await course.save();
    res.status(201).json(course);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});
app.get('/api/courses', async (req, res) => {
  const courses = await Course.find();
  res.json(courses);
});

// Assessment routes
app.post('/api/assessments', async (req, res) => {
  try {
    const assessment = new Assessment(req.body);
    await assessment.save();
    res.status(201).json(assessment);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});
app.get('/api/assessments', async (req, res) => {
  const assessments = await Assessment.find();
  res.json(assessments);
});

// Workshop routes
app.post('/api/workshops', async (req, res) => {
  try {
    const workshop = new Workshop(req.body);
    await workshop.save();
    res.status(201).json(workshop);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});
app.get('/api/workshops', async (req, res) => {
  const workshops = await Workshop.find();
  res.json(workshops);
});

// Discussion routes
app.post('/api/discussions', async (req, res) => {
  try {
    const discussion = new Discussion(req.body);
    await discussion.save();
    res.status(201).json(discussion);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});
app.get('/api/discussions', async (req, res) => {
  const discussions = await Discussion.find();
  res.json(discussions);
});

// Progress routes
app.post('/api/progress', async (req, res) => {
  try {
    const progress = new Progress(req.body);
    await progress.save();
    res.status(201).json(progress);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});
app.get('/api/progress', async (req, res) => {
  const progress = await Progress.find();
  res.json(progress);
});

// Communication routes
app.post('/api/communications', async (req, res) => {
  try {
    const communication = new Communication(req.body);
    await communication.save();
    res.status(201).json(communication);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});
app.get('/api/communications', async (req, res) => {
  const communications = await Communication.find();
  res.json(communications);
});

// Profile routes
app.post('/api/profiles', async (req, res) => {
  try {
    const profile = new Profile(req.body);
    await profile.save();
    res.status(201).json(profile);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});
app.get('/api/profiles', async (req, res) => {
  const profiles = await Profile.find();
  res.json(profiles);
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server started on port ${PORT}`)); 