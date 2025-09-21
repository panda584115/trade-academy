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

// All your app.post() and app.get() routes go here...
// For example:
app.post('/api/login', async (req, res) => { /* ... your login logic ... */ });
app.post('/api/register-online', async (req, res) => { /* ... your registration logic ... */ });
app.get('/api/dashboard', protect, (req, res) => { /* ... your dashboard logic ... */ });
app.post('/api/contact', async (req, res) => { /* ... your contact logic ... */ });
app.post('/api/register-offline', async (req, res) => { /* ... your offline registration logic ... */ });


app.listen(PORT, () => {
    console.log(`🚀 Server is running successfully on http://localhost:${PORT}`);
});