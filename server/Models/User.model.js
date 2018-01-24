'use strict';
var mongoose = require('mongoose'),
    uniqueValidator = require('mongoose-unique-validator'),
    Item = mongoose.model('Item').schema,
    Schema = mongoose.Schema;

var userSchema = new Schema({
    username: {
        type: String,
        lowercase: true,
        required: 'Enter the username of the user',
        unique: true
    },
    password: {
        type: String,
        required: 'Enter the password of the user'
    },
    mail: {
        type: String,
        lowercase: true,
        required: 'Enter the mail of the user',
        unique: true
    },
    items: [Item],
    created_date: {
        type: Date,
        default: Date.now
    },
    last_played: {
        type: Date,
        default: Date.now
    },
    position: {
        type: Object,
        default: {
            x: 3200,
            y: 3200
        }
    },
    health: {
        type: Number,
        default: 100
    },
    tileLevel: {
        type: Number,
        default: 0
    },
    token: {
        type: String
    },
    level: {
        type: Number,
        default: 1
    },
    xp: {
        type: Number,
        default: 0
    },
    stats: {
        type: String
    },
    pvp: {
        type: Boolean,
        default: false
    },
    questsCompleted: {
        type: String
    }
});

userSchema.plugin(uniqueValidator);

module.exports = mongoose.model('User', userSchema);