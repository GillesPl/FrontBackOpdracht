var game = game || {};

game = new Phaser.Game(1024, 768, Phaser.AUTO, document.getElementById('game'));

game.state.add('Boot', Boot);
game.state.add("Preload", Preload);
game.state.add("Game",Game);

game.state.start('Boot');
console.log(game.state);