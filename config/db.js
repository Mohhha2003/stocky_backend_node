const mongoose = require('mongoose');
//mongodb+srv://bisapp1310:qBTouL4NqUZdnGQJ@omar.ap8ozvx.mongodb.net/?retryWrites=true&w=majority&appName=omar

const url = 'mongodb+srv://bisapp1310:qBTouL4NqUZdnGQJ@omar.ap8ozvx.mongodb.net/?retryWrites=true&w=majority&appName=omar';

const connectDb = () => {
    mongoose.connect(url)
        .then(() => {
            console.log('Connected succesfully to server')
        });
}

module.exports = connectDb;