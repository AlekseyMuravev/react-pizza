const { Schema, model } = require('mongoose');

const schema = new Schema({
    _id: { type: String, required: true },
    name: { type: String, required: true },
    imageUrl: { type: String, required: true },
    rating: { type: Number, required: true },
    category: { type: Number, required: true },
    price: { type: Number, required: true },
    sizes: { type: Array, required: true },
    types: { type: Array, required: true },
});

module.exports = model('Pizzas', schema)