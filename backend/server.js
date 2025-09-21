require('dotenv').config();
const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const Contact = require('./models/Contact');
const User = require('./models/User');
const Registration = require('./models/Registration');
const { protect } = require('./middleware/authMiddleware');

const app = express();
const PORT = process.env.PORT || 3000;

app.use(cors());
app.use(express.static('../'));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

const dbConnectionString = "mongodb+srv://parashurammallat2006_db_user:WvfkBtJaDp2co1wz@cluster0.kinwz5k.mongodb.net/tradingAcademy?retryWrites=true&w=majority";

mongoose.connect(dbConnectionString)
    .then(() => console.log("✅ Successfully connected to MongoDB!"))
    .catch(err => console.error("❌ Could not connect to MongoDB.", err));

app.post('/api/login', async (req, res) => {
    try {
        const { email, password } = req.body;
        const user = await User.findOne({ email });
        if (!user || !(await bcrypt.compare(password, user.password))) {
            return res.status(400).json({ message: "Invalid credentials." });
        }
        const token = jwt.sign({ id: user._id, name: user.name }, 'your_jwt_secret', { expiresIn: '1h' });
        res.json({ message: "Login successful!", token });
    } catch (error) {
        res.status(500).json({ message: "Server error during login." });
    }
});

app.post('/api/register-online', async (req, res) => {
    try {
        const { name, email, password } = req.body;
        const selectedCourse = req.body['online-course'];
        if (!selectedCourse) {
            return res.status(400).json({ message: "Please select a course." });
        }
        const existingUser = await User.findOne({ email });
        if (existingUser) {
            return res.status(400).json({ message: "An account with this email already exists." });
        }
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);
        const newUser = new User({ name, email, password: hashedPassword, enrolledCourses: [selectedCourse] });
        await newUser.save();
        res.status(201).json({ message: "User registered successfully!" });
    } catch (error) {
        res.status(500).json({ message: "Server error during registration." });
    }
});

app.get('/api/dashboard', protect, (req, res) => {
    res.json({ id: req.user._id, name: req.user.name, email: req.user.email, enrolledCourses: req.user.enrolledCourses });
});

app.post('/api/contact', async (req, res) => {
    try {
        const newSubmission = new Contact(req.body);
        await newSubmission.save();
        res.status(200).json({ message: "Message received and saved." });
    } catch (error) {
        res.status(500).json({ message: "Error saving your message." });
    }
});

app.post('/api/register-offline', async (req, res) => {
    try {
        const newRegistration = new Registration({ course: req.body['offline-course'], name: req.body['offline-name'], phone: req.body['offline-phone'] });
        await newRegistration.save();
        res.status(200).json({ message: "Registration successful!" });
    } catch (error) {
        res.status(500).json({ message: "Error saving your registration." });
    }
});

app.listen(PORT, () => {
    console.log(`🚀 Server is running on http://localhost:${PORT}`);
});