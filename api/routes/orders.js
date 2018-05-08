const express = require('express');
const router = express.Router();

router.get('/', function(req,res){
    res.status(200).json({
        message:'order was fetched'
    })
});

router.post('/', function(req,res){
    res.status(201).json({
        message:'order was created'
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