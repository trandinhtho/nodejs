const express = require('express');
const router = express.Router();
const Product = require('../models/Product');

// Route để lấy tất cả sản phẩm
router.get('/thongtin', async (req, res) => {
    try {
        const products = await Product.find();
        res.json(products);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Internal server error' });
    }
});

// Route để lấy thông tin của một sản phẩm dựa trên ID
router.get('/:id', async (req, res) => {
    try {
        const product = await Product.findById(req.params.id);
        if (!product) {
            return res.status(404).json({ message: 'Product not found' });
        }
        res.json(product);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Internal server error' });
    }
});

// Route để tạo một sản phẩm mới
router.post('/products', async (req, res) => {
    try {
        const { name, price, des, imageUrl } = req.body;
        const product = new Product({ name, price, des, imageUrl });
        await product.save();
        res.status(201).json(product);
    } catch (error) {
        console.error(error);
        res.status(400).json({ message: 'Invalid request' });
    }
});


// Route để cập nhật thông tin của một sản phẩm dựa trên ID
router.put('/capnhat/:id', async (req, res) => {
    console.log(req.body);
    try {
        const product = await Product.findByIdAndUpdate(req.params.id, req.body, { new: true });
        if (!product) {
            return res.status(404).json({ message: 'Product not found' });
        }
        res.json(product);
    } catch (error) {
        console.error(error);
        res.status(400).json({ message: 'Invalid request' });
    }
});

// Route để xóa một sản phẩm dựa trên ID
router.delete('/xoa/:id', async (req, res) => {
    try {
        const product = await Product.findByIdAndDelete(req.params.id);
        if (!product) {
            return res.status(404).json({ message: 'Product not found' });
        }
        res.json({ message: 'Product deleted successfully' });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Internal server error' });
    }
});

module.exports = router;
