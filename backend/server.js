const app = require('./app');
const connectDatabase = require('./config/database');

const cloudinary = require('cloudinary');

if(process.env.NODE_ENV !=="PRODUCTION") {
    require('dotenv').dotenv.config({path:"backend/config/config.env"});
}

// HANDLING UNCAUGHT EXCEPTION
process.on('uncaughtException', (err) => {
    console.log(`Error: ${err.message}\nShutting Down The Server Due To Uncaught Exception.`);
    server.close(() => {
        process.exit(1);
    });
});


connectDatabase();

// CLOUDINARY
cloudinary.config({
    cloud_name: process.env.CLOUDINARY_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET
});

const server = app.listen(process.env.PORT, () => {
    console.log(`Server is working on http://localhost:${process.env.PORT}`);
});

// UNHANDLED PROMISE REJECTION HANDLING
process.on('unhandledRejection', (err) => {
    console.log(`Error: ${err.message}\nShutting Down The Server Due To Unhandled Promise Rejection.`);
    server.close(() => {
        process.exit(1);
    });
})