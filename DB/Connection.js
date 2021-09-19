const mongoose = require('mongoose');

const URI = "mongodb+srv://dbUser:dbUser@cluster0.4hjmm.mongodb.net/myFirstDatabase?retryWrites=true&w=majority";

const connectDB = () => {
    mongoose.connect(URI);
    console.log("our database has been connected");
}

module.exports = connectDB;