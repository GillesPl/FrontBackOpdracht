"use strict";

var game = new Phaser.Game("100", "100", Phaser.AUTO, document.getElementById('game'),{ preload: preload, create: create, update: update, render: render });


function preload() {
    game.load.tilemap('map', '../assets/map/outside.json', null, Phaser.Tilemap.TILED_JSON);
    game.load.spritesheet('tileset', '../assets/map/buch-outdoor.png',32,32);
    game.load.image('sprite','../assets/sprites/george.png'); // this will be the sprite of the players
}

var map;
var layer;

var cursors;
var sprite;

function create() {
    game.physics.startSystem(Phaser.Physics.Arcade);

    map = game.add.tilemap("map");
    map.addTilesetImage("tilesheet")
}

function update() {

}

function render() {

}

Game.init = function() {
    game.stage.disableVisibilityChange = true;
};

Game.preload = function() {
    game.load.tilemap('map', '../assets/map/outside.json', null, Phaser.Tilemap.TILED_JSON);
    game.load.spritesheet('tileset', '../assets/map/buch-outdoor.png',32,32);
    game.load.image('sprite','../assets/sprites/george.png'); // this will be the sprite of the players
};

Game.create = function(){
    console.log("create");
    var map = game.add.tilemap('map');
    map.addTilesetImage('tilesheet', 'tileset'); // tilesheet is the key of the tileset in map's JSON file
    var layer;
    for(var i = 0; i < map.layers.length; i++) {
        layer = map.createLayer(i);
    }
    layer.inputEnabled = true; // Allows clicking on the map
};