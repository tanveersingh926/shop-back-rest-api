const express = require('express');
const router = express.Router();

const mongoose = require('mongoose');
const Order = require('../models/order')
const Product = require('../models/product')
const checkAuth = require('../auth-middleware/check-auth')

router.get('/', checkAuth, function(req,res){
    Order.find()
    .select("product quantity _id")
    .populate('product', 'name')
    .exec()
    .then(docs => {
        res.status(200).json({
            count:docs.length,
            orders:docs.map(doc => {
                return {
                    _id:doc._id,
                    quantity:doc.quantity,
                    product:doc.product,
                    request:{
                        type:'GET',
                        url:'http://localhost:3001/orders/'+doc._id
                    }
        
                }
            }),
        });
    })
    .catch(err=>{
        res.status(500).json(err)
    })
});


router.post('/', checkAuth, function(req,res){

    Product.findById(req.body.productId)
    .then(product => {

        if(!product){
            console.log("product not found ", product)
            return res.status(404).json({
                message:"Product not found."
            })
        }

        const order = new Order({
            _id:new mongoose.Types.ObjectId()
            , product: req.body.productId
            , quantity: req.body.quantity
        })

        return order.save()
    })

    .then(result => {
        console.log(result)
        res.status(201).json({
            message:'Order Stored.',
            createdOrder:{
                _id:result._id,
                quantity:result.quantity,
                product:result.product
            },
            request:{
                type:'POST',
                url:'http://localhost:3001/orders/'+result._id
            }

        })
    })
    .catch(err => {
        console.log(err)
        res.status(500).json(err)
    })
});

router.get('/:orderId', checkAuth, function(req,res){
    const id = req.params.orderId;

    Order.find({_id:id})
    .populate('product', '')
    .exec()
    .then(doc => {
        if(!doc){
            return res.status(200).json({message:"Order not found."})
        } 

        res.status(200).json({
            orders:doc,
            request:{
                type:'GET',
                url:'http://localhost:3001/orders/'+id
            }
        });
    })
    .catch(err=>{
        res.status(500).json(err)
    })

   
});

router.delete('/:orderId', checkAuth, function(req,res){
    const id = req.params.orderId;

    Order.remove({_id:id})
    .exec()
    .then(result =>{
        res.status(201).json({
            message:'Order was deleted',
            request:{
                type:"GET",
                url:'http://localhost:3001/orders/',
                desription:'Get all orders.'
            }
        })
    
    })
    .catch(err=>{
        res.status(500).json(err)
    })

});

module.exports = router;