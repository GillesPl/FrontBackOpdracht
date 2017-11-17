import Camera from "../Loader/Camera";
import Keyboard from "../Loader/Keyboard.class";
import Hero from "../GameObjects/Hero.class";
import OtherPlayer from "../GameObjects/OtherPlayer.class";
import Loader from "../Loader/Loader";
import GameState from "./GameState";
import {
    platform
} from "os";

export default class MainGameState extends GameState {
    constructor(ctx, map, socket) {
        super(ctx);
        this.map = map;
        this.hero;
        this.camera;
        this.socket = socket;
        this.fullscreenState = false;
        this.Loader = new Loader();
        this.otherPlayers = [];

        this.ctx = ctx;
        this.ctx.width = window.innerWidth;
        this.ctx.height = window.innerHeight;

        this._previousElapsed = 0;

        this.loadassets = this.load();
        Promise.all(this.loadassets).then(function (loaded) {
            this.init();
            let self = this;
            window.requestAnimationFrame(function (elapsed) {
                self.draw(elapsed);
            });
        }.bind(this));
    }


    draw(elapsed) {
        let self = this;
        window.requestAnimationFrame(function (elapsed) {
            self.draw(elapsed);
        });

        // clear previous frame
        this.ctx.clearRect(0, 0, 512, 512);

        // compute delta elapsed in seconds -- also cap it
        let delta = (elapsed - this._previousElapsed) / 1000.0;
        delta = Math.min(delta, 0.25); // maximum delta of 250 ms
        this._previousElapsed = elapsed;

        //var in update == delta, see commented code above
        this.update(delta);
        this.render();
    }


    // send map in this
    init() {
        this.Keyboard = new Keyboard();
        this.Keyboard.listenForEvents([this.Keyboard.LEFT, this.Keyboard.RIGHT, this.Keyboard.UP, this.Keyboard.DOWN, this.Keyboard.A, this.Keyboard.D, this.Keyboard.W, this.Keyboard.S]);

        this.tileAtlas = this.Loader.getImage('tiles');
        this.hero = new Hero(this.map, 50 * this.map.drawSize, 50 * this.map.drawSize, this.Loader);
        this.camera = new Camera(this.map, window.innerWidth, window.innerHeight);

        let self = this;
        this.map.loadMap('../../assets/map/map.json', this.camera, this.hero, function () {
            self.socket.emit("new_user", self.hero);
            self.loadSocket(self.socket);
        });
        this.events();
    }


    loadSocket(client) {
        let self = this;
        client.on("otherPlayers", function (others) {
            self.otherPlayers = [];
            others.forEach((player) => {
                if (player.id != self.hero.id) {
                    self.otherPlayers.push(new OtherPlayer(player, self.Loader, self.map));
                }
            });
        });
        client.on("New_connection", function (hero) {
            self.otherPlayers.push(new OtherPlayer(hero, self.Loader, self.map));
        });
        client.on("user_leave", function (hero) {
            console.log('player left');
            let toDeleteIndex = 0;
            for (let i = 0; i < self.otherPlayers.length; i++) {
                if (self.otherPlayers[i].id === hero.id)
                    toDeleteIndex = i;
            }
            self.otherPlayers.splice(i, 1);
            self.otherPlayers.push(new OtherPlayer(hero, self.Loader, self.map));
        });
        client.on("MovingWest", function (hero) {
            self.otherPlayers.forEach((player) => {
                if (player.id === hero.id) {
                    console.log('info from ' + player.id);
                    player.action = hero.action;
                    player.x = hero.x;
                    player.y = hero.y;
                    player.tileLevel = hero.tileLevel;
                }
            });
        });
        client.on("MovingEast", function (hero) {
            self.otherPlayers.forEach((player) => {
                if (player.id === hero.id) {
                    console.log('info from ' + player.id);
                    player.action = hero.action;
                    player.x = hero.x;
                    player.y = hero.y;
                    player.tileLevel = hero.tileLevel;
                }
            });
        });
        client.on("MovingSouth", function (hero) {
            self.otherPlayers.forEach((player) => {
                if (player.id === hero.id) {
                    console.log('info from ' + player.id);
                    player.action = hero.action;
                    player.x = hero.x;
                    player.y = hero.y;
                    player.tileLevel = hero.tileLevel;
                }
            });
        });
        client.on("MovingNorth", function (hero) {
            self.otherPlayers.forEach((player) => {
                if (player.id === hero.id) {
                    console.log('info from ' + player.id);
                    player.action = hero.action;
                    player.x = hero.x;
                    player.y = hero.y;
                    player.tileLevel = hero.tileLevel;
                }
            });
        });
        client.on("Stopped", function (hero) {
            self.otherPlayers.forEach((player) => {
                if (player.id === hero.id) {
                    console.log('info from ' + player.id);
                    player.action = hero.action;
                    player.x = hero.x;
                    player.y = hero.y;
                    player.tileLevel = hero.tileLevel;
                }
            });
        });
    }

    load() {
        return [this.Loader.loadImage('tiles', '../../assets/map/tileset.png'),
            this.Loader.loadImage('hero', '../../assets/sprites/george-front.png'),
            this.Loader.loadImage('otherPlayer', '../../assets/sprites/other-front.png')
        ];
    }

    update(delta) {
        let dirx = 0;
        let diry = 0;
        if (this.Keyboard.isDown(this.Keyboard.LEFT) || this.Keyboard.isDown(this.Keyboard.A)) {
            if (this.hero.action != this.hero.STATE.RUNNINGWEST) {
                this.hero.action = this.hero.STATE.RUNNINGWEST;
                this.socket.emit("MoveWest", this.hero);
            }
            dirx = -1;
        } else if (this.Keyboard.isDown(this.Keyboard.RIGHT) || this.Keyboard.isDown(this.Keyboard.D)) {
            if (this.hero.action != this.hero.STATE.RUNNINGEAST) {
                this.hero.action = this.hero.STATE.RUNNINGEAST;
                this.socket.emit("MoveEast", this.hero);
            }
            dirx = 1;
        } else if (this.Keyboard.isDown(this.Keyboard.UP) || this.Keyboard.isDown(this.Keyboard.W)) {
            if (this.hero.action != this.hero.STATE.RUNNINGNORTH) {
                this.hero.action = this.hero.STATE.RUNNINGNORTH;
                this.socket.emit("MoveNorth", this.hero);
            }
            diry = -1;
        } else if (this.Keyboard.isDown(this.Keyboard.DOWN) || this.Keyboard.isDown(this.Keyboard.S)) {
            if (this.hero.action != this.hero.STATE.RUNNINGSOUTH) {
                this.hero.action = this.hero.STATE.RUNNINGSOUTH;
                this.socket.emit("MoveSouth", this.hero);
            }
            diry = 1;
        } else {
            if (this.hero.action != this.hero.STATE.STOP) {
                this.hero.action = this.hero.STATE.STOP;
                this.socket.emit("Stop", this.hero);
            }

        }
        this.hero.move(delta, dirx, diry);
        this.otherPlayers.forEach((player) => {
            player.move(delta);
        });
        this.camera.update();
    }

    getLayersUnder(tileLevel) {
        switch (tileLevel) {
            case 1:
                return 12;
            case 2:
                return 14;
            default:
                return 11;
        }
    }

    render() {
        let canvas = document.querySelector("canvas");
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;
        canvas.style.width = window.innerWidth;
        canvas.style.height = window.innerHeight;

        this.ctx.width = window.innerWidth;
        this.ctx.height = window.innerHeight;
        this.camera.width = window.innerWidth;
        this.camera.height = window.innerHeight;

        this.ctx.globalAlpha = 1;
        this.ctx.imageSmoothingEnabled = false;
        // draw map background layer
        let layersUnderPlayer = this.getLayersUnder(this.hero.tileLevel);
        let totalLayers = this.map.layers.length;
        let self = this;

        for (let i = 0; i < layersUnderPlayer; i++) {
            this._drawLayer(i);

            this.otherPlayers.forEach((player) => {
                let thisLayersUnder = self.getLayersUnder(player.tileLevel);
                if (thisLayersUnder - 1 === i) {
                    self.ctx.drawImage(
                        player.image,
                        self.camera.getScreenX(player.x) - player.width / 2,
                        self.camera.getScreenY(player.y) - player.height / 2,
                        player.width,
                        player.height);
                }
            });
        }

        // draw main character
        this.ctx.drawImage(
            this.hero.image,
            this.hero.screenX - this.hero.width / 2,
            this.hero.screenY - this.hero.height / 2,
            this.hero.width,
            this.hero.height);

        // draw map top layer
        for (let i = layersUnderPlayer; i < totalLayers - 1; i++) {
            this._drawLayer(i);

            this.otherPlayers.forEach((player) => {
                let thisLayersUnder = self.getLayersUnder(player.tileLevel);
                if (thisLayersUnder - 1 === i) {
                    self.ctx.drawImage(
                        player.image,
                        self.camera.getScreenX(player.x) - player.width / 2,
                        self.camera.getScreenY(player.y) - player.height / 2,
                        player.width,
                        player.height);
                }
            });
        }

        this.ctx.globalAlpha = 0.5;
        this._drawLayer(totalLayers - 1);

        var tx = 10,
            ty = 0,
            dy = 40;
        this.ctx.font = "30px Arial";
        this.ctx.fillStyle = "white";
        this.ctx.fillText("Player:", tx, ty += dy);
        this.ctx.fillText("x: " + this.hero.x, tx, ty += dy);
        this.ctx.fillText("y: " + this.hero.y, tx, ty += dy);
        this.ctx.fillText("tileLevel: " + this.hero.tileLevel, tx, ty += dy);
    }


    events() {
        const self = this;
        document.addEventListener("keypress", function (event) {
            if (event.key === 'f') {
                self.fullscreen();
            }
        }, false);
        document.addEventListener("fullscreenchange", function () {
            self.fullscreenState = document.fullscreen;
        }, false);

        document.addEventListener("mozfullscreenchange", function () {
            self.fullscreenState = document.mozFullScreen;
        }, false);

        document.addEventListener("webkitfullscreenchange", function () {
            self.fullscreenState = document.webkitIsFullScreen;
        }, false);

        document.addEventListener("msfullscreenchange", function () {
            self.fullscreenState = document.msFullscreenElement;
        }, false);
    }


    fullscreen() {
        let canvas = document.querySelector("canvas");
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


    _drawLayer(layer) {
        let startCol = Math.floor(this.camera.x / this.map.drawSize);
        let endCol = startCol + (this.ctx.width / this.map.drawSize) + 1;
        let startRow = Math.floor(this.camera.y / this.map.drawSize);
        let endRow = startRow + (this.ctx.height / this.map.drawSize) + 1;
        let offsetX = -this.camera.x + startCol * this.map.drawSize;
        let offsetY = -this.camera.y + startRow * this.map.drawSize;

        for (let c = startCol; c <= endCol; c++) {
            for (let r = startRow; r <= endRow; r++) {
                let tile = this.map.getTile(layer, c, r);
                let x = (c - startCol) * this.map.drawSize + offsetX;
                let y = (r - startRow) * this.map.drawSize + offsetY;
                if (tile !== 0) { // 0 => empty tile
                    this.ctx.drawImage(
                        this.tileAtlas, // image
                        (tile % this.map.twidth - 1) * (this.map.tsize + 1), // source x
                        (Math.floor(tile / this.map.twidth)) * (this.map.tsize + 1), // source y
                        this.map.tsize, // source width
                        this.map.tsize, // source height
                        Math.round(x), // target x
                        Math.round(y), // target y
                        this.map.drawSize, // target width
                        this.map.drawSize // target height
                    );
                }
            }
        }
    }



}