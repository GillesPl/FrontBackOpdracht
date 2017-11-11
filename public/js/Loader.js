//
// Asset loader
//

var Loader = {
    images: {}
};

Loader.loadImage = function (key, src) {
    var img = new Image();

    var d = new Promise(function (resolve, reject) {
        img.onload = function () {
            this.images[key] = img;
            resolve(img);
        }.bind(this);

        img.onerror = function () {
            reject('Could not load image: ' + src);
        };
    }.bind(this));

    img.src = src;
    return d;
};

Loader.getImage = function (key) {
    return (key in this.images) ? this.images[key] : null;
};

//
// Game object
//

var Game = {};

Game.run = function (context) {
    this.ctx = context;
    this.ctx.width = window.innerWidth;
    this.ctx.height = window.innerHeight;

    this._previousElapsed = 0;

    var p = this.load();
    Promise.all(p).then(function (loaded) {
        this.init();
        window.requestAnimationFrame(this.tick);
    }.bind(this));
};

Game.tick = function (elapsed) {
    window.requestAnimationFrame(this.tick);

    // clear previous frame
    this.ctx.clearRect(0, 0, 512, 512);

    // compute delta time in seconds -- also cap it
    var delta = (elapsed - this._previousElapsed) / 1000.0;
    delta = Math.min(delta, 0.25); // maximum delta of 250 ms
    this._previousElapsed = elapsed;

    this.update(delta);
    this.render();
}.bind(Game);

// override these methods to create the demo
Game.init = function () {
    console.error('INIT NOT IMPLEMENTED');
};
Game.update = function (delta) {
    console.error('INIT NOT IMPLEMENTED');
};
Game.render = function () {
    console.error('INIT NOT IMPLEMENTED');
};
Game.fullscreenState = false;
Game.fullscreen = function () {
    var canvas = document.querySelector("canvas");
    if (this.fullscreenState) {
        if (document.exitFullscreen) {
            document.exitFullscreen();
        } else if (document.mozCancelFullScreen) {
            document.mozCancelFullScreen();
        } else if (document.webkitCancelFullScreen) {
            document.webkitCancelFullScreen();
        } else {
            console.log('exitFullScreen not supported');
        }
    } else {
        if (canvas.requestFullscreen) {
            canvas.requestFullscreen();
        } else if (canvas.webkitRequestFullscreen) {
            canvas.webkitRequestFullscreen();
        } else if (canvas.mozRequestFullScreen) {
            canvas.mozRequestFullScreen();
        } else {
            console.log('goFullScreen not supported');
        }
    }
};

//
// Socket.io
//
var Socket = io();



//
// start up function
//
window.onload = function () {
    var context = document.getElementById('game').getContext('2d');
    Socket;
    Game.run(context);
};