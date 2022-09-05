const express = require('express');
const router = express.Router();


router.get('/', (req, res, next) => {
    const product = {
        id: req.query.id,
        name: req.query.name,
        price: req.query.price
    };
    res.status(200).json({
            title: "GET params ",
            message: "Products Fetched Successfully!",
            products: product
    });
    
});

router.post('/', (req, res, next) => {
    const product = {
        id: req.query.id,
        name: req.query.name,
        price: req.query.price
    };
    res.status(201).json({
        title: "POST params ",
        message: "Products Created Successfully!",
        createdProducts: product
    });
});

router.put('/', (req, res, next) => { 
    const update = {
        id: req.query.id,
        updatedName: req.query.name,
        updatedPrice: req.query.price
    }
    res.status(200).json({
        title: "PUT params ",
        message: "Products Updated Successfully!",
        products: update
    })
});

router.delete('/', (req, res, next) => {
    const deletedProduct = {
        id: req.query.id,
        name: req.query.name
    };
    res.status(200).json({
        title: "DELETE params ",
        message: "Products Deleted Successfully!",
        deletedProduct: deletedProduct
    });
});

module.exports = router ;