/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, {
/******/ 				configurable: false,
/******/ 				enumerable: true,
/******/ 				get: getter
/******/ 			});
/******/ 		}
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, exports, __webpack_require__) {

__webpack_require__(1);
module.exports = __webpack_require__(12);


/***/ }),
/* 1 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _GameStateManager = __webpack_require__(2);

var _GameStateManager2 = _interopRequireDefault(_GameStateManager);

var _MainGameState = __webpack_require__(3);

var _MainGameState2 = _interopRequireDefault(_MainGameState);

var _Map = __webpack_require__(11);

var _Map2 = _interopRequireDefault(_Map);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

(function () {
    var ctx = document.querySelector("#game").getContext('2d');

    //const socket = io();
    var socket = io.connect("http://localhost:5000");

    var gamestatemanager = new _GameStateManager2.default();
    var mainstate = new _MainGameState2.default(ctx, new _Map2.default(), socket);
})();

/***/ }),
/* 2 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var GameStateManager = function () {
    function GameStateManager() {
        _classCallCheck(this, GameStateManager);

        this.currentState;
        this.gameStates = [];
    }

    _createClass(GameStateManager, [{
        key: "draw",
        value: function draw() {
            //start the tickevent
            this.currentState.draw();
        }
    }, {
        key: "setState",
        value: function setState(gameState) {
            this.currentState = state;
            this.draw();
        }
    }, {
        key: "getState",
        value: function getState(gameState) {
            gameStates.forEach(function (el) {
                if (el === gameState) return el;else throw new Error("Gamestate not found in GameStateManager");
            });
        }
    }, {
        key: "getCurrentState",
        value: function getCurrentState() {
            if (this.currentState != null) return this.currentState;else throw new Error("No current Gamestate is set");
        }
    }, {
        key: "addState",
        value: function addState(gameState) {
            this.gameStates.push(gameState);
        }
    }, {
        key: "removeState",
        value: function removeState(gameState) {
            var index = this.gameStates.indexOf(gameState);
            if (index != null) {
                this.gameStates.splice(index, 1);
            } else throw new Error("Gamestate not found");
        }
    }, {
        key: "update",
        value: function update() {}
    }]);

    return GameStateManager;
}();

exports.default = GameStateManager;

/***/ }),
/* 3 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _Camera = __webpack_require__(4);

var _Camera2 = _interopRequireDefault(_Camera);

var _Keyboard = __webpack_require__(5);

var _Keyboard2 = _interopRequireDefault(_Keyboard);

var _Hero = __webpack_require__(6);

var _Hero2 = _interopRequireDefault(_Hero);

var _OtherPlayer = __webpack_require__(7);

var _OtherPlayer2 = _interopRequireDefault(_OtherPlayer);

var _Loader = __webpack_require__(8);

var _Loader2 = _interopRequireDefault(_Loader);

var _GameState2 = __webpack_require__(9);

var _GameState3 = _interopRequireDefault(_GameState2);

var _os = __webpack_require__(10);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var MainGameState = function (_GameState) {
    _inherits(MainGameState, _GameState);

    function MainGameState(ctx, map, socket) {
        _classCallCheck(this, MainGameState);

        var _this = _possibleConstructorReturn(this, (MainGameState.__proto__ || Object.getPrototypeOf(MainGameState)).call(this, ctx));

        _this.map = map;
        _this.hero;
        _this.camera;
        _this.socket = socket;
        _this.fullscreenState = false;
        _this.Loader = new _Loader2.default();
        _this.otherPlayers = [];

        _this.ctx = ctx;
        _this.ctx.width = window.innerWidth;
        _this.ctx.height = window.innerHeight;

        _this._previousElapsed = 0;

        _this.loadassets = _this.load();
        Promise.all(_this.loadassets).then(function (loaded) {
            this.init();
            var self = this;
            window.requestAnimationFrame(function (elapsed) {
                self.draw(elapsed);
            });
        }.bind(_this));
        return _this;
    }

    _createClass(MainGameState, [{
        key: "draw",
        value: function draw(elapsed) {
            var self = this;
            window.requestAnimationFrame(function (elapsed) {
                self.draw(elapsed);
            });

            // clear previous frame
            this.ctx.clearRect(0, 0, 512, 512);

            // compute delta elapsed in seconds -- also cap it
            var delta = (elapsed - this._previousElapsed) / 1000.0;
            delta = Math.min(delta, 0.25); // maximum delta of 250 ms
            this._previousElapsed = elapsed;

            //var in update == delta, see commented code above
            this.update(delta);
            this.render();
        }

        // send map in this

    }, {
        key: "init",
        value: function init() {
            this.Keyboard = new _Keyboard2.default();
            this.Keyboard.listenForEvents([this.Keyboard.LEFT, this.Keyboard.RIGHT, this.Keyboard.UP, this.Keyboard.DOWN, this.Keyboard.A, this.Keyboard.D, this.Keyboard.W, this.Keyboard.S]);

            this.tileAtlas = this.Loader.getImage('tiles');
            this.hero = new _Hero2.default(this.map, 50 * this.map.drawSize, 50 * this.map.drawSize, this.Loader);
            this.camera = new _Camera2.default(this.map, window.innerWidth, window.innerHeight);

            var self = this;
            this.map.loadMap('../../assets/map/map.json', this.camera, this.hero, function () {
                self.socket.emit("new_user", self.hero);
                self.loadSocket(self.socket);
            });
            this.events();
        }
    }, {
        key: "loadSocket",
        value: function loadSocket(client) {
            var self = this;
            client.on("otherPlayers", function (others) {
                self.otherPlayers = [];
                others.forEach(function (player) {
                    if (player.id != self.hero.id) {
                        self.otherPlayers.push(new _OtherPlayer2.default(player, self.Loader, self.map));
                    }
                });
            });
            client.on("New_connection", function (hero) {
                self.otherPlayers.push(new _OtherPlayer2.default(hero, self.Loader, self.map));
            });
            client.on("user_leave", function (hero) {
                console.log('player left');
                var toDeleteIndex = 0;
                for (var _i = 0; _i < self.otherPlayers.length; _i++) {
                    if (self.otherPlayers[_i].id === hero.id) toDeleteIndex = _i;
                }
                self.otherPlayers.splice(i, 1);
                self.otherPlayers.push(new _OtherPlayer2.default(hero, self.Loader, self.map));
            });
            client.on("MovingWest", function (hero) {
                self.otherPlayers.forEach(function (player) {
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
                self.otherPlayers.forEach(function (player) {
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
                self.otherPlayers.forEach(function (player) {
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
                self.otherPlayers.forEach(function (player) {
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
                self.otherPlayers.forEach(function (player) {
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
    }, {
        key: "load",
        value: function load() {
            return [this.Loader.loadImage('tiles', '../../assets/map/tileset.png'), this.Loader.loadImage('hero', '../../assets/sprites/george-front.png'), this.Loader.loadImage('otherPlayer', '../../assets/sprites/other-front.png')];
        }
    }, {
        key: "update",
        value: function update(delta) {
            var dirx = 0;
            var diry = 0;
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
            this.otherPlayers.forEach(function (player) {
                player.move(delta);
            });
            this.camera.update();
        }
    }, {
        key: "getLayersUnder",
        value: function getLayersUnder(tileLevel) {
            switch (tileLevel) {
                case 1:
                    return 12;
                case 2:
                    return 14;
                default:
                    return 11;
            }
        }
    }, {
        key: "render",
        value: function render() {
            var _this2 = this;

            var canvas = document.querySelector("canvas");
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
            var layersUnderPlayer = this.getLayersUnder(this.hero.tileLevel);
            var totalLayers = this.map.layers.length;
            var self = this;

            var _loop = function _loop(_i2) {
                _this2._drawLayer(_i2);

                _this2.otherPlayers.forEach(function (player) {
                    var thisLayersUnder = self.getLayersUnder(player.tileLevel);
                    if (thisLayersUnder - 1 === _i2) {
                        self.ctx.drawImage(player.image, self.camera.getScreenX(player.x) - player.width / 2, self.camera.getScreenY(player.y) - player.height / 2, player.width, player.height);
                    }
                });
            };

            for (var _i2 = 0; _i2 < layersUnderPlayer; _i2++) {
                _loop(_i2);
            }

            // draw main character
            this.ctx.drawImage(this.hero.image, this.hero.screenX - this.hero.width / 2, this.hero.screenY - this.hero.height / 2, this.hero.width, this.hero.height);

            // draw map top layer

            var _loop2 = function _loop2(_i3) {
                _this2._drawLayer(_i3);

                _this2.otherPlayers.forEach(function (player) {
                    var thisLayersUnder = self.getLayersUnder(player.tileLevel);
                    if (thisLayersUnder - 1 === _i3) {
                        self.ctx.drawImage(player.image, self.camera.getScreenX(player.x) - player.width / 2, self.camera.getScreenY(player.y) - player.height / 2, player.width, player.height);
                    }
                });
            };

            for (var _i3 = layersUnderPlayer; _i3 < totalLayers - 1; _i3++) {
                _loop2(_i3);
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
    }, {
        key: "events",
        value: function events() {
            var self = this;
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
    }, {
        key: "fullscreen",
        value: function fullscreen() {
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
        }
    }, {
        key: "_drawLayer",
        value: function _drawLayer(layer) {
            var startCol = Math.floor(this.camera.x / this.map.drawSize);
            var endCol = startCol + this.ctx.width / this.map.drawSize + 1;
            var startRow = Math.floor(this.camera.y / this.map.drawSize);
            var endRow = startRow + this.ctx.height / this.map.drawSize + 1;
            var offsetX = -this.camera.x + startCol * this.map.drawSize;
            var offsetY = -this.camera.y + startRow * this.map.drawSize;

            for (var c = startCol; c <= endCol; c++) {
                for (var r = startRow; r <= endRow; r++) {
                    var tile = this.map.getTile(layer, c, r);
                    var x = (c - startCol) * this.map.drawSize + offsetX;
                    var y = (r - startRow) * this.map.drawSize + offsetY;
                    if (tile !== 0) {
                        // 0 => empty tile
                        this.ctx.drawImage(this.tileAtlas, // image
                        (tile % this.map.twidth - 1) * (this.map.tsize + 1), // source x
                        Math.floor(tile / this.map.twidth) * (this.map.tsize + 1), // source y
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
    }]);

    return MainGameState;
}(_GameState3.default);

exports.default = MainGameState;

/***/ }),
/* 4 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var Camera = function () {
    function Camera(map, width, height) {
        _classCallCheck(this, Camera);

        this.width = width;
        this.height = height;
        this.map = map;

        this.x = 0;
        this.y = 0;
    }

    _createClass(Camera, [{
        key: "follow",
        value: function follow(sprite) {
            this.following = sprite;
            sprite.screenX = 0;
            sprite.screenY = 0;
        }
    }, {
        key: "update",
        value: function update() {
            if (this.following === undefined) return;

            this.maxX = this.map.cols * this.map.drawSize - this.width;
            this.maxY = this.map.rows * this.map.drawSize - this.height;

            var minPlayerX = this.width / 3;
            var minPlayerY = this.height / 3;
            var maxPlayerX = 2 * this.width / 3;
            var maxPlayerY = 2 * this.height / 3;

            this.following.screenX = this.following.x - this.x;
            this.following.screenY = this.following.y - this.y;

            if (this.following.screenX > this.width || this.following.screenY > this.height) {
                // already off screen -> center screen
                this.following.screenX = this.width / 2;
                this.following.screenY = this.height / 2;
                this.x = this.following.x - this.width / 2;
                this.y = this.following.y - this.height / 2;
            }

            if (this.following.screenX < minPlayerX) {
                this.x = this.following.x - minPlayerX;
            } else if (this.following.screenX > maxPlayerX) {
                this.x = this.following.x - maxPlayerX;
            }
            if (this.following.screenY < minPlayerY) {
                this.y = this.following.y - minPlayerY;
            } else if (this.following.screenY > maxPlayerY) {
                this.y = this.following.y - maxPlayerY;
            }

            this.x = Math.max(0, Math.min(this.x, this.maxX));
            this.y = Math.max(0, Math.min(this.y, this.maxY));

            this.following.screenX = this.following.x - this.x;
            this.following.screenY = this.following.y - this.y;
        }
    }, {
        key: "getScreenX",
        value: function getScreenX(playerX) {
            return playerX - this.x;
        }
    }, {
        key: "getScreenY",
        value: function getScreenY(playerY) {
            return playerY - this.y;
        }
    }]);

    return Camera;
}();

exports.default = Camera;

/***/ }),
/* 5 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var Keyboard = function () {
    function Keyboard() {
        _classCallCheck(this, Keyboard);

        this.LEFT = 37;
        this.RIGHT = 39;
        this.UP = 38;
        this.DOWN = 40;
        this.W = 87;
        this.A = 65;
        this.S = 83;
        this.D = 68;
        this.F = 70;
        this._keys = {};
    }

    _createClass(Keyboard, [{
        key: 'listenForEvents',
        value: function listenForEvents(keys) {
            window.addEventListener('keydown', this._onKeyDown.bind(this));
            window.addEventListener('keyup', this._onKeyUp.bind(this));

            keys.forEach(function (key) {
                this._keys[key] = false;
            }.bind(this));
        }
    }, {
        key: '_onKeyDown',
        value: function _onKeyDown(event) {
            var keyCode = event.keyCode;
            if (keyCode in this._keys) {
                event.preventDefault();
                this._keys[keyCode] = true;
            }
        }
    }, {
        key: '_onKeyUp',
        value: function _onKeyUp(event) {
            var keyCode = event.keyCode;
            if (keyCode in this._keys) {
                event.preventDefault();
                this._keys[keyCode] = false;
            }
        }
    }, {
        key: 'isDown',
        value: function isDown(keycode) {
            if (!(keycode in this._keys)) {
                throw new Error('keycode ' + keycode + ' is not being listened to');
            }
            return this._keys[keycode];
        }
    }]);

    return Keyboard;
}();

exports.default = Keyboard;

/***/ }),
/* 6 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var Hero = function () {
    function Hero(map, x, y, Loader) {
        _classCallCheck(this, Hero);

        this.map = map;
        this.x = x;
        this.y = y;
        this.Loader = Loader;

        this.width = map.drawSize;
        this.height = map.drawSize;
        this.maskWidth = map.drawSize * 0.75;
        this.maskHeight = map.drawSize * 0.85;
        this.tileLevel = 0; // HeighttileLevel
        this.STATE = {
            RUNNINGNORTH: 1,
            RUNNINGEAST: 2,
            RUNNINGSOUTH: 3,
            RUNNINGWEST: 4,
            STOP: 5
        };

        this.action = this.STATE.STOP;
        this.image = this.Loader.getImage('hero');

        this.speed = 256;
        this.id = this.generateId();
    }

    _createClass(Hero, [{
        key: 'generateId',
        value: function generateId() {
            function s4() {
                return Math.floor((1 + Math.random()) * 0x10000).toString(16).substring(1);
            }

            function time() {
                return Math.floor((1 + new Date().getTime()) * 0x10000).toString(16).substring(1);
            }
            return time() + '-' + s4() + '-' + s4() + '-' + s4() + '-' + s4() + s4() + s4();
        }
    }, {
        key: 'move',
        value: function move(delta, dirx, diry) {
            this._calculateTileLevel();
            // move hero
            this.x += dirx * this.speed * delta;
            this.y += diry * this.speed * delta;

            // check if we walked into a non-walkable tile
            this._collide(dirx, diry);

            // clamp values
            var maxX = this.map.cols * this.map.drawSize;
            var maxY = this.map.rows * this.map.drawSize;
            this.x = Math.max(0, Math.min(this.x, maxX));
            this.y = Math.max(0, Math.min(this.y, maxY));
        }
    }, {
        key: '_calculateTileLevel',
        value: function _calculateTileLevel() {
            var newTileLevel = this.map.getTileLevelAtXY(this.x, this.y);
            if (newTileLevel != -1) {
                if (this.tileLevel != newTileLevel) {
                    //console.log('switch from level ' + this.tileLevel + ' to level ' + newTileLevel);
                    this.tileLevel = newTileLevel;
                }
            }
        }
    }, {
        key: '_collide',
        value: function _collide(dirx, diry) {
            var row = void 0,
                col = void 0;
            // -1 in right and bottom is because image ranges from 0..63
            // and not up to 64
            var left = this.x - this.maskWidth / 2;
            var right = this.x + this.maskWidth / 2 - 1;
            var top = this.y - this.maskHeight / 2;
            var bottom = this.y + this.maskHeight / 2 - 1;

            // check for collisions on sprite sides
            var collision = this.map.isSolidTileAtXY(left, top, this.tileLevel) || this.map.isSolidTileAtXY(right, top, this.tileLevel) || this.map.isSolidTileAtXY(right, bottom, this.tileLevel) || this.map.isSolidTileAtXY(left, bottom, this.tileLevel);
            if (!collision) {
                return;
            }

            if (diry > 0) {
                row = this.map.getRow(bottom);
                this.y = -this.maskHeight / 2 + this.map.getY(row);
            } else if (diry < 0) {
                row = this.map.getRow(top);
                this.y = this.maskHeight / 2 + this.map.getY(row + 1);
            } else if (dirx > 0) {
                col = this.map.getCol(right);
                this.x = -this.maskWidth / 2 + this.map.getX(col);
            } else if (dirx < 0) {
                col = this.map.getCol(left);
                this.x = this.maskWidth / 2 + this.map.getX(col + 1);
            }
        }
    }]);

    return Hero;
}();

exports.default = Hero;

/***/ }),
/* 7 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var OtherPlayer = function () {
    function OtherPlayer(hero, Loader, map) {
        _classCallCheck(this, OtherPlayer);

        this.x = hero.x;
        this.y = hero.y;
        this.Loader = Loader;

        this.width = hero.width;
        this.height = hero.height;
        this.maskWidth = hero.width * 0.75;
        this.maskHeight = hero.height * 0.85;
        this.tileLevel = 0; // HeighttileLevel
        this.STATE = {
            RUNNINGNORTH: 1,
            RUNNINGEAST: 2,
            RUNNINGSOUTH: 3,
            RUNNINGWEST: 4,
            STOP: 5
        };

        this.action = hero.action;
        this.image = this.Loader.getImage('otherPlayer');
        this.speed = hero.speed;
        this.id = hero.id;
        this.map = map;
    }

    _createClass(OtherPlayer, [{
        key: 'move',
        value: function move(delta) {
            var dirx = void 0,
                diry = void 0;

            switch (this.action) {
                case this.STATE.RUNNINGNORTH:
                    dirx = 0;
                    diry = -1;
                    break;
                case this.STATE.RUNNINGEAST:
                    dirx = 1;
                    diry = 0;
                    break;
                case this.STATE.RUNNINGSOUTH:
                    dirx = 0;
                    diry = 1;
                    break;
                case this.STATE.RUNNINGWEST:
                    dirx = -1;
                    diry = 0;
                    break;
                case this.STATE.STOP:
                    dirx = 0;
                    diry = 0;
                    break;
            }
            // move hero
            this.x += dirx * this.speed * delta;
            this.y += diry * this.speed * delta;

            // check if we walked into a non-walkable tile
            this._collide(dirx, diry);
        }
    }, {
        key: '_collide',
        value: function _collide(dirx, diry) {
            var row = void 0,
                col = void 0;
            // -1 in right and bottom is because image ranges from 0..63
            // and not up to 64
            var left = this.x - this.maskWidth / 2;
            var right = this.x + this.maskWidth / 2 - 1;
            var top = this.y - this.maskHeight / 2;
            var bottom = this.y + this.maskHeight / 2 - 1;

            // check for collisions on sprite sides
            var collision = this.map.isSolidTileAtXY(left, top, this.tileLevel) || this.map.isSolidTileAtXY(right, top, this.tileLevel) || this.map.isSolidTileAtXY(right, bottom, this.tileLevel) || this.map.isSolidTileAtXY(left, bottom, this.tileLevel);
            if (!collision) {
                return;
            }

            if (diry > 0) {
                row = this.map.getRow(bottom);
                this.y = -this.maskHeight / 2 + this.map.getY(row);
            } else if (diry < 0) {
                row = this.map.getRow(top);
                this.y = this.maskHeight / 2 + this.map.getY(row + 1);
            } else if (dirx > 0) {
                col = this.map.getCol(right);
                this.x = -this.maskWidth / 2 + this.map.getX(col);
            } else if (dirx < 0) {
                col = this.map.getCol(left);
                this.x = this.maskWidth / 2 + this.map.getX(col + 1);
            }
        }
    }]);

    return OtherPlayer;
}();

exports.default = OtherPlayer;

/***/ }),
/* 8 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var Loader = function () {
    function Loader() {
        _classCallCheck(this, Loader);

        this.images = {};
    }

    _createClass(Loader, [{
        key: 'loadImage',
        value: function loadImage(key, src) {
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
        }
    }, {
        key: 'getImage',
        value: function getImage(key) {
            return key in this.images ? this.images[key] : null;
        }
    }]);

    return Loader;
}();

exports.default = Loader;

/***/ }),
/* 9 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var GameState = function () {
    function GameState(ctx) {
        _classCallCheck(this, GameState);

        this.ctx = ctx;
    }

    _createClass(GameState, [{
        key: "getContext",
        value: function getContext() {
            return this.ctx;
        }
    }, {
        key: "clear",
        value: function clear() {
            this.ctx.clearRect(0, 0, ctx.width, ctx.height);
        }
    }, {
        key: "draw",
        value: function draw() {
            //this draws something
            this.ctx.clearRect(0, 0, ctx.width, ctx.height);
        }
    }]);

    return GameState;
}();

exports.default = GameState;

/***/ }),
/* 10 */
/***/ (function(module, exports) {

exports.endianness = function () { return 'LE' };

exports.hostname = function () {
    if (typeof location !== 'undefined') {
        return location.hostname
    }
    else return '';
};

exports.loadavg = function () { return [] };

exports.uptime = function () { return 0 };

exports.freemem = function () {
    return Number.MAX_VALUE;
};

exports.totalmem = function () {
    return Number.MAX_VALUE;
};

exports.cpus = function () { return [] };

exports.type = function () { return 'Browser' };

exports.release = function () {
    if (typeof navigator !== 'undefined') {
        return navigator.appVersion;
    }
    return '';
};

exports.networkInterfaces
= exports.getNetworkInterfaces
= function () { return {} };

exports.arch = function () { return 'javascript' };

exports.platform = function () { return 'browser' };

exports.tmpdir = exports.tmpDir = function () {
    return '/tmp';
};

exports.EOL = '\n';


/***/ }),
/* 11 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var Map = function () {
    function Map() {
        _classCallCheck(this, Map);

        this.tilesetSrc = "not implemented";
        this.cols = 150;
        this.rows = 150;
        this.tsize = 16;
        this.drawSize = 64;
        this.twidth = 2;
        this.layers = [[0, 0], [0, 0]]; // Basic empty layers
    }

    _createClass(Map, [{
        key: 'loadMap',
        value: function loadMap(src, camera, hero, callback) {
            var map = this;
            this.loadJSON(src, function (data) {
                console.log(data);
                map.cols = data.width;
                map.rows = data.height;
                map.tsize = data.tilewidth;
                map.twidth = data.tilesets[0].columns;
                map.layers = [];
                data.layers.forEach(function (layer) {
                    map.layers.push(layer.data);
                }, map);

                camera.follow(hero);
                console.log('#layers:' + map.layers.length);
                console.log('#tiles horizontally in tileset:' + map.twidth);
                callback();
            });
        }
    }, {
        key: 'loadJSON',
        value: function loadJSON(src, callback) {
            var xobj = new XMLHttpRequest();
            xobj.overrideMimeType("application/json");
            xobj.open('GET', src, true);
            xobj.onreadystatechange = function () {
                if (xobj.readyState == 4 && xobj.status == "200") {
                    callback(JSON.parse(xobj.responseText));
                }
            };
            xobj.send(null);
        }
    }, {
        key: 'getTile',
        value: function getTile(layer, col, row) {
            if (this.layers[layer] === undefined) {
                //console.error(layer + ' not in ' + this.layers);
                return null;
            } else return this.layers[layer][row * this.cols + col];
        }
    }, {
        key: 'isSolidTileAtXY',
        value: function isSolidTileAtXY(x, y, level) {
            var collision = false;
            var col = Math.floor(x / this.drawSize);
            var row = Math.floor(y / this.drawSize);

            var solidLayers,
                unSolidLayers = [12]; // Layers/tiles that the player always is allowed on

            if (level === 0) {
                solidLayers = [3, 4, 5, 6, 8, 11, 13];
            } else if (level === 1) {
                solidLayers = [3, 4, 5, 6, 8, 13];
            } else if (level === 2) {
                solidLayers = [5, 6, 8, 13, 14];
            } else {
                //console.log('Unknown level');
                return false;
            }
            var map = this;
            solidLayers.forEach(function (layer) {
                if (map.getTile([layer], col, row) !== 0) {
                    collision = true;
                }
            }, this);
            unSolidLayers.forEach(function (layer) {
                if (map.getTile([layer], col, row) !== 0) {
                    collision = false;
                }
            }, this);
            return collision;
        }
    }, {
        key: 'getTileLevelAtXY',
        value: function getTileLevelAtXY(x, y) {
            var level = 999;
            var col = Math.floor(x / this.drawSize);
            var row = Math.floor(y / this.drawSize);

            var layers = [];

            layers.push([2]); // 0
            layers.push([10]); // 1
            layers.push([11]); // 2

            var unLeveledLayers = [12]; // Layers that block conversion

            for (var layerHeight = 0; layerHeight < layers.length; layerHeight++) {
                for (var i = 0; i < layers[layerHeight].length; i++) {
                    if (this.getTile(layers[layerHeight][i], col, row) !== 0) {
                        if (level == 999 || level == layerHeight) {
                            level = layerHeight;
                        } else {
                            level = -1;
                            //console.log('double tile');
                        }
                    }
                }
            }

            unLeveledLayers.forEach(function (layer) {
                if (this.getTile([layer], col, row) !== 0) {
                    level = -1;
                }
            }, this);

            return level === 999 ? -1 : level;
        }
    }, {
        key: 'getCol',
        value: function getCol(x) {
            return Math.floor(x / this.tsize);
        }
    }, {
        key: 'getRow',
        value: function getRow(y) {
            return Math.floor(y / this.tsize);
        }
    }, {
        key: 'getX',
        value: function getX(col) {
            return col * this.tsize;
        }
    }, {
        key: 'getY',
        value: function getY(row) {
            return row * this.tsize;
        }
    }]);

    return Map;
}();

/*
var map = {
    loadMap: function (src) {},
    tilesetSrc: 'Not implemented',
    cols: 12,
    rows: 12,
    tsize: 64,
    drawSize: 64,
    twidth: 1,
    layers: [
        [
            3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3,
            3, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 3,
            3, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 3,
            3, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 3,
            3, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 3,
            3, 1, 1, 1, 1, 1, 2, 1, 1, 1, 1, 3,
            3, 1, 2, 2, 1, 1, 1, 1, 1, 1, 1, 3,
            3, 1, 2, 2, 1, 1, 1, 1, 1, 1, 1, 3,
            3, 1, 1, 1, 2, 1, 1, 1, 1, 1, 1, 3,
            3, 1, 1, 1, 1, 2, 1, 1, 1, 1, 1, 3,
            3, 1, 1, 1, 1, 2, 1, 1, 1, 1, 1, 3,
            3, 3, 3, 1, 1, 2, 3, 3, 3, 3, 3, 3
        ],
        [
            4, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 4,
            4, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 4,
            4, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 4,
            4, 0, 0, 5, 0, 0, 0, 0, 0, 5, 0, 4,
            4, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 4,
            4, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 4,
            4, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 4,
            4, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 4,
            4, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 4,
            4, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 4,
            4, 4, 4, 0, 5, 4, 4, 4, 4, 4, 4, 4,
            4, 4, 4, 0, 0, 3, 3, 3, 3, 3, 3, 3
        ]
    ],
    getTile: function (layer, col, row) {
        return this.layers[layer][row * map.cols + col];
    },
    isSolidTileAtXY: function (x, y, level) {
        var collision = false;
        var col = Math.floor(x / this.drawSize);
        var row = Math.floor(y / this.drawSize);

        var solidLayers, unSolidLayers = [12]; // Layers/tiles that the player always is allowed on

        if (level === 0) {
            solidLayers = [3, 4, 5, 6, 8, 11, 13];
        } else if (level === 1) {
            solidLayers = [3, 4, 5, 6, 8, 13];
        } else if (level === 2) {
            solidLayers = [5, 6, 8, 13, 14];
        } else {
            //console.log('Unknown level');
            return false;
        }
        solidLayers.forEach(function (layer) {
            if (this.getTile([layer], col, row) !== 0) {
                collision = true;
            }
        }, this);
        unSolidLayers.forEach(function (layer) {
            if (this.getTile([layer], col, row) !== 0) {
                collision = false;
            }
        }, this);
        return collision;
    },
    getTileLevelAtXY: function (x, y) {
        var level = 999;
        var col = Math.floor(x / this.drawSize);
        var row = Math.floor(y / this.drawSize);

        var layers = [];

        layers.push([2]); // 0
        layers.push([10]); // 1
        layers.push([11]); // 2

        var unLeveledLayers = [12]; // Layers that block conversion

        for (var layerHeight = 0; layerHeight < layers.length; layerHeight++) {
            for (var i = 0; i < layers[layerHeight].length; i++) {
                if (this.getTile(layers[layerHeight][i], col, row) !== 0) {
                    if (level == 999 || level == layerHeight) {
                        level = layerHeight;
                    } else {
                        level = -1;
                        //console.log('double tile');
                    }
                }
            }
        }

        unLeveledLayers.forEach(function (layer) {
            if (this.getTile([layer], col, row) !== 0) {
                level = -1;
            }
        }, this);

        return level === 999 ? -1 : level;
    },
    getCol: function (x) {
        return Math.floor(x / this.tsize);
    },
    getRow: function (y) {
        return Math.floor(y / this.tsize);
    },
    getX: function (col) {
        return col * this.tsize;
    },
    getY: function (row) {
        return row * this.tsize;
    }
};*/


exports.default = Map;

/***/ }),
/* 12 */
/***/ (function(module, exports) {

// removed by extract-text-webpack-plugin

/***/ })
/******/ ]);