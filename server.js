var express = require('express');
var app = express();
var server = require('http').Server(app);
var WebSocketServer = require('websocket').server;
var io = require('socket.io').listen(server);

/*app.use('/css',express.static(__dirname + 'public/css'));
app.use('/js',express.static(__dirname + 'public/js'));
app.use('/assets',express.static(__dirname + 'public/assets'));*/
app.use(express.static("public/dist/"));

app.get('/', function (req, res) {
    res.sendFile(__dirname + '/index.html');
});

io.sockets.on('connection', function (socket) {
    socket.on("new_user", function (hero) {
        console.log('New_connection');
        socket.broadcast.emit("New_connection", hero);
        //socket.emit("New_connection", oldPlayer);
    });

    socket.on("requestlogin", function (player) {
        // 
    });

    socket.on("MoveWest", function (hero) {
        console.log("Moves west on " + "x: " + hero.x + "y: " + hero.y);
        //socket.emit("SelfMovingWest", hero);
        socket.broadcast.emit("MovingWest", hero);
    });

    socket.on("MoveEast", function (hero) {
        console.log("Moves east on " + "x: " + hero.x + "y: " + hero.y);
        socket.broadcast.emit("MovingEast", hero);
    });

    socket.on("MoveSouth", function (hero) {
        console.log("Moves south on " + "x: " + hero.x + "y: " + hero.y);
        socket.broadcast.emit("MovingSouth", hero);
    });

    socket.on("MoveNorth", function (hero) {
        console.log("Moves north on " + "x: " + hero.x + "y: " + hero.y);
        socket.broadcast.emit("MovingNorth", hero);
    });

    socket.on("Stop", function (hero) {
        console.log("stopped on " + "x: " + hero.x + "y: " + hero.y);
        socket.broadcast.emit("Stopped", hero);
    });
});


server.listen(process.env.PORT || 5000, function () {
    console.log('Listening on ' + server.address().port);
});