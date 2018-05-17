const express = require('express');
const router = express.Router();

const mongoose = require('mongoose');
const Order = require('../models/order')

router.get('/', function(req,res){
    res.status(200).json({
        message:'order was fetched'
    })
});


router.post('/', function(req,res){
    const order = {
        productId:req.body.productId
        , quantity: req.body.quantity
    }
    res.status(201).json({
        message:'order was created',
        order:order
    })
});

router.get('/:orderId', function(req,res){
    res.status(200).json({
        message:'order details',
        orderId:req.params.orderId
    })
});

router.delete('/:orderId', function(req,res){
    res.status(201).json({
        message:'order was deleted',
        orderId:req.params.orderId
    })
});

module.exports = router;