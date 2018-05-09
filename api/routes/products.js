const express = require('express');
const router = express.Router();

router.get('/', function(req, res){
    res.status(200).json({
        message:"Handling Get"
    })
});

router.post('/', function(req, res){
    const product = {
        name:req.body.name,
        price:req.body.price
    }
    res.status(200).json({
        message:"Handling POST",
        createdProduct:product
    })
});

router.get('/:productId', function(req, res){
    const id = req.params.productId;
    if(id == 'special'){
        res.status(200).json({
            message:"You discovered special ID",
            id:id
        })
    } else {
        res.status(200).json({
            message:"You passed an ID"
        })
    }
});

router.patch('/:productId', function(req, res){
    res.status(200).json({
        message:"Updated product!",
    })
});
router.delete('/:productId', function(req, res){
    res.status(200).json({
        message:"Deleted product!",
    })
});

module.exports =  router;