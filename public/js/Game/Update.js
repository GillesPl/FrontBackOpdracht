Game.update = function (delta) {
    if (Keyboard.isDown(Keyboard.F)) {
        if (!this.fullscreenPressed) {
            //this.fullscreen();
            this.fullscreenPressed = true;
        }
    } else {
        this.fullscreenPressed = false;
    }
    // handle hero movement with arrow keys
    var dirx = 0;
    var diry = 0;
    if (Keyboard.isDown(Keyboard.LEFT) || Keyboard.isDown(Keyboard.A)) {
        dirx = -1;
    } else if (Keyboard.isDown(Keyboard.RIGHT) || Keyboard.isDown(Keyboard.D)) {
        dirx = 1;
    } else if (Keyboard.isDown(Keyboard.UP) || Keyboard.isDown(Keyboard.W)) {
        diry = -1;
    } else if (Keyboard.isDown(Keyboard.DOWN) || Keyboard.isDown(Keyboard.S)) {
        diry = 1;
    }
    this.hero.move(delta, dirx, diry);
    this.camera.update();
};