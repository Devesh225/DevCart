const app = require('./app');
const connectDatabase = require('./config/database');
const dotenv = require('dotenv');

// HANDLING UNCAUGHT EXCEPTION
process.on('uncaughtException', (err) => {
    console.log(`Error: ${err.message}\nShutting Down The Server Due To Uncaught Exception.`);
    server.close(() => {
        process.exit(1);
    });
});


dotenv.config({path:"backend/config/config.env"});

connectDatabase();

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