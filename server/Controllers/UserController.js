"use strict";
var User = require("./../Models/User.model"),
    bcrypt = require("bcrypt");

exports.getUsers = function (req, res) {
    User.find({}, function (err, users) {
        if (err) return res.status(400).send(err);
        res.json(users);
    });
};

exports.getUser = function (req, res) {
    User.findById(req.params.userId, '_id username mail items created_date last_played position health token tileLevel', function (err, user) {
        if (err) return res.status(400).send(err);
        res.json(user);
    });
};

// Used by server code (not API)
exports.updateUserFromToken = function (req, res) {
    delete req.password; // Just to be safe remove the password field 
    User.findOneAndUpdate({
        token: req.token
    }, req, {
        new: true
    }, function (err, user) {
        if (err) return res(err);
        if (user._id != req._id) return res("id's don't match");
        user.save(function (err, user) {
            if (err) return res(err);
            res(user);
        });
    });
};

exports.updateUser = function (req, res) {
    User.findOneAndUpdate({
        _id: req.params.userId
    }, req.body, {
        new: true
    }, function (err, user) {
        if (err) return res.status(400).send(err);
        if (req.body.password === undefined) return res.json(user);
        bcrypt.genSalt(10, function (err, salt) {
            if (err) return res.status(400).send(err);
            bcrypt.hash(user.password, salt, function (err, hash) {
                if (err) return res.status(400).send(err);
                user.password = hash;
                user.save(function (err, user) {
                    if (err) return res.status(400).send(err);
                    res.json(user);
                });
            });
        });
    });
};

exports.getUserSocket = function (id) {
    User.findById(req.params.userId, '_id username mail items created_date last_played position health', function (err, user) {
        if (err) console.log(err.message);
        return user;
    });
}

exports.createUserSocket = function (user) {
    var newuser = new User();
    newuser.username = user.user.username;
    newuser.password = user.user.password;
    newuser.mail = user.user.mail
    console.log(newuser);
    bcrypt.genSalt(10, function (err, salt) {
        if (err) console.log(err.message);
        bcrypt.hash(newuser.password, salt, function (err, hash) {
            if (err) console.log(err.message);
            newuser.password = hash;
            newuser.save(function (err, user) {
                if (err) console.log(err.message);
                return user;
            });
        });
    });
}

exports.createUser = function (req, res) {
    var newuser = new User(req.body);
    bcrypt.genSalt(10, function (err, salt) {
        if (err) return res.status(400).send(err);
        bcrypt.hash(newuser.password, salt, function (err, hash) {
            if (err) return res.status(400).send(err);
            newuser.password = hash;
            newuser.save(function (err, user) {
                if (err) return res.status(400).send(err);
                res.json(user);
            });
        });
    });
};


exports.deleteUser = function (req, res) {
    User.remove({
        _id: req.params.userId
    }, function (err, user) {
        if (err) return res.status(400).send(err);
        res.json({
            message: 'User successfully deleted'
        });
    });
};