const express = require('express');
const product = require('./routes/productRoute');
const checkError = require('./middlewares/error');
const app = express();

app.use(express.json());
app.use("/api", product);

// ERROR MIDDLEWARE
app.use(checkError);


module.exports = app;