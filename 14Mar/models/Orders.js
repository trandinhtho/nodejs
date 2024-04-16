const mongoose = require('mongoose');

const orderSchema = new mongoose.Schema({
    userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User'},
    customer: String,
    phone: String,
    address: String,
    products: [{ 
        productId: { type: mongoose.Schema.Types.ObjectId, ref: 'Product', required: true }, // Tham chiếu đến mô hình Product
        quantity: { type: Number, required: true },
        price: { type: Number, required: true }
    }],
    total: { type: Number, required: true },
    status: { type: String, default: 'Pending' }, // Trạng thái đơn hàng, mặc định là Pending
    createdAt: { type: Date, default: Date.now } // Ngày tạo đơn hàng, mặc định là ngày hiện tại
});

const Order = mongoose.model('Orders', orderSchema);

module.exports = Order;
