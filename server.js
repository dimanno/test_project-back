const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');

require('dotenv').config();

const {userRouter}  = require('./routes')
const {PORT, MONGO_CONNECT, NODE_ENV, ALLOWED_ORIGIN} = require('./config/configs')
const ErrorHandler = require("./errors/errorHandler");
// const {response, json} = require("express");

const app = express();
mongoose.connect(MONGO_CONNECT)

app.use(cors({origin: _configCors}));

app.use(express.json());
app.use(express.urlencoded({extended: true}));

app.use('/users', userRouter);

app.use('*', (err, req, res, next) => {
    res
        .status(err.status || 500)
        .json({
            message: err.message})
})

app.listen(PORT, () => {
    console.log(`app listen ${PORT}`)
})

function _configCors(origin, callback) {

    if (NODE_ENV === 'dev') {
        return callback(null, true);
    }

    const whiteList = ALLOWED_ORIGIN.split(';');

    if (!whiteList.includes(origin)) {
        return callback(new ErrorHandler('CORS is not allowed'), false);
    }

    return callback(null, true);
}



