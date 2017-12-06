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

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var InventoryObject = function () {
    function InventoryObject(typeId, stackLimit, stackCount) {
        _classCallCheck(this, InventoryObject);

        this.AREAS = {
            NONE: 0,
            HEAD: 1,
            BODY: 2,
            CAPE: 3,
            BOOTS: 4,
            ONE_HANDED: 5,
            OFF_HAND: 6
        };
        this.USES = {
            NONE: 0,
            HEALTH: 1
        };

        this.typeId = typeId;
        this.area = this.AREAS.NONE;
        this.usage = this.USES.NONE;
        this.isEquipable = false;
        this.isUsable = false;
        this.strength = 0;
        this.image = null;
        this.rows = 1;
        this.cols = 1;
        this.tileWidth = 1;
        this.tileHeight = 1;
        this.imageIndex = 0;
        this.increaseRatio = 1;
        this.stackLimit = stackLimit;
        this.stackCount = stackCount > stackLimit ? stackLimit : stackCount;
        this.inventoryLocation = 0;
        this.shownLocation = 0;
        this.isHolding = false;
        this.actionLocation = -1;
    }

    _createClass(InventoryObject, [{
        key: "setEquipable",
        value: function setEquipable(area, strength) {
            this.isEquipable = true;
            this.area = area;
            this.strength = strength;
            this.isEquiped = false;
            this.isUsable = false;
        }
    }, {
        key: "setUsable",
        value: function setUsable(usage, strength) {
            this.isUsable = true;
            this.usage = usage;
            this.strength = strength;
            this.isEquipable = false;
        }
    }, {
        key: "setEquiped",
        value: function setEquiped(equiped, emptyPosition) {
            this.isHolding = false;
            this.isEquiped = equiped;
            this.inventoryLocation = emptyPosition;
            this.shownLocation = emptyPosition;
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
                if (!this.isEquiped) {
                    this.isHolding = true;
                } else {
                    this.setEquiped(false, -2);
                }
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
        value: function update(delta, allInventoryPositions) {
            if (this.image !== null && (this.rows > 1 || this.cols > 1)) {
                this.increaseImageIndex(delta);
            }

            if (this.inventoryLocation === -2) {
                if (allInventoryPositions.length !== 0) {
                    this.inventoryLocation = allInventoryPositions[allInventoryPositions.length - 1];
                    this.shownLocation = allInventoryPositions[allInventoryPositions.length - 1];
                } else {
                    this.setEquiped(true, -1);
                }
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
/* 1 */
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
/* 2 */
/***/ (function(module, exports, __webpack_require__) {

__webpack_require__(3);
module.exports = __webpack_require__(47);


/***/ }),
/* 3 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _GameStateManager = __webpack_require__(4);

var _GameStateManager2 = _interopRequireDefault(_GameStateManager);

var _MainGameState = __webpack_require__(5);

var _MainGameState2 = _interopRequireDefault(_MainGameState);

var _Map = __webpack_require__(46);

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

var _Fire = __webpack_require__(1);

var _Fire2 = _interopRequireDefault(_Fire);

var _Hero = __webpack_require__(9);

var _Hero2 = _interopRequireDefault(_Hero);

var _InventoryManager = __webpack_require__(10);

var _InventoryManager2 = _interopRequireDefault(_InventoryManager);

var _OtherPlayer = __webpack_require__(12);

var _OtherPlayer2 = _interopRequireDefault(_OtherPlayer);

var _Loader = __webpack_require__(13);

var _Loader2 = _interopRequireDefault(_Loader);

var _GameState2 = __webpack_require__(14);

var _GameState3 = _interopRequireDefault(_GameState2);

var _Sword_ = __webpack_require__(15);

var _Sword_2 = _interopRequireDefault(_Sword_);

var _Sword_3 = __webpack_require__(16);

var _Sword_4 = _interopRequireDefault(_Sword_3);

var _Sword_5 = __webpack_require__(17);

var _Sword_6 = _interopRequireDefault(_Sword_5);

var _Shield_ = __webpack_require__(18);

var _Shield_2 = _interopRequireDefault(_Shield_);

var _Shield_3 = __webpack_require__(19);

var _Shield_4 = _interopRequireDefault(_Shield_3);

var _Shield_5 = __webpack_require__(20);

var _Shield_6 = _interopRequireDefault(_Shield_5);

var _Shield_7 = __webpack_require__(21);

var _Shield_8 = _interopRequireDefault(_Shield_7);

var _Axe_ = __webpack_require__(22);

var _Axe_2 = _interopRequireDefault(_Axe_);

var _Axe_3 = __webpack_require__(23);

var _Axe_4 = _interopRequireDefault(_Axe_3);

var _Axe_5 = __webpack_require__(24);

var _Axe_6 = _interopRequireDefault(_Axe_5);

var _Bow_ = __webpack_require__(25);

var _Bow_2 = _interopRequireDefault(_Bow_);

var _Bow_3 = __webpack_require__(26);

var _Bow_4 = _interopRequireDefault(_Bow_3);

var _Bow_5 = __webpack_require__(27);

var _Bow_6 = _interopRequireDefault(_Bow_5);

var _Mace = __webpack_require__(28);

var _Mace2 = _interopRequireDefault(_Mace);

var _Spear = __webpack_require__(29);

var _Spear2 = _interopRequireDefault(_Spear);

var _Armor_ = __webpack_require__(30);

var _Armor_2 = _interopRequireDefault(_Armor_);

var _Armor_3 = __webpack_require__(31);

var _Armor_4 = _interopRequireDefault(_Armor_3);

var _Boots_ = __webpack_require__(32);

var _Boots_2 = _interopRequireDefault(_Boots_);

var _Boots_3 = __webpack_require__(33);

var _Boots_4 = _interopRequireDefault(_Boots_3);

var _Boots_5 = __webpack_require__(34);

var _Boots_6 = _interopRequireDefault(_Boots_5);

var _Helmet_ = __webpack_require__(35);

var _Helmet_2 = _interopRequireDefault(_Helmet_);

var _Helmet_3 = __webpack_require__(36);

var _Helmet_4 = _interopRequireDefault(_Helmet_3);

var _Coin = __webpack_require__(37);

var _Coin2 = _interopRequireDefault(_Coin);

var _Health_bottle_ = __webpack_require__(38);

var _Health_bottle_2 = _interopRequireDefault(_Health_bottle_);

var _Health_bottle_3 = __webpack_require__(39);

var _Health_bottle_4 = _interopRequireDefault(_Health_bottle_3);

var _Health_bottle_5 = __webpack_require__(40);

var _Health_bottle_6 = _interopRequireDefault(_Health_bottle_5);

var _Health_bottle_7 = __webpack_require__(41);

var _Health_bottle_8 = _interopRequireDefault(_Health_bottle_7);

var _Empty_bottle_ = __webpack_require__(42);

var _Empty_bottle_2 = _interopRequireDefault(_Empty_bottle_);

var _Empty_bottle_3 = __webpack_require__(43);

var _Empty_bottle_4 = _interopRequireDefault(_Empty_bottle_3);

var _Empty_bottle_5 = __webpack_require__(44);

var _Empty_bottle_6 = _interopRequireDefault(_Empty_bottle_5);

var _Empty_bottle_7 = __webpack_require__(45);

var _Empty_bottle_8 = _interopRequireDefault(_Empty_bottle_7);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

// inventoryItems


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
            document.onmousemove = function (event) {
                this.onMouseMove(event);
            }.bind(this);
            document.onmousedown = function (event) {
                this.onMouseDown(event);
            }.bind(this);
            document.onmouseup = function (event) {
                this.onMouseUp(event);
            }.bind(this);
            window.requestAnimationFrame(function (elapsed) {
                this.draw(elapsed);
            }.bind(this));
            //window.oncontextmenu = function () {
            //    this.showCustomMenu();
            //    return false; // cancel default menu
            //}.bind(this);
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
            inventoryObjects.push(new _Sword_2.default(this.Loader, 5));
            inventoryObjects.push(new _Sword_4.default(this.Loader, 5));
            inventoryObjects.push(new _Sword_6.default(this.Loader, 5));
            inventoryObjects.push(new _Shield_2.default(this.Loader, 5));
            inventoryObjects.push(new _Shield_4.default(this.Loader, 5));
            inventoryObjects.push(new _Shield_6.default(this.Loader, 5));
            inventoryObjects.push(new _Shield_8.default(this.Loader, 5));
            inventoryObjects.push(new _Axe_2.default(this.Loader, 5));
            inventoryObjects.push(new _Axe_4.default(this.Loader, 5));
            inventoryObjects.push(new _Axe_6.default(this.Loader, 5));
            inventoryObjects.push(new _Bow_2.default(this.Loader, 5));
            inventoryObjects.push(new _Bow_4.default(this.Loader, 5));
            inventoryObjects.push(new _Bow_6.default(this.Loader, 5));
            inventoryObjects.push(new _Mace2.default(this.Loader, 5));
            inventoryObjects.push(new _Spear2.default(this.Loader, 5));
            inventoryObjects.push(new _Armor_2.default(this.Loader, 5));
            inventoryObjects.push(new _Armor_4.default(this.Loader, 5));
            inventoryObjects.push(new _Boots_2.default(this.Loader, 5));
            inventoryObjects.push(new _Boots_4.default(this.Loader, 5));
            inventoryObjects.push(new _Boots_6.default(this.Loader, 5));
            inventoryObjects.push(new _Helmet_2.default(this.Loader, 5));
            inventoryObjects.push(new _Helmet_4.default(this.Loader, 5));
            inventoryObjects.push(new _Coin2.default(this.Loader, 500));
            inventoryObjects.push(new _Health_bottle_2.default(this.Loader, 5));
            inventoryObjects.push(new _Health_bottle_4.default(this.Loader, 5));
            inventoryObjects.push(new _Health_bottle_6.default(this.Loader, 5));
            inventoryObjects.push(new _Health_bottle_8.default(this.Loader, 5));
            inventoryObjects.push(new _Empty_bottle_2.default(this.Loader, 5));
            inventoryObjects.push(new _Empty_bottle_4.default(this.Loader, 5));
            inventoryObjects.push(new _Empty_bottle_6.default(this.Loader, 5));
            inventoryObjects.push(new _Empty_bottle_8.default(this.Loader, 5));
            this.InventoryManager = new _InventoryManager2.default(inventoryObjects, this.Loader);
        }

        // send map in this

    }, {
        key: "init",
        value: function init() {
            this.Keyboard = new _Keyboard2.default(this);
            this.Keyboard.listenForEvents([this.Keyboard.LEFT, this.Keyboard.RIGHT, this.Keyboard.UP, this.Keyboard.DOWN, this.Keyboard.A, this.Keyboard.D, this.Keyboard.W, this.Keyboard.S], [this.Keyboard.E, this.Keyboard.R]);

            this.tileAtlas = this.Loader.getImage('tiles');
            this.hero = new _Hero2.default(this.map, 50 * this.map.drawSize, 50 * this.map.drawSize, this.Loader);
            this.camera = new _Camera2.default(this.map, window.innerWidth, window.innerHeight);

            this.map.loadMap('../../assets/map/map.json', this.camera, this.hero, function (objects) {
                this.socket.emit("new_user", this.hero.getSmallObject());
                this.loadSocket(this.socket);
                this.loadNonCharacterObjects(objects, this);
            }.bind(this));
            this.events();
        }
    }, {
        key: "numPressed",
        value: function numPressed(num) {
            this.InventoryManager.numPressed(num);
        }
    }, {
        key: "keyPressed",
        value: function keyPressed(keyCode) {
            this.InventoryManager.keyPressed(keyCode, this.Keyboard);
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
                for (var _i = 0; _i < self.otherPlayers.length; _i++) {
                    if (self.otherPlayers[_i].id === hero.id) toDeleteIndex = _i;
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
            return [this.Loader.loadImage('tiles', '../../assets/map/tileset.png'), this.Loader.loadImage('hero', '../../assets/sprites/george.png'), this.Loader.loadImage('otherPlayer', '../../assets/sprites/other.png'), this.Loader.loadImage('fire', '../../assets/sprites/CampFire.png'), this.Loader.loadImage('inventoryTileSet', '../../assets/sprites/inventoryManager.png'), this.Loader.loadImage('iconbar', '../../assets/sprites/iconBar.png'), this.Loader.loadImage('characterModel', '../../assets/sprites/characterModel.png'),

            // InventoryItems
            this.Loader.loadImage('sword_1', '../../assets/sprites/inventory/W_Dagger002.png'), this.Loader.loadImage('sword_2', '../../assets/sprites/inventory/W_Dagger003.png'), this.Loader.loadImage('sword_3', '../../assets/sprites/inventory/W_Dagger005.png'), this.Loader.loadImage('shield_1', '../../assets/sprites/inventory/E_Wood01.png'), this.Loader.loadImage('shield_2', '../../assets/sprites/inventory/E_Wood02.png'), this.Loader.loadImage('shield_3', '../../assets/sprites/inventory/E_Wood03.png'), this.Loader.loadImage('shield_4', '../../assets/sprites/inventory/E_Metal04.png'), this.Loader.loadImage('axe_1', '../../assets/sprites/inventory/W_Axe001.png'), this.Loader.loadImage('axe_2', '../../assets/sprites/inventory/W_Axe002.png'), this.Loader.loadImage('axe_3', '../../assets/sprites/inventory/W_Axe007.png'), this.Loader.loadImage('bow_1', '../../assets/sprites/inventory/W_Bow01.png'), this.Loader.loadImage('bow_2', '../../assets/sprites/inventory/W_Bow04.png'), this.Loader.loadImage('bow_3', '../../assets/sprites/inventory/W_Bow05.png'), this.Loader.loadImage('mace', '../../assets/sprites/inventory/W_Mace005.png'), this.Loader.loadImage('spear', '../../assets/sprites/inventory/W_Spear001.png'), this.Loader.loadImage('armor_1', '../../assets/sprites/inventory/A_Armor04.png'), this.Loader.loadImage('armor_2', '../../assets/sprites/inventory/A_Armour02.png'), this.Loader.loadImage('boots_1', '../../assets/sprites/inventory/A_Shoes01.png'), this.Loader.loadImage('boots_2', '../../assets/sprites/inventory/A_Shoes03.png'), this.Loader.loadImage('boots_3', '../../assets/sprites/inventory/A_Shoes04.png'), this.Loader.loadImage('helmet_1', '../../assets/sprites/inventory/C_Elm01.png'), this.Loader.loadImage('helmet_2', '../../assets/sprites/inventory/C_Elm03.png'), this.Loader.loadImage('health_bottle_1', '../../assets/sprites/inventory/P_Red04.png'), this.Loader.loadImage('health_bottle_2', '../../assets/sprites/inventory/P_Red02.png'), this.Loader.loadImage('health_bottle_3', '../../assets/sprites/inventory/P_Red03.png'), this.Loader.loadImage('health_bottle_4', '../../assets/sprites/inventory/P_Red01.png'), this.Loader.loadImage('empty_bottle_1', '../../assets/sprites/inventory/I_Bottle01.png'), this.Loader.loadImage('empty_bottle_2', '../../assets/sprites/inventory/I_Bottle02.png'), this.Loader.loadImage('empty_bottle_3', '../../assets/sprites/inventory/I_Bottle04.png'), this.Loader.loadImage('empty_bottle_4', '../../assets/sprites/inventory/I_Bottle03.png'), this.Loader.loadImage('coin', '../../assets/sprites/inventory/I_GoldCoin.png')];
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

            var _loop = function _loop(_i2) {
                _this3._drawLayer(_i2);

                _this3.otherPlayers.forEach(function (player) {
                    var thisLayersUnder = _this3.getLayersUnder(player.tileLevel);
                    if (thisLayersUnder - 1 === _i2) {
                        player.draw(_this3.ctx, _this3.camera.getScreenX(player.x), _this3.camera.getScreenY(player.y));
                    }
                });
            };

            for (var _i2 = 0; _i2 < layersUnderPlayer; _i2++) {
                _loop(_i2);
            }

            // draw main character
            this.hero.draw(this.ctx);

            this.nonCharacterObjects.forEach(function (thisObject) {
                thisObject.draw(_this3.ctx, _this3.camera.getScreenX(thisObject.x), _this3.camera.getScreenY(thisObject.y));
            });

            // draw map top layer

            var _loop2 = function _loop2(_i3) {
                _this3._drawLayer(_i3);

                _this3.otherPlayers.forEach(function (player) {
                    var thisLayersUnder = _this3.getLayersUnder(player.tileLevel);
                    if (thisLayersUnder - 1 === _i3) {
                        player.draw(_this3.ctx, _this3.camera.getScreenX(player.x), _this3.camera.getScreenY(player.y));
                    }
                });
            };

            for (var _i3 = layersUnderPlayer; _i3 < totalLayers - 1; _i3++) {
                _loop2(_i3);
            }

            this.ctx.globalAlpha = 0.5;
            this._drawLayer(totalLayers - 1);

            this.ctx.globalAlpha = 1;
            this.InventoryManager.draw(this.ctx, this.ctx.width * 0.7, 0, this.ctx.width * 0.3, this.ctx.width * 0.36, this.ctx.width * 0.3, 0);
            this._drawUI(delta);
        }
    }, {
        key: "onMouseDown",
        value: function onMouseDown(event) {
            var mousePosition = {
                x: event.pageX,
                y: event.pageY
            };
            this.InventoryManager.onMouseDown(mousePosition);
        }
    }, {
        key: "onMouseUp",
        value: function onMouseUp(event) {
            var mousePosition = {
                x: event.pageX,
                y: event.pageY
            };
            this.InventoryManager.onMouseUp(mousePosition);
        }
    }, {
        key: "onMouseMove",
        value: function onMouseMove(event) {
            var mousePosition = {
                x: event.pageX,
                y: event.pageY
            };
            this.InventoryManager.onMouseMove(mousePosition);
        }
    }, {
        key: "events",
        value: function events() {
            document.addEventListener("keypress", function (event) {
                if (event.key === 'f') {
                    this.fullscreen();
                }
            }, this);
            document.addEventListener("fullscreenchange", function () {
                this.fullscreenState = document.fullscreen;
            }, this);

            document.addEventListener("mozfullscreenchange", function () {
                this.fullscreenState = document.mozFullScreen;
            }, this);

            document.addEventListener("webkitfullscreenchange", function () {
                this.fullscreenState = document.webkitIsFullScreen;
            }, this);

            document.addEventListener("msfullscreenchange", function () {
                this.fullscreenState = document.msFullscreenElement;
            }, this);
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
    function Keyboard(mainGameState) {
        _classCallCheck(this, Keyboard);

        this.mainGameState = mainGameState;
        this.LEFT = 37;
        this.RIGHT = 39;
        this.UP = 38;
        this.DOWN = 40;
        this.W = 87;
        this.A = 65;
        this.S = 83;
        this.D = 68;
        this.F = 70;
        this.E = 69;
        this.R = 82;
        this._nums = [];
        for (var i = 0; i <= 9; i++) {
            this._nums.push({
                key: 48 + i,
                num: i,
                isDown: false
            });
            this._nums.push({ // numpad
                key: 96 + i,
                num: i,
                isDown: false
            });
        }
        this._keys = {};
        this._callbackKeys = {};
    }

    _createClass(Keyboard, [{
        key: 'listenForEvents',
        value: function listenForEvents(keys, callbackKeys) {
            window.addEventListener('keydown', this._onKeyDown.bind(this));
            window.addEventListener('keyup', this._onKeyUp.bind(this));

            callbackKeys.forEach(function (key) {
                this._callbackKeys[key] = false;
            }.bind(this));
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
            } else if (keyCode in this._callbackKeys) {
                event.preventDefault();
                if (!this._callbackKeys[keyCode]) {
                    this._callbackKeys[keyCode] = true;
                    this.mainGameState.keyPressed(keyCode);
                }
            } else {
                var self = this;
                this._nums.forEach(function (num) {
                    if (num.key === keyCode) {
                        event.preventDefault();
                        if (!num.isDown) {
                            num.isDown = true;
                            self.mainGameState.numPressed(num.num);
                        }
                    }
                });
            }
        }
    }, {
        key: '_onKeyUp',
        value: function _onKeyUp(event) {
            var keyCode = event.keyCode;
            //console.log('key pressed: ' + keyCode);
            if (keyCode in this._keys) {
                event.preventDefault();
                this._keys[keyCode] = false;
            } else if (keyCode in this._callbackKeys) {
                event.preventDefault();
                this._callbackKeys[keyCode] = false;
            } else {
                this._nums.forEach(function (num) {
                    if (num.key === keyCode) num.isDown = false;
                });
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
/* 10 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _InventoryIcon = __webpack_require__(11);

var _InventoryIcon2 = _interopRequireDefault(_InventoryIcon);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var InventoryManager = function () {
    function InventoryManager(inventoryObjects, Loader) {
        var _this = this;

        _classCallCheck(this, InventoryManager);

        this.inventory = [];
        var i = 0;
        inventoryObjects.forEach(function (inventoryObject) {
            _this.inventory.forEach(function (oldObject) {
                if (inventoryObject.stackCount > 0) {
                    if (oldObject.typeId === inventoryObject.typeId && oldObject.stackCount < oldObject.stackLimit) {
                        var max = oldObject.stackLimit - oldObject.stackCount;
                        if (inventoryObject.stackCount > max) {
                            inventoryObject.stackCount -= max;
                            oldObject.stackCount += max;
                        } else {
                            oldObject.stackCount += inventoryObject.stackCount;
                            inventoryObject.stackCount = 0;
                        }
                    }
                }
            });
            if (inventoryObject.stackCount > 0) {
                inventoryObject.shownLocation = i;
                inventoryObject.inventoryLocation = i++;
                _this.inventory.push(inventoryObject);
            }
        });

        //this.inventory = inventoryObjects;
        //let i = 0;
        //this.inventory.forEach(inventoryObject => {
        //    inventoryObject.shownLocation = i;
        //    inventoryObject.inventoryLocation = i++;
        //});

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
            CHARACTER: 2,
            COMBAT: 3
        };
        this.iconBar = [];
        this.iconBar.push(new _InventoryIcon2.default(this.STATES.INVENTORY, this.imageIconBar, 1, this.tileIconBarHeight));
        this.iconBar.push(new _InventoryIcon2.default(this.STATES.CHARACTER, this.imageIconBar, 2, this.tileIconBarHeight));

        this.actionBarIcons = [];
        for (var _i = 1; _i <= 10; _i++) {
            this.actionBarIcons.push(new _InventoryIcon2.default(_i === 10 ? 0 : _i, this.imageIconBar, 0, this.tileIconBarHeight));
            if (this.selectedAction === (_i === 10 ? 0 : _i)) this.actionBarIcons[_i === 10 ? 0 : _i].isSelected = true;
        }

        this.state = this.STATES.HIDDEN;
    }

    _createClass(InventoryManager, [{
        key: "numPressed",
        value: function numPressed(num) {
            if (num >= 0 && num <= 9) {
                this.actionBarIcons.forEach(function (actionIcon) {
                    if (actionIcon.state === num) {
                        actionIcon.isSelected = true;
                    } else {
                        actionIcon.isSelected = false;
                    }
                });
            }
        }
    }, {
        key: "keyPressed",
        value: function keyPressed(keyCode, keyboard) {
            var _this2 = this;

            var checkState = this.STATES.HIDDEN;

            if (keyCode === keyboard.E) {
                checkState = this.STATES.INVENTORY;
            } else if (keyCode === keyboard.R) {
                checkState = this.STATES.CHARACTER;
            }
            this.iconBar.forEach(function (icon) {
                if (icon.state === checkState) {
                    var oldState = _this2.state;
                    if (icon.isSelected) {
                        icon.isSelected = false;
                        _this2.state = _this2.STATES.HIDDEN;
                    } else {
                        _this2.state = icon.state;
                        icon.isSelected = true;
                    }
                    if (oldState != _this2.state) {
                        _this2.iconBar.forEach(function (icon) {
                            if (icon.state != _this2.state) {
                                icon.isSelected = false;
                            }
                        });
                    }
                }
            });
        }
    }, {
        key: "update",
        value: function update(delta) {
            var anyUnequiped = false;
            var allInventoryPositions = [];
            this.inventory.forEach(function (inventoryObject) {
                if (inventoryObject.inventoryLocation === -2) {
                    anyUnequiped = true;
                }
            });
            if (anyUnequiped) {
                for (var i = this.iterations * this.iterations - 1; i >= 0; i--) {
                    allInventoryPositions.push(i);
                }
                this.inventory.forEach(function (inventoryObject) {
                    if (allInventoryPositions.indexOf(inventoryObject.inventoryLocation) >= 0) {
                        allInventoryPositions.splice(allInventoryPositions.indexOf(inventoryObject.inventoryLocation), 1);
                    }
                });
            }
            this.inventory.forEach(function (inventoryObject) {
                inventoryObject.update(delta, allInventoryPositions);
            });
        }
    }, {
        key: "addObject",
        value: function addObject(object) {
            this.inventory.push(object);
        }
    }, {
        key: "isInInventory",
        value: function isInInventory(x, y) {
            return this.xIcon < x && this.xIcon + this.widthIcon > x && this.yIcon < y && this.yIcon + this.heightIcon > y;
        }
    }, {
        key: "isInActionBar",
        value: function isInActionBar(x, y) {
            return this.xAction < x && this.xAction + this.widthAction > x && this.yAction < y && this.yAction + this.heightAction > y;
        }
    }, {
        key: "onMouseDown",
        value: function onMouseDown(mousePosition) {
            var _this3 = this;

            this.inventory.forEach(function (inventoryObject) {
                if (inventoryObject.isEquiped && _this3.state === _this3.STATES.CHARACTER || !inventoryObject.isEquiped && _this3.state === _this3.STATES.INVENTORY) {
                    inventoryObject.onMouseDown(mousePosition);
                }
            });

            this.mousePosition = mousePosition;
            this.movingObject = false;
        }
    }, {
        key: "onMouseUp",
        value: function onMouseUp(mousePosition) {
            var _this4 = this;

            if (this.movingObject) {
                if (this.isInActionBar(mousePosition.x, mousePosition.y)) {
                    this.moveAction(mousePosition, true);
                } else {
                    this.moveInventory(mousePosition, true);
                }
            } else if (!this.isInActionBar(mousePosition.x, mousePosition.y)) {
                this.equipObject();
            }

            if (!this.movingObject) {
                var oldState = this.state;
                var oldSelectedAction = this.selectedAction;
                this.iconBar.forEach(function (icon) {
                    if (icon.onMouseMove(mousePosition)) {
                        if (icon.isSelected) {
                            icon.isSelected = false;
                            _this4.state = _this4.STATES.HIDDEN;
                        } else {
                            _this4.state = icon.state;
                            icon.isSelected = true;
                        }
                    }
                });
                if (oldState != this.state) {
                    this.iconBar.forEach(function (icon) {
                        if (icon.state != _this4.state) {
                            icon.isSelected = false;
                        }
                    });
                }
                this.actionBarIcons.forEach(function (icon) {
                    if (icon.onMouseMove(mousePosition)) {
                        icon.isSelected = true;
                        _this4.selectedAction = icon.state;
                    }
                });
                if (this.selectedAction !== oldSelectedAction) {
                    this.actionBarIcons.forEach(function (icon) {
                        if (_this4.selectedAction !== icon.state) {
                            icon.isSelected = false;
                        }
                    });
                }
            }
            this.inventory.forEach(function (inventoryObject) {
                inventoryObject.onMouseUp(mousePosition);
            });
        }
    }, {
        key: "onMouseMove",
        value: function onMouseMove(mousePosition, mousePressed) {
            var _this5 = this;

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
                    if (!inventoryObject.isInObject(mousePosition.x, mousePosition.y)) {
                        _this5.movingObject = true;
                    }
                }
            });
            this.mousePosition = mousePosition;
            if (isHolding) {
                if (this.isInActionBar(mousePosition.x, mousePosition.y)) {
                    this.moveAction(mousePosition, false);
                } else {
                    this.moveInventory(mousePosition, false);
                }
            }
        }
    }, {
        key: "moveInventory",
        value: function moveInventory(mousePosition, binding) {
            var drawWidth = this.widthIcon / (this.iterations + 1);
            var drawHeight = (this.heightIcon - this.yTop) / (this.iterations + 1);
            var tempX = Math.floor((mousePosition.x - this.xIcon - drawWidth / 2) / drawWidth);
            var tempY = Math.floor((mousePosition.y - this.yIcon - drawHeight / 2) / drawHeight);

            if (tempX < 0) tempX = 0;else if (tempX > this.iterations - 1) tempX = this.iterations - 1;
            if (tempY < 0) tempY = 0;else if (tempY > this.iterations - 1) tempY = this.iterations - 1;

            var originalPosition = void 0;
            var untilPosition = void 0;

            this.inventory.forEach(function (inventoryObject) {
                // Get original position
                if (inventoryObject.isHolding) {
                    originalPosition = inventoryObject.inventoryLocation;
                    //console.log(originalPosition + ", " + position);
                }
            });

            var position = tempX + tempY * this.iterations;

            var positionsBetween = [];

            if (position !== originalPosition) {
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
            }

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
                        inventoryObject.actionLocation = -1;
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
                        if (inventoryObject.inventoryLocation >= 0) {
                            inventoryObject.actionLocation = -1;
                        }
                    }
                }
            });
        }
    }, {
        key: "moveAction",
        value: function moveAction(mousePosition, binding) {
            var drawWidth = this.widthAction / 10;
            var drawHeight = this.heightAction;
            var position = Math.floor((mousePosition.x - this.xAction) / drawWidth);
            var originalPosition = 0;
            var objectAtPosition = null;

            this.inventory.forEach(function (inventoryObject) {
                // Get original position
                if (inventoryObject.isHolding) {
                    originalPosition = inventoryObject.actionLocation;
                } else if (inventoryObject.actionLocation === position) {
                    objectAtPosition = inventoryObject;
                }
            });

            if (position < 0) position = 0;
            if (position > 9) position = 9;

            if (binding) {
                this.inventory.forEach(function (inventoryObject) {
                    // Get original position
                    if (inventoryObject.isHolding) {
                        if (objectAtPosition !== null) {
                            var t = inventoryObject.actionLocation;
                            inventoryObject.actionLocation = objectAtPosition.actionLocation;
                            objectAtPosition.actionLocation = t;
                            t = inventoryObject.inventoryLocation;
                            inventoryObject.inventoryLocation = objectAtPosition.inventoryLocation;
                            inventoryObject.shownLocation = objectAtPosition.inventoryLocation;
                            objectAtPosition.inventoryLocation = t;
                            objectAtPosition.shownLocation = t;
                        } else {
                            inventoryObject.actionLocation = position;
                            inventoryObject.inventoryLocation = -1;
                            inventoryObject.shownLocation = -1;
                        }
                    }
                });
            }
        }
    }, {
        key: "equipObject",
        value: function equipObject() {
            var toEquip = null;
            this.inventory.forEach(function (inventoryObject) {
                if (inventoryObject.isHolding && inventoryObject.isEquipable) {
                    toEquip = inventoryObject;
                }
            });
            if (toEquip !== null) {
                this.inventory.forEach(function (inventoryObject) {
                    if (!inventoryObject.isHolding && inventoryObject.isEquiped && inventoryObject.area === toEquip.area) {
                        inventoryObject.setEquiped(false, toEquip.inventoryLocation);
                    }
                });
                toEquip.setEquiped(true, -1);
            }
        }
    }, {
        key: "draw",
        value: function draw(ctx, xIcon, yIcon, width, height, xAction, yAction) {
            var drawWidth = Math.round(width / this.iterations * 5) / 5;
            var drawHeight = Math.round(height / (this.iterations + 1));
            this.yTop = yIcon + drawHeight;

            this.xIcon = xIcon;
            this.yIcon = this.yTop;
            this.widthIcon = width;
            this.heightIcon = height;
            this.xAction = xAction;
            this.yAction = yAction;
            this.widthAction = drawWidth * 10;
            this.heightAction = drawHeight;

            this.drawActionBar(ctx, xAction, yAction, drawWidth * 10, drawHeight);
            this.drawActionBarItems(ctx, xAction, yAction, drawWidth, drawHeight);

            if (this.state !== this.STATES.HIDDEN) {
                this.drawBack(ctx, xIcon, this.yTop, drawWidth, drawHeight, this.iterations);
                if (this.state === this.STATES.CHARACTER) {
                    ctx.drawImage(this.imageCharacter, xIcon, this.yTop, drawWidth * this.iterations, drawHeight * this.iterations);
                    this.drawCharacter(ctx, xIcon, this.yTop, drawWidth, drawHeight);
                } else if (this.state === this.STATES.INVENTORY) {
                    this.drawInventory(ctx, xIcon + drawWidth / 2, this.yTop + drawHeight / 2, drawWidth / this.iterations * (this.iterations - 1), drawHeight / this.iterations * (this.iterations - 1), this.iterations);
                }
            }

            this.drawIconBar(ctx, xIcon, yIcon, drawWidth, drawHeight);
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
        key: "drawCharacter",
        value: function drawCharacter(ctx, x, y, drawWidth, drawHeight) {
            this.inventory.forEach(function (inventoryObject) {
                if (inventoryObject.isEquiped) {
                    switch (inventoryObject.area) {
                        case inventoryObject.AREAS.OFF_HAND:
                            inventoryObject.draw(ctx, x + drawWidth, y + 5 * drawHeight, drawWidth, drawHeight);
                            break;
                        case inventoryObject.AREAS.BOOTS:
                            inventoryObject.draw(ctx, x + 3.5 * drawWidth, y + 6.5 * drawHeight, drawWidth, drawHeight);
                            break;
                        case inventoryObject.AREAS.HEAD:
                            inventoryObject.draw(ctx, x + 3.5 * drawWidth, y + 0.5 * drawHeight, drawWidth, drawHeight);
                            break;
                        case inventoryObject.AREAS.BODY:
                            inventoryObject.draw(ctx, x + 6 * drawWidth, y + 5 * drawHeight, drawWidth, drawHeight);
                            break;
                    }
                }
            });
        }
    }, {
        key: "drawInventory",
        value: function drawInventory(ctx, x, y, drawWidth, drawHeight, iterations) {
            var _this6 = this;

            this.inventory.forEach(function (inventoryObject) {
                if (!(inventoryObject.isHolding && _this6.movingObject) && inventoryObject.shownLocation >= 0) {
                    var drawX = x + Math.floor(inventoryObject.shownLocation % iterations) * drawWidth;
                    var drawY = y + Math.floor(inventoryObject.shownLocation / iterations) * drawHeight;
                    inventoryObject.draw(ctx, drawX, drawY, drawWidth, drawHeight);
                    if (inventoryObject.stackCount != 1) {
                        ctx.font = "22px Arial";
                        ctx.fillStyle = "white";
                        ctx.fillText(inventoryObject.stackCount, drawX, drawY + drawHeight);
                    }
                }
            });
            this.inventory.forEach(function (inventoryObject) {
                // Draw the held object on top of the others
                if (inventoryObject.isHolding && _this6.movingObject) {
                    var drawX = _this6.mousePosition.x;
                    var drawY = _this6.mousePosition.y;
                    inventoryObject.draw(ctx, drawX, drawY, drawWidth, drawHeight);
                    if (inventoryObject.stackCount != 1) {
                        ctx.font = "22px Arial";
                        ctx.fillStyle = "white";
                        ctx.fillText(inventoryObject.stackCount, drawX, drawY + drawHeight);
                    }
                }
            });
        }
    }, {
        key: "drawActionBarItems",
        value: function drawActionBarItems(ctx, x, y, drawWidth, drawHeight, iterations) {
            var _this7 = this;

            this.inventory.forEach(function (inventoryObject) {
                if (!(inventoryObject.isHolding && _this7.movingObject) && inventoryObject.actionLocation >= 0) {
                    var drawX = x + Math.floor(inventoryObject.actionLocation) * drawWidth;
                    var drawY = y;
                    inventoryObject.draw(ctx, drawX, drawY, drawWidth, drawHeight);
                    if (inventoryObject.stackCount != 1) {
                        ctx.font = "22px Arial";
                        ctx.fillStyle = "white";
                        ctx.fillText(inventoryObject.stackCount, drawX, drawY + drawHeight);
                    }
                }
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
                ctx.fillText(this.actionBarIcons[i].state, drawX + dx / 2 + i * dx, y + drawHeight / 2);
            }
        }
    }]);

    return InventoryManager;
}();

exports.default = InventoryManager;

/***/ }),
/* 11 */
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
            if (this.isSelected) {
                tileY += 2;
            }
            if (this.mouseOver) {
                tileY += 1;
            }

            //if (this.isSelected && this.mouseOver) {
            //    tileY = 3;
            //} else if (this.isSelected) {
            //    tileY = 2;
            //} else if (this.mouseOver) {
            //    tileY = 1;
            //}

            ctx.drawImage(this.image, this.tileX * this.tileWidth, tileY * this.tileWidth, this.tileWidth, this.tileWidth, x, y, width, height);
        }
    }]);

    return InventoryIcon;
}();

exports.default = InventoryIcon;

/***/ }),
/* 12 */
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
/* 13 */
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
/* 14 */
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
/* 15 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});

var _InventoryObjectBase = __webpack_require__(0);

var _InventoryObjectBase2 = _interopRequireDefault(_InventoryObjectBase);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var Sword_1 = function (_InventoryObject) {
    _inherits(Sword_1, _InventoryObject);

    function Sword_1(Loader, stackCount) {
        _classCallCheck(this, Sword_1);

        //this.setEquipable(this.AREAS.ONE_HANDED, 10);
        var _this = _possibleConstructorReturn(this, (Sword_1.__proto__ || Object.getPrototypeOf(Sword_1)).call(this, "sword_1", 10, stackCount));

        _this.setImage(Loader.getImage('sword_1'));
        return _this;
    }

    return Sword_1;
}(_InventoryObjectBase2.default);

exports.default = Sword_1;

/***/ }),
/* 16 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});

var _InventoryObjectBase = __webpack_require__(0);

var _InventoryObjectBase2 = _interopRequireDefault(_InventoryObjectBase);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var Sword_2 = function (_InventoryObject) {
    _inherits(Sword_2, _InventoryObject);

    function Sword_2(Loader, stackCount) {
        _classCallCheck(this, Sword_2);

        //this.setEquipable(this.AREAS.ONE_HANDED, 10);
        var _this = _possibleConstructorReturn(this, (Sword_2.__proto__ || Object.getPrototypeOf(Sword_2)).call(this, "sword_2", 10, stackCount));

        _this.setImage(Loader.getImage('sword_2'));
        return _this;
    }

    return Sword_2;
}(_InventoryObjectBase2.default);

exports.default = Sword_2;

/***/ }),
/* 17 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});

var _InventoryObjectBase = __webpack_require__(0);

var _InventoryObjectBase2 = _interopRequireDefault(_InventoryObjectBase);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var Sword_3 = function (_InventoryObject) {
    _inherits(Sword_3, _InventoryObject);

    function Sword_3(Loader, stackCount) {
        _classCallCheck(this, Sword_3);

        //this.setEquipable(this.AREAS.ONE_HANDED, 10);
        var _this = _possibleConstructorReturn(this, (Sword_3.__proto__ || Object.getPrototypeOf(Sword_3)).call(this, "sword_3", 10, stackCount));

        _this.setImage(Loader.getImage('sword_3'));
        return _this;
    }

    return Sword_3;
}(_InventoryObjectBase2.default);

exports.default = Sword_3;

/***/ }),
/* 18 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});

var _InventoryObjectBase = __webpack_require__(0);

var _InventoryObjectBase2 = _interopRequireDefault(_InventoryObjectBase);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var Shield_1 = function (_InventoryObject) {
    _inherits(Shield_1, _InventoryObject);

    function Shield_1(Loader, stackCount) {
        _classCallCheck(this, Shield_1);

        var _this = _possibleConstructorReturn(this, (Shield_1.__proto__ || Object.getPrototypeOf(Shield_1)).call(this, "shield_1", 50, stackCount));

        _this.setEquipable(_this.AREAS.OFF_HAND, 10);
        _this.setImage(Loader.getImage('shield_1'));
        return _this;
    }

    return Shield_1;
}(_InventoryObjectBase2.default);

exports.default = Shield_1;

/***/ }),
/* 19 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});

var _InventoryObjectBase = __webpack_require__(0);

var _InventoryObjectBase2 = _interopRequireDefault(_InventoryObjectBase);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var Shield_2 = function (_InventoryObject) {
    _inherits(Shield_2, _InventoryObject);

    function Shield_2(Loader, stackCount) {
        _classCallCheck(this, Shield_2);

        var _this = _possibleConstructorReturn(this, (Shield_2.__proto__ || Object.getPrototypeOf(Shield_2)).call(this, "shield_2", 50, stackCount));

        _this.setEquipable(_this.AREAS.OFF_HAND, 10);
        _this.setImage(Loader.getImage('shield_2'));
        return _this;
    }

    return Shield_2;
}(_InventoryObjectBase2.default);

exports.default = Shield_2;

/***/ }),
/* 20 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});

var _InventoryObjectBase = __webpack_require__(0);

var _InventoryObjectBase2 = _interopRequireDefault(_InventoryObjectBase);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var Shield_3 = function (_InventoryObject) {
    _inherits(Shield_3, _InventoryObject);

    function Shield_3(Loader, stackCount) {
        _classCallCheck(this, Shield_3);

        var _this = _possibleConstructorReturn(this, (Shield_3.__proto__ || Object.getPrototypeOf(Shield_3)).call(this, "shield_3", 50, stackCount));

        _this.setEquipable(_this.AREAS.OFF_HAND, 10);
        _this.setImage(Loader.getImage('shield_3'));
        return _this;
    }

    return Shield_3;
}(_InventoryObjectBase2.default);

exports.default = Shield_3;

/***/ }),
/* 21 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});

var _InventoryObjectBase = __webpack_require__(0);

var _InventoryObjectBase2 = _interopRequireDefault(_InventoryObjectBase);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var Shield_4 = function (_InventoryObject) {
    _inherits(Shield_4, _InventoryObject);

    function Shield_4(Loader, stackCount) {
        _classCallCheck(this, Shield_4);

        var _this = _possibleConstructorReturn(this, (Shield_4.__proto__ || Object.getPrototypeOf(Shield_4)).call(this, "shield_4", 50, stackCount));

        _this.setEquipable(_this.AREAS.OFF_HAND, 10);
        _this.setTilesImage(Loader.getImage('shield_4'), 4, 4, 16);
        return _this;
    }

    return Shield_4;
}(_InventoryObjectBase2.default);

exports.default = Shield_4;

/***/ }),
/* 22 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});

var _InventoryObjectBase = __webpack_require__(0);

var _InventoryObjectBase2 = _interopRequireDefault(_InventoryObjectBase);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var Axe_1 = function (_InventoryObject) {
    _inherits(Axe_1, _InventoryObject);

    function Axe_1(Loader, stackCount) {
        _classCallCheck(this, Axe_1);

        var _this = _possibleConstructorReturn(this, (Axe_1.__proto__ || Object.getPrototypeOf(Axe_1)).call(this, "axe_1", 10, stackCount));

        _this.setImage(Loader.getImage('axe_1'));
        return _this;
    }

    return Axe_1;
}(_InventoryObjectBase2.default);

exports.default = Axe_1;

/***/ }),
/* 23 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});

var _InventoryObjectBase = __webpack_require__(0);

var _InventoryObjectBase2 = _interopRequireDefault(_InventoryObjectBase);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var Axe_2 = function (_InventoryObject) {
    _inherits(Axe_2, _InventoryObject);

    function Axe_2(Loader, stackCount) {
        _classCallCheck(this, Axe_2);

        var _this = _possibleConstructorReturn(this, (Axe_2.__proto__ || Object.getPrototypeOf(Axe_2)).call(this, "axe_2", 10, stackCount));

        _this.setImage(Loader.getImage('axe_2'));
        return _this;
    }

    return Axe_2;
}(_InventoryObjectBase2.default);

exports.default = Axe_2;

/***/ }),
/* 24 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});

var _InventoryObjectBase = __webpack_require__(0);

var _InventoryObjectBase2 = _interopRequireDefault(_InventoryObjectBase);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var Axe_3 = function (_InventoryObject) {
    _inherits(Axe_3, _InventoryObject);

    function Axe_3(Loader, stackCount) {
        _classCallCheck(this, Axe_3);

        var _this = _possibleConstructorReturn(this, (Axe_3.__proto__ || Object.getPrototypeOf(Axe_3)).call(this, "axe_3", 10, stackCount));

        _this.setImage(Loader.getImage('axe_3'));
        return _this;
    }

    return Axe_3;
}(_InventoryObjectBase2.default);

exports.default = Axe_3;

/***/ }),
/* 25 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});

var _InventoryObjectBase = __webpack_require__(0);

var _InventoryObjectBase2 = _interopRequireDefault(_InventoryObjectBase);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var Bow_1 = function (_InventoryObject) {
    _inherits(Bow_1, _InventoryObject);

    function Bow_1(Loader, stackCount) {
        _classCallCheck(this, Bow_1);

        var _this = _possibleConstructorReturn(this, (Bow_1.__proto__ || Object.getPrototypeOf(Bow_1)).call(this, "bow_1", 10, stackCount));

        _this.setImage(Loader.getImage('bow_1'));
        return _this;
    }

    return Bow_1;
}(_InventoryObjectBase2.default);

exports.default = Bow_1;

/***/ }),
/* 26 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});

var _InventoryObjectBase = __webpack_require__(0);

var _InventoryObjectBase2 = _interopRequireDefault(_InventoryObjectBase);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var Bow_2 = function (_InventoryObject) {
    _inherits(Bow_2, _InventoryObject);

    function Bow_2(Loader, stackCount) {
        _classCallCheck(this, Bow_2);

        var _this = _possibleConstructorReturn(this, (Bow_2.__proto__ || Object.getPrototypeOf(Bow_2)).call(this, "bow_2", 10, stackCount));

        _this.setImage(Loader.getImage('bow_2'));
        return _this;
    }

    return Bow_2;
}(_InventoryObjectBase2.default);

exports.default = Bow_2;

/***/ }),
/* 27 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});

var _InventoryObjectBase = __webpack_require__(0);

var _InventoryObjectBase2 = _interopRequireDefault(_InventoryObjectBase);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var Bow_3 = function (_InventoryObject) {
    _inherits(Bow_3, _InventoryObject);

    function Bow_3(Loader, stackCount) {
        _classCallCheck(this, Bow_3);

        var _this = _possibleConstructorReturn(this, (Bow_3.__proto__ || Object.getPrototypeOf(Bow_3)).call(this, "bow_3", 10, stackCount));

        _this.setImage(Loader.getImage('bow_3'));
        return _this;
    }

    return Bow_3;
}(_InventoryObjectBase2.default);

exports.default = Bow_3;

/***/ }),
/* 28 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});

var _InventoryObjectBase = __webpack_require__(0);

var _InventoryObjectBase2 = _interopRequireDefault(_InventoryObjectBase);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var Mace = function (_InventoryObject) {
    _inherits(Mace, _InventoryObject);

    function Mace(Loader, stackCount) {
        _classCallCheck(this, Mace);

        var _this = _possibleConstructorReturn(this, (Mace.__proto__ || Object.getPrototypeOf(Mace)).call(this, "mace", 10, stackCount));

        _this.setImage(Loader.getImage('mace'));
        return _this;
    }

    return Mace;
}(_InventoryObjectBase2.default);

exports.default = Mace;

/***/ }),
/* 29 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});

var _InventoryObjectBase = __webpack_require__(0);

var _InventoryObjectBase2 = _interopRequireDefault(_InventoryObjectBase);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var Spear = function (_InventoryObject) {
    _inherits(Spear, _InventoryObject);

    function Spear(Loader, stackCount) {
        _classCallCheck(this, Spear);

        var _this = _possibleConstructorReturn(this, (Spear.__proto__ || Object.getPrototypeOf(Spear)).call(this, "spear", 10, stackCount));

        _this.setImage(Loader.getImage('spear'));
        return _this;
    }

    return Spear;
}(_InventoryObjectBase2.default);

exports.default = Spear;

/***/ }),
/* 30 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});

var _InventoryObjectBase = __webpack_require__(0);

var _InventoryObjectBase2 = _interopRequireDefault(_InventoryObjectBase);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var Armor_1 = function (_InventoryObject) {
    _inherits(Armor_1, _InventoryObject);

    function Armor_1(Loader, stackCount) {
        _classCallCheck(this, Armor_1);

        var _this = _possibleConstructorReturn(this, (Armor_1.__proto__ || Object.getPrototypeOf(Armor_1)).call(this, "armor_1", 50, stackCount));

        _this.setEquipable(_this.AREAS.BODY, 10);
        _this.setImage(Loader.getImage('armor_1'));
        return _this;
    }

    return Armor_1;
}(_InventoryObjectBase2.default);

exports.default = Armor_1;

/***/ }),
/* 31 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});

var _InventoryObjectBase = __webpack_require__(0);

var _InventoryObjectBase2 = _interopRequireDefault(_InventoryObjectBase);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var Armor_2 = function (_InventoryObject) {
    _inherits(Armor_2, _InventoryObject);

    function Armor_2(Loader, stackCount) {
        _classCallCheck(this, Armor_2);

        var _this = _possibleConstructorReturn(this, (Armor_2.__proto__ || Object.getPrototypeOf(Armor_2)).call(this, "armor_2", 50, stackCount));

        _this.setEquipable(_this.AREAS.BODY, 20);
        _this.setImage(Loader.getImage('armor_2'));
        return _this;
    }

    return Armor_2;
}(_InventoryObjectBase2.default);

exports.default = Armor_2;

/***/ }),
/* 32 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});

var _InventoryObjectBase = __webpack_require__(0);

var _InventoryObjectBase2 = _interopRequireDefault(_InventoryObjectBase);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var Boots_1 = function (_InventoryObject) {
    _inherits(Boots_1, _InventoryObject);

    function Boots_1(Loader, stackCount) {
        _classCallCheck(this, Boots_1);

        var _this = _possibleConstructorReturn(this, (Boots_1.__proto__ || Object.getPrototypeOf(Boots_1)).call(this, "boots_1", 50, stackCount));

        _this.setEquipable(_this.AREAS.BOOTS, 10);
        _this.setImage(Loader.getImage('boots_1'));
        return _this;
    }

    return Boots_1;
}(_InventoryObjectBase2.default);

exports.default = Boots_1;

/***/ }),
/* 33 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});

var _InventoryObjectBase = __webpack_require__(0);

var _InventoryObjectBase2 = _interopRequireDefault(_InventoryObjectBase);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var Boots_2 = function (_InventoryObject) {
    _inherits(Boots_2, _InventoryObject);

    function Boots_2(Loader, stackCount) {
        _classCallCheck(this, Boots_2);

        var _this = _possibleConstructorReturn(this, (Boots_2.__proto__ || Object.getPrototypeOf(Boots_2)).call(this, "boots_2", 50, stackCount));

        _this.setEquipable(_this.AREAS.BOOTS, 10);
        _this.setImage(Loader.getImage('boots_2'));
        return _this;
    }

    return Boots_2;
}(_InventoryObjectBase2.default);

exports.default = Boots_2;

/***/ }),
/* 34 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});

var _InventoryObjectBase = __webpack_require__(0);

var _InventoryObjectBase2 = _interopRequireDefault(_InventoryObjectBase);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var Boots_3 = function (_InventoryObject) {
    _inherits(Boots_3, _InventoryObject);

    function Boots_3(Loader, stackCount) {
        _classCallCheck(this, Boots_3);

        var _this = _possibleConstructorReturn(this, (Boots_3.__proto__ || Object.getPrototypeOf(Boots_3)).call(this, "boots_3", 50, stackCount));

        _this.setEquipable(_this.AREAS.BOOTS, 10);
        _this.setImage(Loader.getImage('boots_3'));
        return _this;
    }

    return Boots_3;
}(_InventoryObjectBase2.default);

exports.default = Boots_3;

/***/ }),
/* 35 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});

var _InventoryObjectBase = __webpack_require__(0);

var _InventoryObjectBase2 = _interopRequireDefault(_InventoryObjectBase);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var Helmet_1 = function (_InventoryObject) {
    _inherits(Helmet_1, _InventoryObject);

    function Helmet_1(Loader, stackCount) {
        _classCallCheck(this, Helmet_1);

        var _this = _possibleConstructorReturn(this, (Helmet_1.__proto__ || Object.getPrototypeOf(Helmet_1)).call(this, "helmet_1", 50, stackCount));

        _this.setEquipable(_this.AREAS.HEAD, 10);
        _this.setImage(Loader.getImage('helmet_1'));
        return _this;
    }

    return Helmet_1;
}(_InventoryObjectBase2.default);

exports.default = Helmet_1;

/***/ }),
/* 36 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});

var _InventoryObjectBase = __webpack_require__(0);

var _InventoryObjectBase2 = _interopRequireDefault(_InventoryObjectBase);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var Helmet_2 = function (_InventoryObject) {
    _inherits(Helmet_2, _InventoryObject);

    function Helmet_2(Loader, stackCount) {
        _classCallCheck(this, Helmet_2);

        var _this = _possibleConstructorReturn(this, (Helmet_2.__proto__ || Object.getPrototypeOf(Helmet_2)).call(this, "helmet_2", 50, stackCount));

        _this.setEquipable(_this.AREAS.HEAD, 10);
        _this.setImage(Loader.getImage('helmet_2'));
        return _this;
    }

    return Helmet_2;
}(_InventoryObjectBase2.default);

exports.default = Helmet_2;

/***/ }),
/* 37 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});

var _InventoryObjectBase = __webpack_require__(0);

var _InventoryObjectBase2 = _interopRequireDefault(_InventoryObjectBase);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var Coin = function (_InventoryObject) {
    _inherits(Coin, _InventoryObject);

    function Coin(Loader, stackCount) {
        _classCallCheck(this, Coin);

        var _this = _possibleConstructorReturn(this, (Coin.__proto__ || Object.getPrototypeOf(Coin)).call(this, "coin", 999999, stackCount));

        _this.setImage(Loader.getImage('coin'));
        return _this;
    }

    return Coin;
}(_InventoryObjectBase2.default);

exports.default = Coin;

/***/ }),
/* 38 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});

var _InventoryObjectBase = __webpack_require__(0);

var _InventoryObjectBase2 = _interopRequireDefault(_InventoryObjectBase);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var Health_bottle_1 = function (_InventoryObject) {
    _inherits(Health_bottle_1, _InventoryObject);

    function Health_bottle_1(Loader, stackCount) {
        _classCallCheck(this, Health_bottle_1);

        var _this = _possibleConstructorReturn(this, (Health_bottle_1.__proto__ || Object.getPrototypeOf(Health_bottle_1)).call(this, "health_bottle_1", 50, stackCount));

        _this.setUsable(_this.USES.health, 10);
        _this.setImage(Loader.getImage('health_bottle_1'));
        return _this;
    }

    return Health_bottle_1;
}(_InventoryObjectBase2.default);

exports.default = Health_bottle_1;

/***/ }),
/* 39 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});

var _InventoryObjectBase = __webpack_require__(0);

var _InventoryObjectBase2 = _interopRequireDefault(_InventoryObjectBase);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var Health_bottle_2 = function (_InventoryObject) {
    _inherits(Health_bottle_2, _InventoryObject);

    function Health_bottle_2(Loader, stackCount) {
        _classCallCheck(this, Health_bottle_2);

        var _this = _possibleConstructorReturn(this, (Health_bottle_2.__proto__ || Object.getPrototypeOf(Health_bottle_2)).call(this, "health_bottle_2", 50, stackCount));

        _this.setUsable(_this.USES.health, 10);
        _this.setImage(Loader.getImage('health_bottle_2'));
        return _this;
    }

    return Health_bottle_2;
}(_InventoryObjectBase2.default);

exports.default = Health_bottle_2;

/***/ }),
/* 40 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});

var _InventoryObjectBase = __webpack_require__(0);

var _InventoryObjectBase2 = _interopRequireDefault(_InventoryObjectBase);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var Health_bottle_3 = function (_InventoryObject) {
    _inherits(Health_bottle_3, _InventoryObject);

    function Health_bottle_3(Loader, stackCount) {
        _classCallCheck(this, Health_bottle_3);

        var _this = _possibleConstructorReturn(this, (Health_bottle_3.__proto__ || Object.getPrototypeOf(Health_bottle_3)).call(this, "health_bottle_3", 50, stackCount));

        _this.setUsable(_this.USES.health, 10);
        _this.setImage(Loader.getImage('health_bottle_3'));
        return _this;
    }

    return Health_bottle_3;
}(_InventoryObjectBase2.default);

exports.default = Health_bottle_3;

/***/ }),
/* 41 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});

var _InventoryObjectBase = __webpack_require__(0);

var _InventoryObjectBase2 = _interopRequireDefault(_InventoryObjectBase);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var Health_bottle_4 = function (_InventoryObject) {
    _inherits(Health_bottle_4, _InventoryObject);

    function Health_bottle_4(Loader, stackCount) {
        _classCallCheck(this, Health_bottle_4);

        var _this = _possibleConstructorReturn(this, (Health_bottle_4.__proto__ || Object.getPrototypeOf(Health_bottle_4)).call(this, "health_bottle_4", 50, stackCount));

        _this.setUsable(_this.USES.health, 10);
        _this.setImage(Loader.getImage('health_bottle_4'));
        return _this;
    }

    return Health_bottle_4;
}(_InventoryObjectBase2.default);

exports.default = Health_bottle_4;

/***/ }),
/* 42 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});

var _InventoryObjectBase = __webpack_require__(0);

var _InventoryObjectBase2 = _interopRequireDefault(_InventoryObjectBase);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var Empty_bottle_1 = function (_InventoryObject) {
    _inherits(Empty_bottle_1, _InventoryObject);

    function Empty_bottle_1(Loader, stackCount) {
        _classCallCheck(this, Empty_bottle_1);

        var _this = _possibleConstructorReturn(this, (Empty_bottle_1.__proto__ || Object.getPrototypeOf(Empty_bottle_1)).call(this, "empty_bottle_1", 50, stackCount));

        _this.setImage(Loader.getImage('empty_bottle_1'));
        return _this;
    }

    return Empty_bottle_1;
}(_InventoryObjectBase2.default);

exports.default = Empty_bottle_1;

/***/ }),
/* 43 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});

var _InventoryObjectBase = __webpack_require__(0);

var _InventoryObjectBase2 = _interopRequireDefault(_InventoryObjectBase);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var Empty_bottle_2 = function (_InventoryObject) {
    _inherits(Empty_bottle_2, _InventoryObject);

    function Empty_bottle_2(Loader, stackCount) {
        _classCallCheck(this, Empty_bottle_2);

        var _this = _possibleConstructorReturn(this, (Empty_bottle_2.__proto__ || Object.getPrototypeOf(Empty_bottle_2)).call(this, "empty_bottle_2", 50, stackCount));

        _this.setImage(Loader.getImage('empty_bottle_2'));
        return _this;
    }

    return Empty_bottle_2;
}(_InventoryObjectBase2.default);

exports.default = Empty_bottle_2;

/***/ }),
/* 44 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});

var _InventoryObjectBase = __webpack_require__(0);

var _InventoryObjectBase2 = _interopRequireDefault(_InventoryObjectBase);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var Empty_bottle_3 = function (_InventoryObject) {
    _inherits(Empty_bottle_3, _InventoryObject);

    function Empty_bottle_3(Loader, stackCount) {
        _classCallCheck(this, Empty_bottle_3);

        var _this = _possibleConstructorReturn(this, (Empty_bottle_3.__proto__ || Object.getPrototypeOf(Empty_bottle_3)).call(this, "empty_bottle_3", 50, stackCount));

        _this.setImage(Loader.getImage('empty_bottle_3'));
        return _this;
    }

    return Empty_bottle_3;
}(_InventoryObjectBase2.default);

exports.default = Empty_bottle_3;

/***/ }),
/* 45 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});

var _InventoryObjectBase = __webpack_require__(0);

var _InventoryObjectBase2 = _interopRequireDefault(_InventoryObjectBase);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var Empty_bottle_4 = function (_InventoryObject) {
    _inherits(Empty_bottle_4, _InventoryObject);

    function Empty_bottle_4(Loader, stackCount) {
        _classCallCheck(this, Empty_bottle_4);

        var _this = _possibleConstructorReturn(this, (Empty_bottle_4.__proto__ || Object.getPrototypeOf(Empty_bottle_4)).call(this, "empty_bottle_4", 50, stackCount));

        _this.setImage(Loader.getImage('empty_bottle_4'));
        return _this;
    }

    return Empty_bottle_4;
}(_InventoryObjectBase2.default);

exports.default = Empty_bottle_4;

/***/ }),
/* 46 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _Fire = __webpack_require__(1);

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

exports.default = Map;

/***/ }),
/* 47 */
/***/ (function(module, exports) {

// removed by extract-text-webpack-plugin

/***/ })
/******/ ]);