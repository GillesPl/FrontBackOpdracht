var express = require('express');
var app = express();
var server = require('http').Server(app);
var WebSocketServer = require('websocket').server;
var io = require('socket.io').listen(server);
var Manager = require('./server/Manager');

/*app.use('/css',express.static(__dirname + 'public/css'));
app.use('/js',express.static(__dirname + 'public/js'));
app.use('/assets',express.static(__dirname + 'public/assets'));*/
app.use(express.static("public/dist/"));

const manager = new Manager.Manager();

app.get('/', function (req, res) {
    res.sendFile(__dirname + '/index.html');
});
app.get('/reset', function (req, res) {
    manager.reset();
    console.log('--RESET--');
    res.send("resetted");
});

io.sockets.on('connection', function (socket) {
    console.log('New_connection');

    socket.on("new_user", function (hero) {
        manager.newPlayer(hero, socket);
    });

    socket.on('disconnect', function () {
        manager.disconnectPlayer(socket);
    });

    socket.on("requestlogin", function (player) {
        // 
    });

    socket.on("updatePlayer", function (hero) {
        manager.updatePlayer(hero, socket);
    });

    socket.on("updateObject", function (obj) {
        manager.updateObject(obj, socket);
    });

    socket.on("newProjectile", function (projectile) {
        manager.updateProjectile(projectile, socket);
    });
});


server.listen(process.env.PORT || 5000, function () {
    console.log('Listening on ' + server.address().port);
});