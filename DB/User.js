const mongoose = require('mongoose');

const user = new mongoose.Schema({
    firstName: String,
    lastName: String,
    facultyEmail: String
});

module.exports = User = mongoose.model('user', user);