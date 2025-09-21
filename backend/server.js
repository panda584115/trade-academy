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

const dbConnectionString = process.env.DB_CONNECTION_STRING;

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