const mongoose = require('mongoose');

const cartSchema = new mongoose.Schema({
    userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true }, // Tham chiếu đến người dùng
    products: [{ 
        productId: { type: mongoose.Schema.Types.ObjectId, ref: 'Product', required: true }, // Tham chiếu đến sản phẩm
        quantity: { type: Number, default: 1 } ,// Số lượng sản phẩm trong giỏ hàng, mặc định là 1
        price: { type: Number, default: 0 }
    }],
    total: { type: Number, default: 0 } // Tổng số tiền của giỏ hàng, mặc định là 0
});

const Cart = mongoose.model('Cart', cartSchema);

module.exports = Cart;
