const mongoose = require('mongoose');

const productSchema = new mongoose.Schema({
    // Định nghĩa các trường dữ liệu của sản phẩm ở đây
    // name: { type: String, required: true },
    // price: { type: Number, required: true },
});

const Product = mongoose.model('products', productSchema);

module.exports = Product;
