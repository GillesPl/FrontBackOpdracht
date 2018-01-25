const assert = require("assert");
const Item = require("./Models/Item.model");
const UserController = require("./Controllers/UserController");
const AuthenticateController = require("./Controllers/AuthenticateController");
const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const expect = require('expect.js');

describe("login user", () => {
    var result;
    beforeEach((done) => {
        mongoose.connect("mongodb://admin:admin@ds157185.mlab.com:57185/backend-mmorpg-api");
        const db = mongoose.connection;
        db.on('error', console.error.bind(console, 'connection error'));
        db.once('open', function () {
            console.log('We are connected to database!');
            var user = {
                user: {
                    mail: "kappa@test.be",
                    password: "kappa"
                }
            };

            AuthenticateController.authenticate(user, (res) => {
                result = res;
                done();
            });
        });
    })
    it("should fetch me the user", () => {
        expect(result.success).to.be(true)
    })

})
