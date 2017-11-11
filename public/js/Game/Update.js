Game.update = function (delta) {
    // handle hero movement with arrow keys
    var dirx = 0;
    var diry = 0;
    if (this.Keyboard.isDown(this.Keyboard.LEFT) || this.Keyboard.isDown(this.Keyboard.A)) {
        if(this.hero.action != this.hero.STATE.RUNNINGWEST) {
            this.hero.action = this.hero.STATE.RUNNINGWEST;
            Socket.emit("MoveWest",this.hero);
        }
        dirx = -1;
    } else if (this.Keyboard.isDown(this.Keyboard.RIGHT) || this.Keyboard.isDown(this.Keyboard.D)) {
        if(this.hero.action != this.hero.STATE.RUNNINGEAST) {
            this.hero.action = this.hero.STATE.RUNNINGEAST;
            Socket.emit("MoveEast",this.hero);
        }
        dirx = 1;
    } else if (this.Keyboard.isDown(this.Keyboard.UP) || this.Keyboard.isDown(this.Keyboard.W)) {
        if(this.hero.action != this.hero.STATE.RUNNINGNORTH) {
            this.hero.action = this.hero.STATE.RUNNINGNORTH;
            Socket.emit("MoveNorth",this.hero);
        }
        diry = -1;
    } else if (this.Keyboard.isDown(this.Keyboard.DOWN) || this.Keyboard.isDown(this.Keyboard.S)) {
        if(this.hero.action != this.hero.STATE.RUNNINGSOUTH) {
            this.hero.action = this.hero.STATE.RUNNINGSOUTH;
            Socket.emit("MoveSouth",this.hero);
        }
        diry = 1;
    }
    else {
        if(this.hero.action != this.hero.STATE.STOP) {
            this.hero.action = this.hero.STATE.STOP;
            Socket.emit("Stop",this.hero);
        }

    }
    this.hero.move(delta, dirx, diry);
    this.camera.update();
};