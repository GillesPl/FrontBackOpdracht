//var game = new Phaser.Game("100", "100", Phaser.AUTO, document.getElementById('game'), { preload: preload, create: create });

var Game = {};

Game.preload = function () {

    game.load.tilemap('map', '/assets/map/outside.json', null, Phaser.Tilemap.TILED_JSON);
    game.load.spritesheet('tileset', '/assets/map/buch-outdoor.png', 16, 16);
    game.load.image('character', '/assets/sprites/george-front.png'); // this will be the sprite of the players

}

Game.create = function () {
    var map;
    var layer;
    
    var cursors;
    var sprite;

    //find proper physics engine
    //game.physics.startSystem(Phaser.Physics.ARCADE);

    Game.playerMap = {};

    //select map from preload
    map = game.add.tilemap('map');

    //search for titleset name in tileset to get the propper tilesetimage
    map.addTilesetImage('outdoor', 'tileset'); // tilesheet is the key of the tileset in map's JSON file

    //finaly create the layers
    layer = map.createLayer('Ground');
    layer = map.createLayer("Fringe");
    layer.inputEnabled = true;

    //display character
    /*sprite = game.add.sprite(200,200,"character");
    sprite.anchor.setTo(0.5, 0.5);*/
    Client.askNewPlayer();

    layer.events.onInputUp.add(Game.getCoordinates, this);

}


Game.addNewPlayer = function(id,x,y){
    Game.playerMap[id] = game.add.sprite(x,y,'character');
    console.log("created new player");
};

Game.removePlayer = function(id){
    Game.playerMap[id].destroy();
    delete Game.playerMap[id];
};

Game.getCoordinates = function(layer,pointer){
    Client.sendClick(pointer.worldX,pointer.worldY);
};


Game.movePlayer = function(id,x,y){
    var player = Game.playerMap[id];
    var distance = Phaser.Math.distance(player.x,player.y,x,y);
    var duration = distance*10;
    var tween = game.add.tween(player);
    tween.to({x:x,y:y}, duration);
    tween.start();
};