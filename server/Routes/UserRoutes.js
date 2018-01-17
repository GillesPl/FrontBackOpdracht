"use strict";

module.exports = function(routes) {
    var UserController = require("./../Controllers/UserController");
    
    routes.post("/users", UserController.createUser);
    routes.get("/users", UserController.getUsers);

    routes.put("/users/:userId",UserController.updateUser);
    routes.delete("/users/:userId", UserController.deleteUser);    
    routes.get("/users/:userId", UserController.getUser);
}