var express = require('express'),
    app = express(),
    mongo = require("mongodb"),
    MongoClient = mongo.MongoClient,
    mongoose = require('mongoose'),
    server = require('http').Server(app),
    WebSocketServer = require('websocket').server,
    io = require('socket.io').listen(server),
    bodyParser = require("body-parser"),
    morgan = require("morgan"),
    config = require("./server/config");

//models
var Item = require("./server/Models/Item.model");
var User = require("./server/Models/User.model");

var Manager = require('./server/Manager');

app.set("megaSecret", config.secret);

app.use(bodyParser.urlencoded({
    extended: false
}));
app.use(bodyParser.json());

app.use(morgan("dev"));

//controllers
var UserController = require("./server/Controllers/UserController");
var AuthenticateController = require("./server/Controllers/AuthenticateController");

/*app.use('/css',express.static(__dirname + 'public/css'));
app.use('/js',express.static(__dirname + 'public/js'));
app.use('/assets',express.static(__dirname + 'public/assets'));*/

//var url = "mongodb://localhost:27017/georgescape";
var url = "mongodb://admin:admin@ds157185.mlab.com:57185/backend-mmorpg-api";

mongoose.connect(url, {
    useMongoClient: true
});
// Get Mongoose to use the global promise library
mongoose.Promise = global.Promise;
//Get the default connection
var db = mongoose.connection;

//Bind connection to error event (to get notification of connection errors)
db.on('error', console.error.bind(console, 'MongoDB connection error:'));


var routes = express.Router();
app.use("/api", routes);
var userRoutes = require("./server/Routes/UserRoutes")(routes);


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

    socket.on("registerUser", function (user) {
        manager.createUser(user,socket);
    });

    socket.on("requestLogin", function (user) {
        manager.loginUser(user,socket);
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

    socket.on("updateUnit", function (npcJsonString) {
        manager.updateNpc(npcJsonString, socket);
    });
});


server.listen(process.env.PORT || 5000, function () {
    console.log('Listening on ' + server.address().port);
});