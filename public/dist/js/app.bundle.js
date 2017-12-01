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
/******/ 	return __webpack_require__(__webpack_require__.s = 2);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});

var _nonCharacterObjectBase = __webpack_require__(8);

var _nonCharacterObjectBase2 = _interopRequireDefault(_nonCharacterObjectBase);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var Fire = function (_NonCharacterObject) {
    _inherits(Fire, _NonCharacterObject);

    function Fire(Loader, x, y) {
        _classCallCheck(this, Fire);

        var _this = _possibleConstructorReturn(this, (Fire.__proto__ || Object.getPrototypeOf(Fire)).call(this, x, y, 96, 96, 50, false));

        _this.setTilesImage(Loader.getImage('fire'), 1, 5, 12);
        return _this;
    }

    return Fire;
}(_nonCharacterObjectBase2.default);

exports.default = Fire;

/***/ }),
/* 1 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var InventoryObject = function () {
    function InventoryObject(stackLimit) {
        _classCallCheck(this, InventoryObject);

        this.AREAS = {
            NONE: 0,
            HEAD: 1,
            BODY: 2,
            CAPE: 3,
            BOOTS: 4,
            ONE_HANDED: 5,
            TWO_HANDED: 6
        };
        this.area = this.AREAS.NONE;
        this.equipable = false;
        this.damageOrArmor = 0;
        this.image = null;
        this.rows = 1;
        this.cols = 1;
        this.tileWidth = 1;
        this.tileHeight = 1;
        this.imageIndex = 0;
        this.increaseRatio = 1;
        this.stackLimit = stackLimit;
        this.stackCount = 1;
        this.inventoryLocation = 0;
        this.shownLocation = 0;
        this.isHolding = false;
    }

    _createClass(InventoryObject, [{
        key: "setEquipable",
        value: function setEquipable(area, damageOrArmor) {
            this.equipable = true;
            this.area = area;
            this.damageOrArmor = damageOrArmor;
        }
    }, {
        key: "setImage",
        value: function setImage(image) {
            this.image = image; // image
            this.rows = 1;
            this.cols = 1;
            this.tileWidth = image.width;
            this.tileHeight = image.height;
            this.imageIndex = 0;
        }
    }, {
        key: "setTilesImage",
        value: function setTilesImage(image, rows, cols, increaseRatio) {
            this.setImage(image);
            this.rows = rows;
            this.cols = cols;
            this.tileWidth = image.width / cols;
            this.tileHeight = image.height / rows;
            this.imageIndex = 0;
            this.increaseRatio = increaseRatio;
        }
    }, {
        key: "increaseImageIndex",
        value: function increaseImageIndex(increase) {
            this.imageIndex += increase * this.increaseRatio;
            if (this.imageIndex >= this.rows * this.cols) {
                this.imageIndex -= this.rows * this.cols;
            }
        }
    }, {
        key: "isInObject",
        value: function isInObject(x, y) {
            return this.x < x && this.x + this.width > x && this.y < y && this.y + this.height > y;
        }
    }, {
        key: "onMouseDown",
        value: function onMouseDown(mousePosition) {
            if (this.isInObject(mousePosition.x, mousePosition.y)) {
                this.isHolding = true;
            }
        }
    }, {
        key: "onMouseUp",
        value: function onMouseUp(mousePosition) {
            this.isHolding = false;
        }
    }, {
        key: "getImageIndex",
        value: function getImageIndex() {
            return Math.floor(this.imageIndex);
        }
    }, {
        key: "update",
        value: function update(delta) {
            if (this.image !== null && (this.rows > 1 || this.cols > 1)) {
                this.increaseImageIndex(delta);
            }
        }
    }, {
        key: "draw",
        value: function draw(ctx, screenX, screenY, width, height) {
            this.x = screenX;
            this.y = screenY;
            this.width = width;
            this.height = height;
            if (this.image === null) {
                this.ctx.fillText("Object", this.x, this.y);
                this.ctx.fillStyle = "purple";
                this.ctx.fillRect(this.x, this.y, this.width, this.height);
            } else {
                ctx.drawImage(this.image, // Image
                this.getImageIndex() % this.cols * this.tileWidth, // Src x
                Math.floor(this.getImageIndex() / this.cols) * this.tileHeight, // Src y
                this.tileWidth, // Src width
                this.tileHeight, // Src height
                screenX, // Target x
                screenY, // Target y
                width, // Target width
                height); // Target height
            }
        }
    }]);

    return InventoryObject;
}();

exports.default = InventoryObject;

/***/ }),
/* 2 */
/***/ (function(module, exports, __webpack_require__) {

__webpack_require__(3);
module.exports = __webpack_require__(18);


/***/ }),
/* 3 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _GameStateManager = __webpack_require__(4);

var _GameStateManager2 = _interopRequireDefault(_GameStateManager);

var _MainGameState = __webpack_require__(5);

var _MainGameState2 = _interopRequireDefault(_MainGameState);

var _Map = __webpack_require__(17);

var _Map2 = _interopRequireDefault(_Map);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

(function () {
    var ctx = document.querySelector("#game").getContext('2d');

    var socket = io();
    //const socket = io.connect("http://localhost:5000");

    var gamestatemanager = new _GameStateManager2.default();
    var mainstate = new _MainGameState2.default(ctx, new _Map2.default(), socket);
})();

/***/ }),
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

var _Camera = __webpack_require__(6);

var _Camera2 = _interopRequireDefault(_Camera);

var _Keyboard = __webpack_require__(7);

var _Keyboard2 = _interopRequireDefault(_Keyboard);

var _Fire = __webpack_require__(0);

var _Fire2 = _interopRequireDefault(_Fire);

var _Sword = __webpack_require__(9);

var _Sword2 = _interopRequireDefault(_Sword);

var _Shield = __webpack_require__(10);

var _Shield2 = _interopRequireDefault(_Shield);

var _Hero = __webpack_require__(11);

var _Hero2 = _interopRequireDefault(_Hero);

var _InventoryManager = __webpack_require__(12);

var _InventoryManager2 = _interopRequireDefault(_InventoryManager);

var _OtherPlayer = __webpack_require__(14);

var _OtherPlayer2 = _interopRequireDefault(_OtherPlayer);

var _Loader = __webpack_require__(15);

var _Loader2 = _interopRequireDefault(_Loader);

var _GameState2 = __webpack_require__(16);

var _GameState3 = _interopRequireDefault(_GameState2);

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
        _this.connected = false;
        _this.ctx = ctx;
        _this.ctx.width = window.innerWidth;
        _this.ctx.height = window.innerHeight;
        _this.nonCharacterObjects = [];

        _this._previousElapsed = 0;
        _this.isMousePressed = true;

        _this.loadassets = _this.load();
        Promise.all(_this.loadassets).then(function (loaded) {
            this.loadInventoryObjects();
            this.init();
            var self = this;
            document.onmousemove = function (event) {
                self.onMouseMove(event, self);
            };
            document.onmousedown = function (event) {
                self.onMouseDown(event, self);
            };
            document.onmouseup = function (event) {
                self.onMouseUp(event, self);
            };
            window.requestAnimationFrame(function (elapsed) {
                self.draw(elapsed);
            });
            //window.oncontextmenu = function () {
            //    self.showCustomMenu();
            //    return false; // cancel default menu
            //};
        }.bind(_this));
        return _this;
    }

    //showCustomMenu() {
    //
    //}

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
            this.render(delta);
        }
    }, {
        key: "loadNonCharacterObjects",
        value: function loadNonCharacterObjects(objects, gameState) {
            objects.forEach(function (object) {
                switch (object.name) {
                    case "Fire":
                        gameState.nonCharacterObjects.push(new _Fire2.default(gameState.Loader, object.x * gameState.map.scale, object.y * gameState.map.scale));
                        break;

                    default:
                        console.log("Object '" + object.name + "' doesn't  exist.");
                        console.log(object);
                        break;
                }
            });
        }
    }, {
        key: "loadInventoryObjects",
        value: function loadInventoryObjects() {
            var inventoryObjects = [];
            inventoryObjects.push(new _Sword2.default(this.Loader, 2));
            inventoryObjects.push(new _Shield2.default(this.Loader, 5));
            for (var _i = 0; _i < 40; _i++) {
                var r = Math.floor(Math.random() * 100) % 5 + 1;
                if (Math.random() > 0.5) {
                    inventoryObjects.push(new _Shield2.default(this.Loader, r));
                } else {
                    inventoryObjects.push(new _Sword2.default(this.Loader, r));
                }
            }
            this.InventoryManager = new _InventoryManager2.default(inventoryObjects, this.Loader);
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
            this.map.loadMap('../../assets/map/map.json', this.camera, this.hero, function (objects) {
                self.socket.emit("new_user", self.hero.getSmallObject());
                self.loadSocket(self.socket);
                self.loadNonCharacterObjects(objects, self);
            });
            this.events();
        }
    }, {
        key: "retryConnectOnFailure",
        value: function retryConnectOnFailure(retryInMilliseconds, socket, self) {
            self.timeout = setTimeout(function () {
                if (!self.connected) {
                    //console.log('trying to connect...');
                    socket.connect();
                    self.retryConnectOnFailure(retryInMilliseconds, socket, self);
                }
            }, retryInMilliseconds);
        }
    }, {
        key: "loadSocket",
        value: function loadSocket(client) {
            var self = this;
            client.on('connect', function () {
                self.connected = true;
                clearTimeout(self.timeout);
                console.log('connected');
            });
            client.on('disconnect', function () {
                self.connected = false;
                console.log('disconnected');
                self.retryConnectOnFailure(3000, client, self); // Try again in 3s
            });
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
                //console.log('player left');
                var toDeleteIndex = 0;
                for (var _i2 = 0; _i2 < self.otherPlayers.length; _i2++) {
                    if (self.otherPlayers[_i2].id === hero.id) toDeleteIndex = _i2;
                }
                self.otherPlayers.splice(i, 1);
                //self.otherPlayers.push(new OtherPlayer(hero, self.Loader, self.map));
            });
            client.on("updatingPlayer", function (hero) {
                var found = false; // is player in cache
                self.otherPlayers.forEach(function (player) {
                    if (player.id === hero.id) {
                        //console.log('info from ' + player.id);
                        player.action = hero.action;
                        player.x = hero.x;
                        player.y = hero.y;
                        player.tileLevel = hero.tileLevel;
                        found = true;
                    }
                });
                if (!found) {
                    self.otherPlayers.push(new _OtherPlayer2.default(hero, self.Loader, self.map));
                }
            });
        }
    }, {
        key: "load",
        value: function load() {
            return [this.Loader.loadImage('tiles', '../../assets/map/tileset.png'), this.Loader.loadImage('hero', '../../assets/sprites/george.png'), this.Loader.loadImage('otherPlayer', '../../assets/sprites/other.png'), this.Loader.loadImage('fire', '../../assets/sprites/CampFire.png'), this.Loader.loadImage('sword', '../../assets/sprites/Sword.png'), this.Loader.loadImage('shield', '../../assets/sprites/Shield.png'), this.Loader.loadImage('inventoryTileSet', '../../assets/sprites/inventoryManager.png'), this.Loader.loadImage('iconbar', '../../assets/sprites/iconBar.png'), this.Loader.loadImage('characterModel', '../../assets/sprites/characterModel.png')];
        }
    }, {
        key: "update",
        value: function update(delta) {
            var _this2 = this;

            var dirx = 0;
            var diry = 0;
            if (this.Keyboard.isDown(this.Keyboard.LEFT) || this.Keyboard.isDown(this.Keyboard.A)) {
                if (this.hero.action != this.hero.STATE.RUNNINGWEST) {
                    this.hero.action = this.hero.STATE.RUNNINGWEST;
                    this.socket.emit("updatePlayer", this.hero.getSmallObject());
                }
                dirx = -1;
            } else if (this.Keyboard.isDown(this.Keyboard.RIGHT) || this.Keyboard.isDown(this.Keyboard.D)) {
                if (this.hero.action != this.hero.STATE.RUNNINGEAST) {
                    this.hero.action = this.hero.STATE.RUNNINGEAST;
                    this.socket.emit("updatePlayer", this.hero.getSmallObject());
                }
                dirx = 1;
            } else if (this.Keyboard.isDown(this.Keyboard.UP) || this.Keyboard.isDown(this.Keyboard.W)) {
                if (this.hero.action != this.hero.STATE.RUNNINGNORTH) {
                    this.hero.action = this.hero.STATE.RUNNINGNORTH;
                    this.socket.emit("updatePlayer", this.hero.getSmallObject());
                }
                diry = -1;
            } else if (this.Keyboard.isDown(this.Keyboard.DOWN) || this.Keyboard.isDown(this.Keyboard.S)) {
                if (this.hero.action != this.hero.STATE.RUNNINGSOUTH) {
                    this.hero.action = this.hero.STATE.RUNNINGSOUTH;
                    this.socket.emit("updatePlayer", this.hero.getSmallObject());
                }
                diry = 1;
            } else {
                if (this.hero.action != this.hero.STATE.STOP) {
                    this.hero.action = this.hero.STATE.STOP;
                    this.socket.emit("updatePlayer", this.hero.getSmallObject());
                }
            }
            this.hero.move(delta, dirx, diry);
            this.otherPlayers.forEach(function (player) {
                player.move(delta);
            });
            this.nonCharacterObjects.forEach(function (thisObject) {
                thisObject.update(delta);
                if (thisObject.hasDamage()) {
                    var playerBounds = _this2.hero.getPlayerBounds();
                    if (thisObject.isNear(playerBounds.xMin, playerBounds.yMin, playerBounds.xMax, playerBounds.yMax)) {
                        _this2.hero.takeDamage(thisObject.damage * delta);
                    }
                }
            });
            this.InventoryManager.update(delta);
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
        value: function render(delta) {
            var _this3 = this;

            var canvas = document.querySelector("canvas");
            canvas.width = window.innerWidth;
            canvas.height = window.innerHeight;
            canvas.style.width = window.innerWidth;
            canvas.style.height = window.innerHeight;

            this.ctx.width = window.innerWidth;
            this.ctx.height = window.innerHeight;
            this.camera.width = window.innerWidth;
            this.camera.height = window.innerHeight;

            this.ctx.imageSmoothingEnabled = false;
            // draw map background layer
            var layersUnderPlayer = this.getLayersUnder(this.hero.tileLevel);
            var totalLayers = this.map.layers.length;
            var self = this;

            var _loop = function _loop(_i3) {
                _this3._drawLayer(_i3);

                _this3.otherPlayers.forEach(function (player) {
                    var thisLayersUnder = self.getLayersUnder(player.tileLevel);
                    if (thisLayersUnder - 1 === _i3) {
                        player.draw(self.ctx, self.camera.getScreenX(player.x), self.camera.getScreenY(player.y));
                    }
                });
            };

            for (var _i3 = 0; _i3 < layersUnderPlayer; _i3++) {
                _loop(_i3);
            }

            // draw main character
            this.hero.draw(this.ctx);

            this.nonCharacterObjects.forEach(function (thisObject) {
                thisObject.draw(_this3.ctx, _this3.camera.getScreenX(thisObject.x), _this3.camera.getScreenY(thisObject.y));
            });

            // draw map top layer

            var _loop2 = function _loop2(_i4) {
                _this3._drawLayer(_i4);

                _this3.otherPlayers.forEach(function (player) {
                    var thisLayersUnder = self.getLayersUnder(player.tileLevel);
                    if (thisLayersUnder - 1 === _i4) {
                        player.draw(self.ctx, self.camera.getScreenX(player.x), self.camera.getScreenY(player.y));
                    }
                });
            };

            for (var _i4 = layersUnderPlayer; _i4 < totalLayers - 1; _i4++) {
                _loop2(_i4);
            }

            this.ctx.globalAlpha = 0.5;
            this._drawLayer(totalLayers - 1);

            this.ctx.globalAlpha = 1;
            this.InventoryManager.draw(this.ctx, this.ctx.width * 0.7, 0, this.ctx.width * 0.3, this.ctx.width * 0.36, this.ctx.width * 0.3, 0);
            this._drawUI(delta);
        }
    }, {
        key: "onMouseDown",
        value: function onMouseDown(event, self) {
            var mousePosition = {
                x: event.pageX,
                y: event.pageY
            };
            self.InventoryManager.onMouseDown(mousePosition);
        }
    }, {
        key: "onMouseUp",
        value: function onMouseUp(event, self) {
            var mousePosition = {
                x: event.pageX,
                y: event.pageY
            };
            self.InventoryManager.onMouseUp(mousePosition);
        }
    }, {
        key: "onMouseMove",
        value: function onMouseMove(event, self) {
            var mousePosition = {
                x: event.pageX,
                y: event.pageY
            };
            self.InventoryManager.onMouseMove(mousePosition);
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
        key: "_drawUI",
        value: function _drawUI(delta) {
            var tx = 10,
                ty = 0,
                dy = 40;

            this.ctx.fillStyle = "black";
            this.ctx.fillRect(tx, ty += dy, 102, 20);
            this.ctx.fillStyle = "red";
            this.ctx.fillRect(tx + 1, ty + 1, this.hero.health, 18);

            this.ctx.fillStyle = "black";
            this.ctx.fillRect(tx, ty += dy, 102, 20);
            this.ctx.fillStyle = "lightblue";
            this.ctx.fillRect(tx + 1, ty + 1, this.hero.shield, 18);

            ty += dy;
            dy /= 2;

            this.ctx.font = "22px Arial";
            this.ctx.fillStyle = "white";
            this.ctx.fillText("Player:", tx, ty += dy);
            this.ctx.fillText("x: " + this.hero.x, tx, ty += dy);
            this.ctx.fillText("y: " + this.hero.y, tx, ty += dy);
            this.ctx.fillText("tileLevel: " + this.hero.tileLevel, tx, ty += dy);
            this.ctx.fillText("health: " + this.hero.health, tx, ty += dy);
            this.ctx.fillText("shield: " + this.hero.shield, tx, ty += dy);
            this.ctx.fillText("players connected: " + (this.otherPlayers.length + 1), tx, ty += dy);
            this.ctx.fillText("fps: " + delta === 0 ? 0 : Math.round(1 / delta * 10) / 10, tx, ty += dy);
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
        value: function getScreenX(originalX) {
            return originalX - this.x;
        }
    }, {
        key: "getScreenY",
        value: function getScreenY(originalY) {
            return originalY - this.y;
        }
    }]);

    return Camera;
}();

exports.default = Camera;

/***/ }),
/* 7 */
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
/* 8 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var NonCharacterObject = function () {
    function NonCharacterObject(x, y, width, height, damage, solid) {
        _classCallCheck(this, NonCharacterObject);

        this.x = x; // int
        this.y = y; // int
        this.width = width; // int
        this.height = height; // int
        this.damage = damage; // int
        this.solid = solid; // bool
        this.image = null;
        this.rows = 1;
        this.cols = 1;
        this.tileWidth = 1;
        this.tileHeight = 1;
        this.imageIndex = 0;
        this.increaseRatio = 1;
    }

    _createClass(NonCharacterObject, [{
        key: "hasDamage",
        value: function hasDamage() {
            return this.damage >= 0;
        }
    }, {
        key: "setImage",
        value: function setImage(image) {
            this.image = image; // image
            this.rows = 1;
            this.cols = 1;
            this.tileWidth = image.width;
            this.tileHeight = image.height;
            this.imageIndex = 0;
        }
    }, {
        key: "setTilesImage",
        value: function setTilesImage(image, rows, cols, increaseRatio) {
            this.setImage(image);
            this.rows = rows;
            this.cols = cols;
            this.tileWidth = image.width / cols;
            this.tileHeight = image.height / rows;
            this.imageIndex = 0;
            this.increaseRatio = increaseRatio;
        }
    }, {
        key: "isNear",
        value: function isNear(xMin, yMin, xMax, yMax) {
            // DON'T EDIT IF YOU DON'T UNDERSTAND! (source: https://stackoverflow.com/questions/306316/determine-if-two-rectangles-overlap-each-other)
            //console.log('isNear: ' + (this.x < xMax) + ' && ' + (this.x + this.width > xMin) + ' && ' +
            //   (this.y < yMax) + ' && ' + (this.y + this.height > yMin));
            return this.x < xMax && this.x + this.width > xMin && this.y < yMax && this.y + this.height > yMin;
        }
    }, {
        key: "isInObject",
        value: function isInObject(x, y) {
            return this.x < x && this.x + this.width > x && this.y < y && this.y + this.height > y;
        }
    }, {
        key: "increaseImageIndex",
        value: function increaseImageIndex(increase) {
            this.imageIndex += increase * this.increaseRatio;
            if (this.imageIndex >= this.rows * this.cols) {
                this.imageIndex -= this.rows * this.cols;
            }
        }
    }, {
        key: "getImageIndex",
        value: function getImageIndex() {
            return Math.floor(this.imageIndex);
        }
    }, {
        key: "update",
        value: function update(delta) {
            if (this.image !== null && (this.rows > 1 || this.cols > 1)) {
                this.increaseImageIndex(delta);
            }
        }
    }, {
        key: "draw",
        value: function draw(ctx, screenX, screenY) {
            if (this.image === null) {
                this.ctx.fillText("Object", this.x, this.y);
                this.ctx.fillStyle = "purple";
                this.ctx.fillRect(this.x, this.y, this.width, this.height);
            } else {
                ctx.drawImage(this.image, // Image
                this.getImageIndex() % this.cols * this.tileWidth, // Src x
                Math.floor(this.getImageIndex() / this.cols) * this.tileHeight, // Src y
                this.tileWidth, // Src width
                this.tileHeight, // Src height
                screenX, // Target x
                screenY, // Target y
                this.width, // Target width
                this.height); // Target height
            }
        }
    }]);

    return NonCharacterObject;
}();

exports.default = NonCharacterObject;

/***/ }),
/* 9 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});

var _InventoryObjectBase = __webpack_require__(1);

var _InventoryObjectBase2 = _interopRequireDefault(_InventoryObjectBase);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var Sword = function (_InventoryObject) {
    _inherits(Sword, _InventoryObject);

    function Sword(Loader, stackCount) {
        _classCallCheck(this, Sword);

        var _this = _possibleConstructorReturn(this, (Sword.__proto__ || Object.getPrototypeOf(Sword)).call(this, 3));

        _this.stackCount = stackCount;
        _this.setEquipable(_this.AREAS.ONE_HANDED, 10);
        _this.setImage(Loader.getImage('sword'));
        return _this;
    }

    return Sword;
}(_InventoryObjectBase2.default);

exports.default = Sword;

/***/ }),
/* 10 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});

var _InventoryObjectBase = __webpack_require__(1);

var _InventoryObjectBase2 = _interopRequireDefault(_InventoryObjectBase);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var Shield = function (_InventoryObject) {
    _inherits(Shield, _InventoryObject);

    function Shield(Loader, stackCount) {
        _classCallCheck(this, Shield);

        var _this = _possibleConstructorReturn(this, (Shield.__proto__ || Object.getPrototypeOf(Shield)).call(this, 5));

        _this.stackCount = stackCount;
        _this.setEquipable(_this.AREAS.ONE_HANDED, 10);
        _this.setImage(Loader.getImage('shield'));
        return _this;
    }

    return Shield;
}(_InventoryObjectBase2.default);

exports.default = Shield;

/***/ }),
/* 11 */
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
        this.debugging = false;

        this.health = 100;
        this.shield = 100;

        this.imageIndex = 0;
        this.imageState = 0;
        this.width = map.drawSize;
        this.height = map.drawSize;
        this.imageWidth = 48;
        this.imageHeight = 48;
        this.maskWidth = map.drawSize * 0.65;
        this.maskHeight = map.drawSize * 0.8;
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

        if (this.debugging) {
            this.speed = 512;
        }
    }

    _createClass(Hero, [{
        key: 'getSmallObject',
        value: function getSmallObject() {
            var smallObject = {};
            smallObject.id = this.id;
            smallObject.x = Math.floor(this.x * 100) / 100;
            smallObject.y = Math.floor(this.y * 100) / 100;
            smallObject.action = this.action;
            smallObject.tileLevel = this.tileLevel;
            smallObject.speed = this.speed;
            smallObject.width = this.width;
            smallObject.height = this.height;
            //console.log(smallObject);
            return smallObject;
        }
    }, {
        key: 'getPlayerBounds',
        value: function getPlayerBounds() {
            return {
                xMin: this.x - this.maskWidth / 2,
                yMin: this.y - this.maskHeight / 2,
                xMax: this.x + this.maskWidth / 2,
                yMax: this.y + this.maskHeight / 2
            };
        }
    }, {
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

            this._calculateImageState(dirx, diry, delta * 8);

            // move hero
            this.x += dirx * this.speed * delta;
            this.y += diry * this.speed * delta;

            // check if we walked into a non-walkable tile
            if (!this.debugging) {
                this._collide(dirx, diry);
            }

            // clamp values
            var maxX = this.map.cols * this.map.drawSize;
            var maxY = this.map.rows * this.map.drawSize;
            this.x = Math.max(0, Math.min(this.x, maxX));
            this.y = Math.max(0, Math.min(this.y, maxY));
        }
    }, {
        key: 'getImageIndex',
        value: function getImageIndex() {
            return this.imageState + 4 * Math.floor(this.imageIndex);
        }
    }, {
        key: 'takeDamage',
        value: function takeDamage(damage) {
            if (this.shield > 0) {
                this.shield -= damage;
            } else if (this.health > 0) {
                this.shield = 0;
                this.health -= damage;
            } else {
                // Die
                this.shield = 100;
                this.health = 100;
            }
        }
    }, {
        key: 'draw',
        value: function draw(ctx) {
            ctx.drawImage(this.image, // Image
            this.getImageIndex() % 4 * this.imageWidth, // Src x
            Math.floor(this.getImageIndex() / 4) * this.imageHeight, // Src y
            this.imageWidth, // Src width
            this.imageHeight, // Src height
            this.screenX - this.width / 2, // Target x
            this.screenY - this.height / 2, // Target y
            this.width, // Target width
            this.height); // Target height
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
        key: '_calculateImageState',
        value: function _calculateImageState(dirx, diry, increase) {
            if (dirx !== 0 || diry !== 0) {
                this.imageIndex += increase;
                if (this.imageIndex >= 4) {
                    this.imageIndex -= 4;
                }
            } else {
                this.imageIndex = 0;
            }

            if (diry > 0) {
                this.imageState = 0;
            } else if (diry < 0) {
                this.imageState = 2;
            } else if (dirx > 0) {
                this.imageState = 3;
            } else if (dirx < 0) {
                this.imageState = 1;
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
                this.imageIndex = 0;
            } else if (diry < 0) {
                row = this.map.getRow(top);
                this.y = this.maskHeight / 2 + this.map.getY(row + 1);
                this.imageIndex = 0;
            } else if (dirx > 0) {
                col = this.map.getCol(right);
                this.x = -this.maskWidth / 2 + this.map.getX(col);
                this.imageIndex = 0;
            } else if (dirx < 0) {
                col = this.map.getCol(left);
                this.x = this.maskWidth / 2 + this.map.getX(col + 1);
                this.imageIndex = 0;
            }
        }
    }]);

    return Hero;
}();

exports.default = Hero;

/***/ }),
/* 12 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _InventoryIcon = __webpack_require__(13);

var _InventoryIcon2 = _interopRequireDefault(_InventoryIcon);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var InventoryManager = function () {
    function InventoryManager(inventoryObjects, Loader) {
        _classCallCheck(this, InventoryManager);

        this.inventory = inventoryObjects;
        var i = 0;
        this.inventory.forEach(function (inventoryObject) {
            inventoryObject.shownLocation = i;
            inventoryObject.inventoryLocation = i++;
        });

        this.iterations = 8;
        this.imageCharacter = Loader.getImage("characterModel");
        this.imageBack = Loader.getImage("inventoryTileSet");
        this.backCols = 4;
        this.backRows = 4;
        this.tileBackWidth = this.imageBack.width / this.backCols;
        this.tileBackHeight = this.imageBack.height / this.backRows;
        this.imageIconBar = Loader.getImage("iconbar");
        this.iconBarCols = 3;
        this.iconBarRows = 4;
        this.tileIconBarWidth = this.imageIconBar.width / this.iconBarCols;
        this.tileIconBarHeight = this.imageIconBar.height / this.iconBarRows;
        this.selectedAction = 0;
        this.mousePosition = {
            x: 0,
            y: 0
        };

        this.STATES = {
            HIDDEN: 0,
            INVENTORY: 1,
            CHARACTER: 2
        };
        this.iconBar = [];
        this.iconBar.push(new _InventoryIcon2.default(this.STATES.INVENTORY, this.imageIconBar, 1, this.tileIconBarHeight));
        this.iconBar.push(new _InventoryIcon2.default(this.STATES.CHARACTER, this.imageIconBar, 2, this.tileIconBarHeight));

        this.actionBarIcons = [];
        for (var _i = 0; _i < 10; _i++) {
            this.actionBarIcons.push(new _InventoryIcon2.default(_i, this.imageIconBar, 0, this.tileIconBarHeight));
            if (this.selectedAction === _i) this.actionBarIcons[_i].isSelected = true;
        }

        this.state = this.STATES.HIDDEN;
    }

    _createClass(InventoryManager, [{
        key: "update",
        value: function update(delta) {
            this.inventory.forEach(function (inventoryObject) {
                inventoryObject.update(delta);
            });
        }
    }, {
        key: "addObject",
        value: function addObject(object) {
            this.inventory.push(object);
        }
    }, {
        key: "isInObject",
        value: function isInObject(x, y) {
            return this.x < x && this.x + this.width > x && this.y < y && this.y + this.height > y;
        }
    }, {
        key: "onMouseDown",
        value: function onMouseDown(mousePosition) {
            this.inventory.forEach(function (inventoryObject) {
                inventoryObject.onMouseDown(mousePosition);
                if (inventoryObject.isHolding) {}
            });

            this.mousePosition = mousePosition;
        }
    }, {
        key: "onMouseUp",
        value: function onMouseUp(mousePosition) {
            var _this = this;

            this.moveInventory(mousePosition, true);

            var holdingObject = false;
            this.inventory.forEach(function (inventoryObject) {
                if (inventoryObject.isHolding) {
                    holdingObject = true;
                }
                inventoryObject.onMouseUp(mousePosition);
            });

            if (!holdingObject) {
                var oldState = this.state;
                var oldSelectedAction = this.selectedAction;
                this.iconBar.forEach(function (icon) {
                    if (icon.onMouseMove(mousePosition)) {
                        if (icon.isSelected) {
                            icon.isSelected = false;
                            _this.state = _this.STATES.HIDDEN;
                        } else {
                            _this.state = icon.state;
                            icon.isSelected = true;
                        }
                    }
                });
                if (oldState != this.state) {
                    this.iconBar.forEach(function (icon) {
                        if (icon.state != _this.state) {
                            icon.isSelected = false;
                        }
                    });
                }
                this.actionBarIcons.forEach(function (icon) {
                    if (icon.onMouseMove(mousePosition)) {
                        icon.isSelected = true;
                        _this.selectedAction = icon.state;
                    }
                });
                if (this.selectedAction !== oldSelectedAction) {
                    this.actionBarIcons.forEach(function (icon) {
                        if (_this.selectedAction !== icon.state) {
                            icon.isSelected = false;
                        }
                    });
                }
            }
        }
    }, {
        key: "onMouseMove",
        value: function onMouseMove(mousePosition, mousePressed) {
            var isHolding = false;
            this.iconBar.forEach(function (icon) {
                icon.onMouseMove(mousePosition);
            });
            this.actionBarIcons.forEach(function (icon) {
                icon.onMouseMove(mousePosition);
            });
            this.inventory.forEach(function (inventoryObject) {
                if (inventoryObject.isHolding) {
                    isHolding = true;
                }
            });
            this.mousePosition = mousePosition;
            if (isHolding) {
                if (this.isInObject(mousePosition.x, mousePosition.y)) {
                    this.holdingInObject = true;
                    this.moveInventory(mousePosition, false);
                } else {
                    this.holdingInObject = false;
                }
            }
        }
    }, {
        key: "moveInventory",
        value: function moveInventory(mousePosition, binding) {
            var drawWidth = this.width / (this.iterations + 1);
            var drawHeight = (this.height - this.yTop) / (this.iterations + 1);
            var tempX = Math.floor((mousePosition.x - this.x - drawWidth / 2) / drawWidth);
            var tempY = Math.floor((mousePosition.y - this.y - drawHeight / 2) / drawHeight);
            var position = tempX + tempY * this.iterations;
            var emptyPosition = position;
            var originalPosition = void 0;
            var untilPosition = void 0;
            //console.log('x: ' + tempX + ', y: ' + tempY + ', pos: ' + position);

            this.inventory.forEach(function (inventoryObject) {
                // Get original position
                if (inventoryObject.isHolding) {
                    originalPosition = inventoryObject.inventoryLocation;
                    //console.log(originalPosition + ", " + position);
                }
            });

            var positionsBetween = [];
            if (position < originalPosition) {
                for (var i = position; i < originalPosition; i++) {
                    positionsBetween.push(i);
                }
            } else if (position > originalPosition) {
                for (var _i2 = position; _i2 > originalPosition; _i2--) {
                    positionsBetween.push(_i2);
                }
            }
            this.inventory.forEach(function (inventoryObject) {
                // Get empty position
                positionsBetween.forEach(function (posBetween) {
                    if (inventoryObject.inventoryLocation === posBetween) {
                        positionsBetween.splice(positionsBetween.indexOf(posBetween), 1); // remove from array
                    }
                });
            });

            if (positionsBetween.length === 0) {
                untilPosition = originalPosition;
            } else {
                untilPosition = positionsBetween[0];
            }

            this.inventory.forEach(function (inventoryObject) {
                if (inventoryObject.isHolding) {
                    inventoryObject.shownLocation = position;
                    if (binding) {
                        inventoryObject.inventoryLocation = position;
                    }
                } else {
                    if (position < untilPosition && inventoryObject.inventoryLocation >= position && inventoryObject.inventoryLocation < untilPosition) {
                        inventoryObject.shownLocation = inventoryObject.inventoryLocation + 1;
                    } else if (position > untilPosition && inventoryObject.inventoryLocation <= position && inventoryObject.inventoryLocation > untilPosition) {
                        inventoryObject.shownLocation = inventoryObject.inventoryLocation - 1;
                    } else {
                        inventoryObject.shownLocation = inventoryObject.inventoryLocation;
                    }
                    if (binding) {
                        inventoryObject.inventoryLocation = inventoryObject.shownLocation;
                    }
                }
            });
        }
    }, {
        key: "draw",
        value: function draw(ctx, xIcon, yIcon, width, height, xAction, yAction) {
            var drawWidth = Math.round(width / this.iterations * 5) / 5;
            var drawHeight = Math.round(height / (this.iterations + 1));
            this.yTop = yIcon + drawHeight;

            this.x = xIcon;
            this.y = this.yTop;
            this.width = width;
            this.height = height;

            if (this.state !== this.STATES.HIDDEN) {
                this.drawBack(ctx, xIcon, this.yTop, drawWidth, drawHeight, this.iterations);
                if (this.state === this.STATES.CHARACTER) {
                    ctx.drawImage(this.imageCharacter, xIcon, this.yTop, drawWidth * this.iterations, drawHeight * this.iterations);
                } else if (this.state === this.STATES.INVENTORY) {
                    this.drawInventory(ctx, xIcon + drawWidth / 2, this.yTop + drawHeight / 2, drawWidth / this.iterations * (this.iterations - 1), drawHeight / this.iterations * (this.iterations - 1), this.iterations);
                }
            }

            this.drawIconBar(ctx, xIcon, yIcon, drawWidth, drawHeight);
            this.drawActionBar(ctx, xAction, yAction, drawWidth * 10, drawHeight);
        }
    }, {
        key: "drawBack",
        value: function drawBack(ctx, x, y, drawWidth, drawHeight, iterations) {
            for (var xx = 0; xx < iterations; xx++) {
                for (var yy = 0; yy < iterations; yy++) {
                    var xPos = 2,
                        yPos = 1;
                    if (xx === 0) {
                        xPos = 0;
                    } else if (xx === iterations - 1) {
                        xPos = this.backCols - 1;
                    }
                    if (yy === 0) {
                        yPos = 0;
                    } else if (yy === iterations - 1) {
                        yPos = this.backRows - 1;
                    }
                    ctx.drawImage(this.imageBack, this.tileBackWidth * xPos, this.tileBackHeight * yPos, this.tileBackWidth, this.tileBackHeight, Math.floor(x + xx * drawWidth), Math.floor(y + yy * drawHeight), drawWidth + 1, drawHeight + 1);
                }
            }
        }
    }, {
        key: "drawInventory",
        value: function drawInventory(ctx, x, y, drawWidth, drawHeight, iterations) {
            var _this2 = this;

            this.inventory.forEach(function (inventoryObject) {
                var drawX = void 0,
                    drawY = void 0;
                if (inventoryObject.isHolding) {
                    drawX = _this2.mousePosition.x;
                    drawY = _this2.mousePosition.y;
                } else {
                    drawX = x + Math.floor(inventoryObject.shownLocation % iterations) * drawWidth;
                    drawY = y + Math.floor(inventoryObject.shownLocation / iterations) * drawHeight;
                }
                inventoryObject.draw(ctx, drawX, drawY, drawWidth, drawHeight);
                ctx.font = "22px Arial";
                ctx.fillStyle = "white";
                ctx.fillText(inventoryObject.stackCount, drawX, drawY + drawHeight);
            });
        }
    }, {
        key: "drawIconBar",
        value: function drawIconBar(ctx, x, y, drawWidth, drawHeight) {
            for (var i = 0; i < this.iconBar.length; i++) {
                var icon = this.iconBar[i];
                icon.draw(ctx, x + i * drawWidth, y, drawWidth, drawHeight);
            }
        }
    }, {
        key: "drawActionBar",
        value: function drawActionBar(ctx, x, y, drawWidth, drawHeight) {
            var drawX = x,
                dx = drawWidth / 10;
            ctx.font = "14px Arial";
            ctx.fillStyle = "white";
            for (var i = 0; i < 10; i++) {
                this.actionBarIcons[i].draw(ctx, drawX + i * dx, y, dx, drawHeight);
                ctx.fillText(i === 9 ? 0 : i + 1, drawX + dx / 2 + i * dx, y + drawHeight / 2);
            }
        }
    }]);

    return InventoryManager;
}();

exports.default = InventoryManager;

/***/ }),
/* 13 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var InventoryIcon = function () {
    function InventoryIcon(state, image, tileX, tileWidth) {
        _classCallCheck(this, InventoryIcon);

        this.image = image;
        this.tileX = tileX;
        this.tileWidth = tileWidth;
        this.mouseOver = false;
        this.isSelected = false;
        this.state = state;
    }

    _createClass(InventoryIcon, [{
        key: "onMouseMove",
        value: function onMouseMove(mousePosition) {
            this.mouseOver = mousePosition.x <= this.x + this.width && mousePosition.x >= this.x && mousePosition.y <= this.y + this.height && mousePosition.y >= this.y;
            return this.mouseOver;
        }
    }, {
        key: "draw",
        value: function draw(ctx, x, y, width, height) {
            this.x = x;
            this.y = y;
            this.width = width;
            this.height = height;

            var tileY = 0;
            if (this.isSelected && this.mouseOver) {
                tileY = 3;
            } else if (this.isSelected) {
                tileY = 2;
            } else if (this.mouseOver) {
                tileY = 1;
            }

            ctx.drawImage(this.image, this.tileX * this.tileWidth, tileY * this.tileWidth, this.tileWidth, this.tileWidth, x, y, width, height);
        }
    }]);

    return InventoryIcon;
}();

exports.default = InventoryIcon;

/***/ }),
/* 14 */
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

        this.imageIndex = 0;
        this.imageState = 0;
        this.width = map.drawSize;
        this.height = map.drawSize;
        this.imageWidth = 48;
        this.imageHeight = 48;
        this.maskWidth = map.drawSize * 0.65;
        this.maskHeight = map.drawSize * 0.8;
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
        key: 'getImageIndex',
        value: function getImageIndex() {
            return this.imageState + 4 * Math.floor(this.imageIndex);
        }
    }, {
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

            this._calculateImageState(dirx, diry, delta * 8);

            // check if we walked into a non-walkable tile
            this._collide(dirx, diry);

            // TODO: Ban hackers (collide)
        }
    }, {
        key: 'draw',
        value: function draw(ctx, x, y) {
            //console.log({
            //    image: this.image, // Image
            //    sx: (this.getImageIndex() % 4) * this.imageWidth, // Src x
            //    sy: Math.floor(this.getImageIndex() / 4) * this.imageHeight, // Src y
            //    sw: this.imageWidth, // Src width
            //    sh: this.imageHeight, // Src height
            //    tx: x - this.width / 2, // Target x
            //    ty: y - this.height / 2, // Target y
            //    tw: this.width, // Target width
            //    th: this.height // Target height
            //});

            ctx.drawImage(this.image, // Image
            this.getImageIndex() % 4 * this.imageWidth, // Src x
            Math.floor(this.getImageIndex() / 4) * this.imageHeight, // Src y
            this.imageWidth, // Src width
            this.imageHeight, // Src height
            x - this.width / 2, // Target x
            y - this.height / 2, // Target y
            this.width, // Target width
            this.height); // Target height
        }
    }, {
        key: '_calculateImageState',
        value: function _calculateImageState(dirx, diry, increase) {
            if (dirx !== 0 || diry !== 0) {
                this.imageIndex += increase;
                if (this.imageIndex >= 4) {
                    this.imageIndex -= 4;
                }
            } else {
                this.imageIndex = 0;
            }

            if (diry > 0) {
                this.imageState = 0;
            } else if (diry < 0) {
                this.imageState = 2;
            } else if (dirx > 0) {
                this.imageState = 3;
            } else if (dirx < 0) {
                this.imageState = 1;
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
                this.imageIndex = 0;
            } else if (diry < 0) {
                row = this.map.getRow(top);
                this.y = this.maskHeight / 2 + this.map.getY(row + 1);
                this.imageIndex = 0;
            } else if (dirx > 0) {
                col = this.map.getCol(right);
                this.x = -this.maskWidth / 2 + this.map.getX(col);
                this.imageIndex = 0;
            } else if (dirx < 0) {
                col = this.map.getCol(left);
                this.x = this.maskWidth / 2 + this.map.getX(col + 1);
                this.imageIndex = 0;
            }
        }
    }]);

    return OtherPlayer;
}();

exports.default = OtherPlayer;

/***/ }),
/* 15 */
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
/* 16 */
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
/* 17 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _Fire = __webpack_require__(0);

var _Fire2 = _interopRequireDefault(_Fire);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var Map = function () {
    function Map() {
        _classCallCheck(this, Map);

        this.tilesetSrc = "not implemented";
        this.cols = 150;
        this.rows = 150;
        this.tsize = 16;
        this.scale = 4;
        this.drawSize = this.tsize * this.scale;
        this.twidth = 2;
        this.layers = [[0, 0], [0, 0]]; // Basic empty layers
    }

    _createClass(Map, [{
        key: "loadMap",
        value: function loadMap(src, camera, hero, callback) {
            var map = this;
            var objects = [];
            this.loadJSON(src, function (data) {
                //console.log(data);
                map.cols = data.width;
                map.rows = data.height;
                map.tsize = data.tilewidth;
                map.twidth = data.tilesets[0].columns;
                map.layers = [];
                data.layers.forEach(function (layer) {
                    if (layer.type === "tilelayer") {
                        map.layers.push(layer.data);
                    } else if (layer.type === "objectgroup") {
                        layer.objects.forEach(function (object) {
                            objects.push(object);
                        });
                        // objects.concat(layer.objects); <- not working?
                    } else {
                        console.log("Unknown layer type: '" + layer.type + "' in layer");
                        console.log(layer);
                    }
                }, this);

                camera.follow(hero);
                //console.log('#layers:' + map.layers.length);
                //console.log('#tiles horizontally in tileset:' + map.twidth);
                callback(objects);
            });
        }
    }, {
        key: "loadJSON",
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
        key: "getTile",
        value: function getTile(layer, col, row) {
            if (this.layers[layer] === undefined) {
                //console.error(layer + ' not in ' + this.layers);
                return null;
            } else return this.layers[layer][row * this.cols + col];
        }
    }, {
        key: "isSolidTileAtXY",
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
        key: "getTileLevelAtXY",
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
        key: "getCol",
        value: function getCol(x) {
            return Math.floor(x / this.tsize);
        }
    }, {
        key: "getRow",
        value: function getRow(y) {
            return Math.floor(y / this.tsize);
        }
    }, {
        key: "getX",
        value: function getX(col) {
            return col * this.tsize;
        }
    }, {
        key: "getY",
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
/* 18 */
/***/ (function(module, exports) {

// removed by extract-text-webpack-plugin

/***/ })
/******/ ]);