var express = require('express');
var app = express();
var server = require('http').Server(app);
var WebSocketServer = require('websocket').server;
var io = require('socket.io').listen(server);

/*app.use('/css',express.static(__dirname + 'public/css'));
app.use('/js',express.static(__dirname + 'public/js'));
app.use('/assets',express.static(__dirname + 'public/assets'));*/
app.use(express.static("public"));

app.get('/', function (req, res) {
    res.sendFile(__dirname + '/index.html');
});


io.on('connection', function (socket) {

    socket.on("requestlogin",function(player) {
        //
    })

    socket.on("MoveWest", function (hero) {
        console.log("Moves west on " + "x: " + hero.x + "y: " + hero.y);
    });

    socket.on("MoveEast", function (hero) {
        console.log("Moves east on " + "x: " + hero.x + "y: " + hero.y);
    });

    socket.on("MoveSouth", function (hero) {
        console.log("Moves south on " + "x: " + hero.x + "y: " + hero.y);
    });

    socket.on("MoveNorth", function (hero) {
        console.log("Moves north on " + "x: " + hero.x + "y: " + hero.y);
    });

    socket.on("Stop", function (hero) {
        console.log("stopped on " + "x: " + hero.x + "y: " + hero.y);
    });
});

function getAllPlayers() {
    var players = [];
    Object.keys(io.sockets.connected).forEach(function (socketID) {
        var player = io.sockets.connected[socketID].player;
        if (player) players.push(player);
    });
    return players;
}



server.listen(process.env.PORT || 5000, function () { // Listens to port 8081
    console.log('Listening on ' + server.address().port);
});

