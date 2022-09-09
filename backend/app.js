const express = require('express');
const path = require('path');
const productRoutes = require('./routes/productRoute');
const userRoutes = require('./routes/userRoute');
const orderRoutes = require('./routes/orderRoute');
const checkError = require('./middlewares/error');
const cookieParser = require('cookie-parser');
const bodyParser = require('body-parser');
const fileUpload = require('express-fileupload');
const paymentRoutes = require('./routes/paymentRoute');

const app = express();

app.use(express.json());
app.use(cookieParser());
app.use(bodyParser.urlencoded({extended: true}));
app.use(fileUpload());
app.use("/api", productRoutes);
app.use("/api", userRoutes);
app.use("/api", orderRoutes)
app.use("/api", paymentRoutes);

app.use(express.static(path.join(__dirname, "../frontend/build")));

app.get("*", (req, res) => {
    res.sendFile(path.resolve(__dirname, "../frontend/build/index.html"));
})

// ERROR MIDDLEWARE
app.use(checkError);


module.exports = app;