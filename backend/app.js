const express = require('express');
const productRoutes = require('./routes/productRoute');
const userRoutes = require('./routes/userRoute');
const orderRoutes = require('./routes/orderRoute');
const checkError = require('./middlewares/error');
const cookieParser = require('cookie-parser');
const bodyParser = require('body-parser');
const fileUpload = require('express-fileupload');


const app = express();

app.use(express.json());
app.use(cookieParser());
app.use(bodyParser.urlencoded({extended: true}));
app.use(fileUpload());
app.use("/api", productRoutes);
app.use("/api", userRoutes);
app.use("/api", orderRoutes)

// ERROR MIDDLEWARE
app.use(checkError);


module.exports = app;