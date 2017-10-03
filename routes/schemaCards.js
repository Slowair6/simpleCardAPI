var mongoose = require('mongoose');

var Schema = new mongoose.Schema({
    card_number: String,
    csc: String,
    card_expire: String,
    card_holder: String,
    balance: Number
}, {
    versionKey: false // You should be aware of the outcome after set to false
});

module.exports = mongoose.model('cards', Schema);