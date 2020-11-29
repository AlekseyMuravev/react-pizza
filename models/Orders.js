const { Schema, model } = require('mongoose');

const schema = new Schema({
    client: { type: String, required: true },
    order: { type: Array }
})

module.exports = model('Order', schema)