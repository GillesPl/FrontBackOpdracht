var express = require('express');
var app = express();
var server = require('http').Server(app);
var io = require('socket.io').listen(server);

/*app.use('/css',express.static(__dirname + 'public/css'));
app.use('/js',express.static(__dirname + 'public/js'));
app.use('/assets',express.static(__dirname + 'public/assets'));*/
app.use(express.static("public"));

app.get('/',function(req,res){
    res.sendFile(__dirname+'/index.html'); 
});

server.listen(4000,function(){ // Listens to port 8081
    console.log('Listening on '+server.address().port);
});
