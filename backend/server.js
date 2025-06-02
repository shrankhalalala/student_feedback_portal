const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');

const app = express();
const PORT = process.env.PORT || 5050;

// Middleware
app.use(cors());


app.use(express.json());

// MongoDB connection
const MONGODB_URI = 'mongodb://localhost:27017/sfp_shrankhala';

mongoose.connect(MONGODB_URI)
.then(() => console.log('MongoDB connected'))
.catch(err => console.error('MongoDB connection error:', err));

// Feedback Schema and Model
const feedbackSchema = new mongoose.Schema({
    studentName: { type: String, required: true },
    course: { type: String, required: true },
    rating: { type: Number, required: true, min: 1, max: 5 },
    comments: { type: String },
    createdAt: { type: Date, default: Date.now }
});

const Feedback = mongoose.model('Feedback', feedbackSchema);

// Routes

// Add feedback
app.post('/feedback', async (req, res) => {
    try {
        const { studentName, course, rating, comments } = req.body;
        if (!studentName || !course || !rating) {
            return res.status(400).json({ message: 'Missing required fields' });
        }
        const feedback = new Feedback({ studentName, course, rating, comments });
        await feedback.save();
        res.status(201).json({ message: 'Feedback submitted successfully' });
    } catch (error) {
        res.status(500).json({ message: 'Server error' });
    }
});

app.get('/', (req, res) => {
  res.send('API is working');
});


// Get all feedback
app.get('/feedback', async (req, res) => {
    try {
        const feedbacks = await Feedback.find().sort({ createdAt: -1 });
        res.json(feedbacks);
    } catch (error) {
        res.status(500).json({ message: 'Server error' });
    }
});

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});

