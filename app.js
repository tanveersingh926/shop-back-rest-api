const express = require('express');
const app = express();
const morgan = require('morgan');
const bodyParser = require('body-parser'); 
const mongoose = require('mongoose'); 

const productsRoutes = require('./api/routes/products')
const ordersRoutes = require('./api/routes/orders')


mongoose.connect(process.env.MONGO_DB,(err,dd)=>{
    // console.log(err,dd);
});

// Module to log requests and response
app.use(morgan('dev'));
// Bodyparser
app.use(bodyParser.urlencoded({extended:false}));
app.use(bodyParser.json());

// CORS override middleware
app.use((req,res,next)=>{
    res.header("Access-Control-Allow-Origin", "*");
    res.header(
        "Access-Control-Allow-Headers",
        "Origin, X-Requested-With, Content-Type, Accept, Authorization, token"
    );
    if (req.method === 'OPTIONS') {
        res.header('Access-Control-Allow-Methods', 'PUT, POST, PATCH, DELETE, GET');
        return res.status(200).json({});
    }
    next();
})

// Routes which should handle requests
app.use('/products', productsRoutes);
app.use('/orders', ordersRoutes);

app.use((req,res,next)=>{
    const error = new Error('Not found');
    error.status = 404;
    next(error);
})

app.use((error, req, res, next) => {
    res.status(error.status || 500);
    res.json({
        error:{
            code:error.status,
            message:error.message
        }
    });
});

module.exports = app;