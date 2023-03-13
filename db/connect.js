const mongoose = require('mongoose');
const { options } = require('../routes/nftRoutes');

const connectDB = async (uri) => {
    console.log("I am connected to DB");
    return mongoose.connect(uri, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
    });
};

module.exports = connectDB;