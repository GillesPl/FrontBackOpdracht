var game = new Phaser.Game("100", "100", Phaser.AUTO, document.getElementById('game'));
game.state.add('Game',Game);
game.state.start('Game');
