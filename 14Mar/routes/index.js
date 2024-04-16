const express = require('express');
const router = express.Router();

// Định tuyến cho các yêu cầu đến '/product'
router.use('/product', require('./product'));

// Định tuyến cho các yêu cầu đến '/category'
router.use('/category', require('./category'));

// Định tuyến cho các yêu cầu đến '/users'
router.use('/users', require('./users'));

// Định tuyến cho các yêu cầu đến '/cart'
router.use('/cart', require('./cart'));

// Định tuyến cho các yêu cầu đến '/order'
router.use('/order', require('./order'));

// Bạn có thể thêm các định tuyến khác ở đây nếu cần

module.exports = router;
