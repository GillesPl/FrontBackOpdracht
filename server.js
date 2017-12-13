var express = require('express');
var app = express();
var server = require('http').Server(app);
var WebSocketServer = require('websocket').server;
var io = require('socket.io').listen(server);

/*app.use('/css',express.static(__dirname + 'public/css'));
app.use('/js',express.static(__dirname + 'public/js'));
app.use('/assets',express.static(__dirname + 'public/assets'));*/
app.use(express.static("public/dist/"));

let players = [];
let socketsConnected = [];

app.get('/', function (req, res) {
    res.sendFile(__dirname + '/index.html');
});
app.get('/reset', function (req, res) {
    players = [];
    socketsConnected = [];
    console.log('--RESET--');
    res.send("resetted");
});

io.sockets.on('connection', function (socket) {
    console.log('New_connection');

    socket.on("new_user", function (hero) {
        thisPlayer = hero;
        socket.broadcast.emit("New_connection", hero);
        socket.emit("otherPlayers", players);
        socketsConnected.push(socket);
        players.push(hero);
    });

    socket.on('disconnect', function () {
        let i = socketsConnected.indexOf(socket);
        console.log('i: ' + i);
        console.log('socketsConnected length: ' + socketsConnected.length);
        console.log('players length: ' + players.length);
        if (i != -1) {
            //socket.broadcast.emit("user_leave", players[i]);
            socketsConnected.splice(i, 1);
            players.splice(i, 1);
            socket.broadcast.emit("otherPlayers", players);
            console.log('socketsConnected length: ' + socketsConnected.length);
            console.log('players length: ' + players.length);
        }
    });

    socket.on("requestlogin", function (player) {
        // 
    });

    socket.on("updatePlayer", function (hero) {
        socket.broadcast.emit("updatingPlayer", hero); // Notify all other players
        let found = false;
        let heroId = JSON.parse(hero).id;
        for (let i = players.length - 1; i >= 0; i--) {
            if (heroId === JSON.parse(players[i]).id) {
                players[i] = hero; // Update player in cache
                found = true;
            }
        }
        if (!found) {
            socketsConnected.push(socket);
            players.push(hero);
        }
    });
});


server.listen(process.env.PORT || 5000, function () {
    console.log('Listening on ' + server.address().port);
});