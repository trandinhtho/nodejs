const mongoose = require('mongoose');

const productSchema = new mongoose.Schema({
    name: { type: String, required: true },
    price: { type: Number, required: true },
    des: { type: String, required: true },
    imageUrl: { type: String, required: true }, // Thay đổi tên của trường hình ảnh từ 'img' thành 'imageUrl'
   // category: { type: mongoose.Schema.Types.ObjectId, ref: 'Category'}
});

const Product = mongoose.model('Product', productSchema);

module.exports = Product;
