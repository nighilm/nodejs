const express = require('express');
const router = express.Router();

router.get('/', (req, res, next) => {
    const orderDetails = {
        orderId: req.query.id,
        itemName: req.query.name,
        price: req.query.price,
        quantity: req.query.qty
    };
    res.status(200).json({
            title: "GET params ",
            message: "Order Details!",
            orderDetails: orderDetails
    });
});

router.post('/', (req, res, next) => {
    const orderCreation = {
        orderId: req.query.id,
        itemName: req.query.name,
        price: req.query.price,
        quantity: req.query.qty
    };
    res.status(201).json({
        title: "POST params ",
        message: "Order Created Successfully!",
        createdProducts: orderCreation
    });
});

router.delete('/', (req, res, next) => {
    const deleteOrder = {
        orderId: req.query.id,
        itemName: req.query.name
    };
    res.status(200).json({
        title: "DELETE params ",
        message: "Order Deleted Successfully!",
        deletedProduct: deleteOrder
    });
});


module.exports = router;