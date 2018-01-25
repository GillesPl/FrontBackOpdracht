'use strict';

var mongoose = require("mongoose"),
    User = mongoose.model('User'),
    jwt = require("jsonwebtoken"),
    bcrypt = require("bcrypt"),
    config = require("./../config");

exports.authenticate = function (req, callback) {
    User.findOne({
        mail: req.user.mail
    }, function (err, user) {
        if (!user) {            
            return callback({
                success: false,
                message: 'Authentication failed. mail not found.'
            });
        } else if (user) {
            // check if password matches            
            bcrypt.compare(req.user.password, user.password, function (err, correct) {
                if (err) {
                    return callback({
                        success: false,
                        message: 'Authentication failed. Wrong password.'
                    });
                }                
                if (correct) {
                    callback({ // This is not send yet
                        success: true,
                        user: user
                    })
                }
                else {
                    return callback({
                        success: false,
                        message: 'Authentication failed. Wrong password.'
                    }); 
                }
            });
        }
    });
};

exports.login = function(user, callback) {
    // if user is found and password is right
    // create a token with only our given payload
    // we don't want to pass in the entire user since that has the password
    const payload = {
        username: user.username,
        mail: user.mail
    };
    var token = jwt.sign(payload, config.secret, {
        expiresIn: 60 * 60 * 24 // expires in 24 hours also '24h' works
    });
    user.token = token;
    user.save(function (err, user) {
        if (err) return callback(err);
        // return the information including token as JSON
        return callback({
            success: true,
            message: 'Enjoy your token!',
            user: user
        });
    });
}

exports.verify = function (token) { // check header or url parameters or post parameters for token
    //var token = req.body.token || req.query.token || req.headers['x-access-token'];    
    // decode token
    if (token) {
        // verifies secret and checks exp
        jwt.verify(token, req.app.get('megaSecret'), function (err, decoded) {
            if (err) {
                return res.json({
                    success: false,
                    message: 'Failed to authenticate token.'
                });
            } else {
                // if everything is good, save to request for use in other routes                
                req.decoded = decoded;
                next();
            }
        });
    } else {
        return { // if there is no token return an error
            success: false,
            message: 'No token provided.'
        };
    }
};

exports.setup = function (req, res) {
    var ret = {};
    var newuser = new User({
        username: "admin",
        password: "password",
        mail: "admin@admin.com"
    });
    bcrypt.genSalt(10, function (err, salt) {
        if (err) return res.status(400).send(err);
        bcrypt.hash(newuser.password, salt, function (err, hash) {
            if (err) return res.status(400).send(err);
            newuser.password = hash;
            newuser.save(function (err, user) {
                if (err) return res.status(400).send(err);
                ret.user = user;
                res.json(ret);
            });
        });
    });
};