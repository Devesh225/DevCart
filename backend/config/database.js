const mongoose = require('mongoose');

const connectDatabase = () => {
    mongoose.connect(process.env.DBURL).then((data)=> {
        console.log(`MongoDB connected with Server ${data.connection.host}`)
    });
}

module.exports = connectDatabase;
    