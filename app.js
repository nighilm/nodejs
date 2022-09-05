const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const database = require('./conn.js');
const path = require('path');
const mongoose = require('mongoose');

//mongoose.connect('mongodb://localhost:27017/test_db',)

const productRoutes = require('./api/routes/products');
const ordersRoutes = require('./api/routes/orders');
const createDb = require('./api/routes/createDb');
const dbOperations = require('./api/routes/dbOperations');
const imageProfile = require('./api/routes/imageProfile');

app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json()); 
app.use(bodyParser.raw());  

app.use((req ,res ,next) => {
    res.header('Access-Control-Allow-Orgin','*');
    res.header('Access-Control-Allow-Headers','Orgin, X-Requested-With , Content-Type , Accept , Authorization');
    if (req.method === 'OPTIONS') {
        res.header('Access-Control-Allow-Methods' , 'PUT, POST ,GET , DELETE, PATCH');
        return res.status(200).json({});
    }
    next();
});

app.use('/images/profile', imageProfile, express.static(path.join(__dirname,'./public/images')));

app.use('/products', productRoutes);
app.use('/orders', ordersRoutes);
app.use('/createDb', createDb);
app.use('/dbOperations', dbOperations);


app.use((req ,res ,next) => {
    const error = new Error('Not Found');
    error.status = 404;
    next(error);
});  
 
app.use((error ,req ,res ,next) => {
    res.status(error.status || 500);
    res.json({
        error: {
            message: error.message
        }
    });  
});

module.exports = app ;