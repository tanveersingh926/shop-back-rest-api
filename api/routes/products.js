
const express = require('express');
const router = express.Router();
const mongoose = require('mongoose')

const Product = require('../models/product')


// Get route for Products
router.get('/', function(req, res){
    Product.find()
    .select('name price _id')
    .exec()
    .then(docs => {
        const response = {
            count:docs.length,
            products:docs.map(doc => {
                return {
                    _id:doc._id,
                    name:doc.name,
                    price:doc.price,
                    request:{
                        type: 'GET',
                        url:'http://localhost:3001/products/'+doc._id
                    }
                }
            })
        }
        // if(docs.length >= 1) {
            res.status(200).json(response);
        // } else {
        //     res.status(404).json({message:'No entries found'})
        // }
    })
    .catch(err => {
        console.log(err);
        res.status(500).json(err)
    })
    
});


// Post route to save product
router.post('/', function(req, res){
    const product = new Product({
        _id: new mongoose.Types.ObjectId(),
        name:req.body.name,
        price:req.body.price
    })
    product.save().then(result =>{
        console.log(result)
        res.status(200).json({
            message:"Handling POST",
            createdProduct:result
        })
    })
    .catch(err => {
        console.log(err);
        res.status(500).json({
            error:err
        })
    });
   
});



// get route for dingle product via productID
router.get('/:productId', function(req, res){
    const id = req.params.productId;
    
    Product.findById(id)
    .exec()
    .then(doc => {
        console.log(doc)
        if(doc){
            res.status(200).json(doc)
        } else {
            res.status(404).json({message:'No Valid entry found for provided ID.'})
        }
    })
    .catch(err=>{
        console.log(err)
        res.status(500).json({err})
        
    })
});

router.patch('/:productId', function(req, res){
    const id = req.params.productId;
    const updateOps = {};

    for(const ops of req.body) {
        updateOps[ops.propName] = ops.value;
    }
    Product.update({_id:id}, { $set:updateOps })
    .exec()
    .then(result => {
        console.log(result)
        res.status(200).json(result);
    })
    .catch(err => {
        res.status(500).json(err)
    })
});
router.delete('/:productId', function(req, res){
    const id = req.params.productId;
    Product.remove({_id:id})
    .exec()
    .then(result => {
        console.log(result);
        res.status(200).json(result);
        
    })
    .catch(err => {
        console.log(err);
        res.status(500).json({
            error:err
        })
    
    })
});

module.exports =  router;