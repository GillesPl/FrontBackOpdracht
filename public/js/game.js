
var Game = Game || {};

//title screen
Game = function () { };

Game.prototype = {
    create: function () {
        this.map = this.game.add.tilemap('map');

        //this.game.world.setBounds(0, 0, 100, this.game.height);

        //the first parameter is the tileset name as specified in Tiled, the second is the key to the asset
        this.map.addTilesetImage('Roguelike', 'tileset'); // tilesheet is the key of the tileset in map's JSON file

        //create layer
        this.backgroundlayer = this.map.createLayer('Ground terrain');
        this.blockedLayer = this.map.createLayer('Ground overlay');

        //collision on blockedLayer
        //this.map.setCollisionBetween(1, 100000, true, 'blockedLayer');

        //display player
        this.player = game.add.sprite(20, 20, 'character');
        this.player.anchor.setTo(0.5, 0.5);

        //resizes the game world to match the layer dimensions
        this.backgroundlayer.resizeWorld();

        this.game.physics.arcade.enable(this.player);

        //the camera will follow the player in the world
        this.game.camera.follow(this.player);

        //move player with cursor keys
        this.cursors = this.game.input.keyboard.createCursorKeys();
    },

    update: function() {
        //player movement
        this.player.body.velocity.y = 0;
        this.player.body.velocity.x = 0;
     
        if(this.cursors.up.isDown) {
          this.player.body.velocity.y -= 500;
        }
        else if(this.cursors.down.isDown) {
          this.player.body.velocity.y += 500;
        }
        if(this.cursors.left.isDown) {
          this.player.body.velocity.x -= 500;
        }
        else if(this.cursors.right.isDown) {
          this.player.body.velocity.x += 500;
        }
      },
    
}


/*
var Game = {};

Game.preload = function () {

    game.load.tilemap('map', '/assets/map/map.json', null, Phaser.Tilemap.TILED_JSON);
    game.load.spritesheet('tileset', '/assets/map/spritesheet.png', 16, 16);
    game.load.image('character', '/assets/sprites/george-front.png'); // this will be the sprite of the players

}

Game.create = function () {
    //vars
    Game.playerMap = {};
    Game.Cursors;
    Game.player;

    //find proper physics engine
    game.physics.startSystem(Phaser.Physics.ARCADE);
    
    //game.scale.scaleMode = Phaser.ScaleManager.SHOW_ALL;

    //select map from preload
    map = game.add.tilemap('map', 16, 16, 1000, 1000);

    //search for titleset name in tileset to get the propper tilesetimage
    map.addTilesetImage('Roguelike', 'tileset'); // tilesheet is the key of the tileset in map's JSON file

    //finaly create the layers
    layer = map.createLayer('Ground terrain');
    layer = map.createLayer("Ground overlay");
    layer.inputEnabled = true;

    //display character
    sprite = game.add.sprite(200,200,"character");
    sprite.anchor.setTo(0.5, 0.5);

    //Client.askNewPlayer();

    Game.player = game.add.sprite(20, 20, 'character');
    Game.player.anchor.setTo(0.5, 0.5);    


    game.camera.follow(Game.player);

    Game.cursors = game.input.keyboard.createCursorKeys();

    //layer.events.onInputUp.add(Game.MovePlayer, this);


}

Game.MovePlayer = function (layer, pointer) {
    var player = Game.player;
    var distance = Phaser.Math.distance(player.x, player.y, pointer.worldX, pointer.worldY);
    var duration = distance * 10;
    var tween = game.add.tween(player);
    tween.to({ x: pointer.worldX, y: pointer.worldY }, duration);
    tween.start();
}


Game.update = function () {


    if (Game.cursors.up.isDown) {
        Game.player.body.moveUp(300)
    }
    else if (Game.cursors.down.isDown) {
        Game.player.body.moveDown(300);
    }

    if (Game.cursors.left.isDown) {
        Game.player.body.velocity.x = -300;
    }
    else if (Game.cursors.right.isDown) {
        Game.player.body.moveRight(300);
    }

}*/