var Preload = Preload || {};

Preload = function(){};


Preload.prototype = {
    preload: function() {
      //show loading screen
      /*this.preloadBar = this.add.sprite(this.game.world.centerX, this.game.world.centerY + 128, 'preloadbar');
      this.preloadBar.anchor.setTo(0.5);
   
      this.load.setPreloadSprite(this.preloadBar);*/
   
      //load game assets
      this.load.tilemap('map', '/assets/map/map.json', null, Phaser.Tilemap.TILED_JSON);
      this.load.spritesheet('tileset', '/assets/map/spritesheet.png', 16, 16);
      this.load.image('character', '/assets/sprites/george-front.png'); // this will be the sprite of the players
      
    },
    create: function() {
      this.state.start('Game');
    }
  };