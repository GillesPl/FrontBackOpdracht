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
module.exports = __webpack_require__(2);


/***/ }),
/* 1 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _GameStateManager = __webpack_require__(4);

var _GameStateManager2 = _interopRequireDefault(_GameStateManager);

var _MainGameState = __webpack_require__(5);

var _MainGameState2 = _interopRequireDefault(_MainGameState);

var _Map = __webpack_require__(11);

var map = _interopRequireWildcard(_Map);

var _LoadTiled = __webpack_require__(12);

var _LoadTiled2 = _interopRequireDefault(_LoadTiled);

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

(function () {
    var ctx = document.querySelector("#game").getContext('2d');

    var Socket = io();

    var gamestatemanager = new _GameStateManager2.default();
    var mainstate = new _MainGameState2.default(ctx, map, Socket);
})();

/***/ }),
/* 2 */
/***/ (function(module, exports) {

// removed by extract-text-webpack-plugin

/***/ }),
/* 3 */,
/* 4 */
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
/* 5 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _Camera = __webpack_require__(7);

var Camera = _interopRequireWildcard(_Camera);

var _Keyboard = __webpack_require__(6);

var Keyboard = _interopRequireWildcard(_Keyboard);

var _GameState2 = __webpack_require__(8);

var _GameState3 = _interopRequireDefault(_GameState2);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

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

        _this.Socket = socket;

        _this.fullscreenState = false;

        _this.Loader = new Loader();

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
            this.Keyboard = new Keyboard();
            this.Keyboard.listenForEvents([this.Keyboard.LEFT, this.Keyboard.RIGHT, this.Keyboard.UP, this.Keyboard.DOWN, this.Keyboard.A, this.Keyboard.D, this.Keyboard.W, this.Keyboard.S]);

            this.tileAtlas = this.Loader.getImage('tiles');

            this.hero = new Hero(this.map, 50 * this.map.drawSize, 50 * this.map.drawSize, this.Loader);
            this.camera = new Camera(this.map, window.innerWidth, window.innerHeight);

            this.map.loadMap('../../assets/map/map.json', this.camera, this.hero);
            this.events();
        }
    }, {
        key: "load",
        value: function load() {
            return [this.Loader.loadImage('tiles', '../assets/map/tileset.png'), this.Loader.loadImage('hero', '../assets/sprites/george-front.png')];
        }
    }, {
        key: "update",
        value: function update(delta) {
            var dirx = 0;
            var diry = 0;
            if (this.Keyboard.isDown(this.Keyboard.LEFT) || this.Keyboard.isDown(this.Keyboard.A)) {
                if (this.hero.action != this.hero.STATE.RUNNINGWEST) {
                    this.hero.action = this.hero.STATE.RUNNINGWEST;
                    this.Socket.emit("MoveWest", this.hero);
                }
                dirx = -1;
            } else if (this.Keyboard.isDown(this.Keyboard.RIGHT) || this.Keyboard.isDown(this.Keyboard.D)) {
                if (this.hero.action != this.hero.STATE.RUNNINGEAST) {
                    this.hero.action = this.hero.STATE.RUNNINGEAST;
                    this.Socket.emit("MoveEast", this.hero);
                }
                dirx = 1;
            } else if (this.Keyboard.isDown(this.Keyboard.UP) || this.Keyboard.isDown(this.Keyboard.W)) {
                if (this.hero.action != this.hero.STATE.RUNNINGNORTH) {
                    this.hero.action = this.hero.STATE.RUNNINGNORTH;
                    this.Socket.emit("MoveNorth", this.hero);
                }
                diry = -1;
            } else if (this.Keyboard.isDown(this.Keyboard.DOWN) || this.Keyboard.isDown(this.Keyboard.S)) {
                if (this.hero.action != this.hero.STATE.RUNNINGSOUTH) {
                    this.hero.action = this.hero.STATE.RUNNINGSOUTH;
                    this.Socket.emit("MoveSouth", this.hero);
                }
                diry = 1;
            } else {
                if (this.hero.action != this.hero.STATE.STOP) {
                    this.hero.action = this.hero.STATE.STOP;
                    this.Socket.emit("Stop", this.hero);
                }
            }
            this.hero.move(delta, dirx, diry);
            this.camera.update();
        }
    }, {
        key: "render",
        value: function render() {
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
            var layersUnderPlayer = 12;
            var totalLayers = this.map.layers.length;
            if (this.hero.tileLevel === 0) layersUnderPlayer = 11;else if (this.hero.tileLevel === 1) layersUnderPlayer = 12;else if (this.hero.tileLevel === 1) layersUnderPlayer = 14;

            for (var i = 0; i < layersUnderPlayer; i++) {
                this._drawLayer(i);
            } // draw main character
            this.ctx.drawImage(this.hero.image, this.hero.screenX - this.hero.width / 2, this.hero.screenY - this.hero.height / 2, this.hero.width, this.hero.height);

            // draw map top layer
            for (var _i = layersUnderPlayer; _i < totalLayers - 1; _i++) {
                this._drawLayer(_i);
            }this.ctx.globalAlpha = 0.5;
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
/* 6 */
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
/* 7 */
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
            this.maxX = map.cols * map.drawSize - this.width;
            this.maxY = map.rows * map.drawSize - this.height;

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
    }]);

    return Camera;
}();

exports.default = Camera;

/***/ }),
/* 8 */
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
/* 9 */,
/* 10 */,
/* 11 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var Map = function Map() {
    _classCallCheck(this, Map);

    this.tilesetSrc = "not implemented";
    this.cols = 12;
    this.rows = 12;
    this.tsize = 64;
    this.drawSize = 64;
    this.twidth;
};

exports.default = Map;


var map = {
    loadMap: function loadMap(src) {},
    tilesetSrc: 'Not implemented',
    cols: 12,
    rows: 12,
    tsize: 64,
    drawSize: 64,
    twidth: 1,
    layers: [[3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 3, 3, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 3, 3, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 3, 3, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 3, 3, 1, 1, 1, 1, 1, 2, 1, 1, 1, 1, 3, 3, 1, 2, 2, 1, 1, 1, 1, 1, 1, 1, 3, 3, 1, 2, 2, 1, 1, 1, 1, 1, 1, 1, 3, 3, 1, 1, 1, 2, 1, 1, 1, 1, 1, 1, 3, 3, 1, 1, 1, 1, 2, 1, 1, 1, 1, 1, 3, 3, 1, 1, 1, 1, 2, 1, 1, 1, 1, 1, 3, 3, 3, 3, 1, 1, 2, 3, 3, 3, 3, 3, 3], [4, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 4, 4, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 4, 4, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 4, 4, 0, 0, 5, 0, 0, 0, 0, 0, 5, 0, 4, 4, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 4, 4, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 4, 4, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 4, 4, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 4, 4, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 4, 4, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 4, 4, 4, 4, 0, 5, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 0, 0, 3, 3, 3, 3, 3, 3, 3]],
    getTile: function getTile(layer, col, row) {
        return this.layers[layer][row * map.cols + col];
    },
    isSolidTileAtXY: function isSolidTileAtXY(x, y, level) {
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
    getTileLevelAtXY: function getTileLevelAtXY(x, y) {
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
    getCol: function getCol(x) {
        return Math.floor(x / this.tsize);
    },
    getRow: function getRow(y) {
        return Math.floor(y / this.tsize);
    },
    getX: function getX(col) {
        return col * this.tsize;
    },
    getY: function getY(row) {
        return row * this.tsize;
    }
};

/***/ }),
/* 12 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


map.loadMap = function (src, camera, hero) {
    loadJSON(src, function (data) {
        console.log(data);
        map.cols = data.width;
        map.rows = data.height;
        map.tsize = data.tilewidth;
        map.twidth = data.tilesets[0].columns;
        map.layers = [];
        data.layers.forEach(function (layer) {
            map.layers.push(layer.data);
        }, this);

        camera.follow(hero);
        console.log('#layers:' + map.layers.length);
        console.log('#tiles horizontally in tileset:' + map.twidth);
    });
};

function loadJSON(src, callback) {
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

/***/ })
/******/ ]);