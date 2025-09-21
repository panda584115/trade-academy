// backend/models/User.js

const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
        unique: true,
        lowercase: true
    },
    password: {
        type: String,
        required: true
    },
    // --- 👇 ADD THIS NEW FIELD 👇 ---
    enrolledCourses: {
        type: [String], // This defines it as an array of strings
        default: []     // It will be an empty list by default
    }
    // --- 👆 END OF NEW FIELD 👆 ---
}, { timestamps: true });

const User = mongoose.model('User', userSchema);

module.exports = User;