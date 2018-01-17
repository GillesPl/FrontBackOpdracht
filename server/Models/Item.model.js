'use strict';
var mongoose = require('mongoose'),
    uniqueValidator = require('mongoose-unique-validator'),
    Schema = mongoose.Schema;

var ItemSchema = new Schema({
    name: {
        type: String,
        required: 'Enter the name of the item'
    },
    count: {
        type: Number
    },
    inventoryLocation: {
        type: Number
    },
    actionLocation: {
        type: Number
    },
    isEquipped: {
        type: Boolean
    }
});

ItemSchema.plugin(uniqueValidator);

module.exports = mongoose.model('Item', ItemSchema);