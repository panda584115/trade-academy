const mongoose = require('mongoose');
const registrationSchema = new mongoose.Schema({
    course: { type: String, required: true },
    name: { type: String, required: true },
    phone: { type: String, required: true }
}, { timestamps: true });
const Registration = mongoose.model('Registration', registrationSchema);
module.exports = Registration;