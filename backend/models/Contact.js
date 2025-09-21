// backend/models/Contact.js

const mongoose = require('mongoose');

// This is the "blueprint" for a contact submission
const contactSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    subject: {
        type: String,
        required: true
    },
    message: {
        type: String,
        required: true
    }
}, { timestamps: true }); // timestamps adds `createdAt` and `updatedAt` fields

// The model is what we use to actually interact with the database collection
const Contact = mongoose.model('Contact', contactSchema);

module.exports = Contact;