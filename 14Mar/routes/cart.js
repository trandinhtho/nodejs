const express = require('express');
const router = express.Router();
const Cart = require('../models/Cart');

router.get('/:userId', async (req, res) => {
    try {
        const userId = req.params.userId;
        const cart = await Cart.findOne({ userId }).populate('products.productId');
        res.json(cart);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Internal server error' });
    }
});

// router.post('/:userId/add', async (req, res) => {
//     try {
//         console.log(req.body);
//         const { userId } = req.params;
//         const { productId, quantity, price } = req.body;

//         // Tìm giỏ hàng của userId
//         let cart = await Cart.findOne({ userId });

//         // Nếu không tìm thấy giỏ hàng, tạo mới
//         if (!cart) {
//             cart = new Cart({ userId, products: [] });
//         }

//         // Kiểm tra xem sản phẩm đã tồn tại trong giỏ hàng chưa
//         const productIndex = cart.products.findIndex(item => String(item.productId) === productId);

//         // Nếu sản phẩm chưa tồn tại, thêm mới vào giỏ hàng
//         if (productIndex === -1) {
//             cart.products.push({ productId, quantity, price }); // Thêm cả giá vào sản phẩm mới
//         } else { // Nếu sản phẩm đã tồn tại, tăng số lượng lên
//             cart.products[productIndex].quantity += quantity;
//         }

//         // Tính lại tổng tiền của giỏ hàng
//         cart.total = cart.products.reduce((total, item) => {
//             return total + (item.quantity * item.price); // Sử dụng giá của sản phẩm để tính tổng tiền
//         }, 0);

//         // Lưu giỏ hàng vào MongoDB
//         await cart.save();

//         // Trả về thông tin giỏ hàng đã được cập nhật
//         res.json(cart);
//     } catch (error) {
//         console.error(error);
//         res.status(500).json({ message: 'Internal server error' });
//     }
// });





router.delete('/:userId/remove/:productId', async (req, res) => {
    try {
        const { userId, productId } = req.params;

        let cart = await Cart.findOne({ userId });
        if (!cart) {
            return res.status(404).json({ message: 'Cart not found' });
        }

        cart.products = cart.products.filter(item => String(item.productId) !== productId);
        cart.total = cart.products.reduce((total, item) => {
            return total + (item.quantity * item.productId.price);
        }, 0);

        await cart.save();

        res.json(cart);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Internal server error' });
    }
});

module.exports = router;
