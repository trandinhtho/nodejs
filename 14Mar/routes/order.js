const express = require('express');
const router = express.Router();
const Order = require('../models/Orders');
var ResHelper = require('../helper/ResponseHandle');

router.post('/', async (req, res) => {
    try {
        const { userId, products, total, status } = req.body;
        const order = new Order({ userId, products, total, status });
        const savedOrder = await order.save();
        res.status(201).json(savedOrder);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
});
router.post('/checkout', async (req, res) => {
    console.log(req.body);
    try {
        const {userId, customer, address, phone, email, totalPrice, products  } = req.body;

        // Tạo một đối tượng Order mới từ dữ liệu nhận được từ client
        const order = new Order({
            userId: userId,
            customer: customer,
            address: address,
            phone: phone,
            total: totalPrice,
            products: products
        });

        // Lưu đối tượng Order vào cơ sở dữ liệu
        const savedOrder = await order.save();

        // Trả về phản hồi cho client
        res.status(201).json(savedOrder);
    } catch (error) {
        // Xử lý lỗi nếu có
        console.error('Error:', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
});




router.get('/thongtin', async (req, res) => {
    try {
        const orders = await Order.find();
        res.json(orders);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

router.get('/:id', getOrder, (req, res) => {
    res.json(res.order);
});

async function getOrder(req, res, next) {
    let order;
    try {
        order = await Order.findById(req.params.id);
        if (!order) {
            return res.status(404).json({ message: 'Order not found' });
        }
    } catch (error) {
        return res.status(500).json({ message: error.message });
    }
    res.order = order;
    next();
}

module.exports = router;
