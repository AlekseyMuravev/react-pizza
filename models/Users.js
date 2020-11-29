const { Schema, model } = require('mongoose');

const schema = new Schema({
    // userId: { type: String, required: true, unique: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    userName: { type: String, required: true },
    phone: { type: Number, required: true },
    address: { type: String, require: true }
})

module.exports = model('Users', schema)