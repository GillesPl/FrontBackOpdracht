
var game = new Phaser.Game("100", "100", Phaser.AUTO, document.getElementById('game'), { preload: preload, create: create });

function preload() {

    game.load.tilemap('map', '/assets/map/outside.json', null, Phaser.Tilemap.TILED_JSON);
    game.load.spritesheet('tileset', '/assets/map/buch-outdoor.png', 16, 16);
    game.load.image('sprite', '/assets/sprites/george.png'); // this will be the sprite of the players

}

var map;
var layer;

var cursors;
var sprite;

function create() {

    game.physics.startSystem(Phaser.Physics.ARCADE);

    map = game.add.tilemap('map');

    map.addTilesetImage('outdoor', 'tileset'); // tilesheet is the key of the tileset in map's JSON file

    layer = map.createLayer('Ground');

}