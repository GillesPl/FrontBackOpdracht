"use strict";
var User = require("./../Models/User.model"),
    bcrypt = require("bcrypt"),
    AuthenticateController = require("./AuthenticateController");

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
exports.getUserFromId = function (id, callback) {
    User.findById(id, '_id username mail items created_date last_played position health token tileLevel', function (err, user) {
        if (err) return callback(err);
        callback(user);
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

exports.createUserSocket = function (user, callback,logincallback) {
    let message = "";
    if (user.user.username == undefined || user.user.username == null || user.user.username == "") {
        message += "Username is undefined \n";
    }

    if (user.user.password == undefined || user.user.password == null || user.user.password == "") {
        message += "Password is undefined \n";
    }

    if (user.user.mail == undefined || user.user.mail == null || user.user.mail == "") {
        message += "Mail is undefined \n";
    }

    if (message != "") return callback({
        success: false,
        message: message
    })
    var newuser = new User();
    newuser.username = user.user.username;
    newuser.password = user.user.password;
    newuser.mail = user.user.mail

    bcrypt.genSalt(10, function (err, salt) {
        if (err) return callback({
            success: false,
            message: err.message,
        });
        bcrypt.hash(newuser.password, salt, function (err, hash) {
            if (err) return callback({
                success: false,
                message: err.message,
            });
            //i'm so sorry for this
            let usercopy = JSON.parse(JSON.stringify(newuser));
            newuser.password = hash;
            newuser.save(function (err, user) {
                if (err) return callback(err.message);
                callback({
                    success: true,
                    message: 'User has been created',
                    user: user
                });
                AuthenticateController.authenticate({user: usercopy},function(res) {
                    console.log(res);
                    logincallback(res);
                });
                return;
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