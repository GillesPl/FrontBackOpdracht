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
/******/ 	return __webpack_require__(__webpack_require__.s = 40);
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

var _get = function get(object, property, receiver) { if (object === null) object = Function.prototype; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { return get(parent, property, receiver); } } else if ("value" in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } };

var _GameObjectBase = __webpack_require__(1);

var _GameObjectBase2 = _interopRequireDefault(_GameObjectBase);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var InventoryObject = function (_GameObject) {
    _inherits(InventoryObject, _GameObject);

    function InventoryObject(typeId, stackLimit, stackCount, inventoryLocation, actionLocation) {
        _classCallCheck(this, InventoryObject);

        var _this = _possibleConstructorReturn(this, (InventoryObject.__proto__ || Object.getPrototypeOf(InventoryObject)).call(this));

        _this.AREAS = {
            NONE: 0,
            HEAD: 1,
            BODY: 2,
            CAPE: 3,
            BOOTS: 4,
            ONE_HANDED: 5,
            OFF_HAND: 6
        };
        _this.USES = {
            NONE: 0,
            HEALTH: 1
        };
        _this.WEAPONTYPES = {
            NONE: 0,
            RANGED: 1,
            MELEE: 2
        };

        _this.typeId = typeId;
        _this.area = _this.AREAS.NONE;
        _this.usage = _this.USES.NONE;
        _this.weapontype = _this.WEAPONTYPES.NONE;
        _this.createObjectName = "none";
        _this.usedObject = "";
        _this.isEquipable = false;
        _this.isEquiped = false;
        _this.isUsable = false;
        _this.strength = 0;
        _this.interval = 0;
        _this.stackLimit = stackLimit;
        _this.stackCount = stackCount > stackLimit ? stackLimit : stackCount;
        _this.shownLocation = 0;
        _this.isHolding = false;
        _this.isMouseInObject = false;
        _this.mouseInObjectTime = 0;
        _this.levelRequired = 0;
        _this.inventoryLocation = inventoryLocation === undefined ? -1 : inventoryLocation;
        _this.actionLocation = actionLocation === undefined ? -1 : actionLocation;
        return _this;
    }

    _createClass(InventoryObject, [{
        key: "setEquipable",
        value: function setEquipable(area, strength, isEquiped) {
            this.isEquipable = true;
            this.area = area;
            this.strength = strength;
            this.isEquiped = false;
            if (isEquiped) {
                this.setEquiped(true, -1);
                this.shownLocation = -1;
            }
            this.isUsable = false;
        }
    }, {
        key: "setUsable",
        value: function setUsable(usage, strength, usedObject) {
            this.isUsable = true;
            this.usage = usage;
            this.strength = strength;
            this.usedObject = usedObject;
            this.isEquipable = false;
        }
    }, {
        key: "setWeapon",
        value: function setWeapon(type, strength, intervalTime, createObjectName, levelRequired) {
            this.weapontype = type;
            this.strength = strength;
            this.createObjectName = createObjectName;
            this.levelRequired = levelRequired;
            this.isUsable = false;
            this.isEquipable = false;
            this.interval = 0;
            this.intervalTime = intervalTime;
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
            //this.shownLocation = this.inventoryLocation;
        }
    }, {
        key: "onMouseMove",
        value: function onMouseMove(mousePosition) {
            this.isMouseInObject = this.isInObject(mousePosition.x, mousePosition.y);
        }
    }, {
        key: "getSmallObject",
        value: function getSmallObject() {
            var smallObject = {};
            smallObject.name = this.typeId;
            smallObject.count = this.stackCount;
            smallObject.inventoryLocation = this.inventoryLocation;
            smallObject.actionLocation = this.actionLocation;
            smallObject.isEquipped = this.isEquiped;
            return smallObject;
        }
    }, {
        key: "update",
        value: function update(delta, emptyPosition) {
            _get(InventoryObject.prototype.__proto__ || Object.getPrototypeOf(InventoryObject.prototype), "update", this).call(this, delta);
            if (this.inventoryLocation === -2) {
                if (emptyPosition !== false) {
                    this.inventoryLocation = emptyPosition;
                    this.shownLocation = emptyPosition;
                } else {
                    this.setEquiped(true, -1);
                }
            }
            if (this.interval !== 0) {
                this.interval -= delta;
                if (this.interval < 0) {
                    this.interval = 0;
                }
            }
            if (this.isMouseInObject) {
                this.mouseInObjectTime += delta;
            } else {
                this.mouseInObjectTime = 0;
            }
        }
    }, {
        key: "draw",
        value: function draw(ctx, screenX, screenY, width, height) {
            this.x = screenX;
            this.y = screenY;
            this.width = width;
            this.height = height;
            _get(InventoryObject.prototype.__proto__ || Object.getPrototypeOf(InventoryObject.prototype), "draw", this).call(this, ctx, screenX, screenY);

            if (this.interval !== 0) {
                var percentage = this.interval / this.intervalTime;
                var angle = percentage * 2 * Math.PI;

                ctx.beginPath();
                ctx.moveTo(screenX + width, screenY + width / 2);
                ctx.lineTo(screenX + width / 2, screenY + width / 2);
                ctx.moveTo(screenX + width / 2, screenY + width / 2);
                ctx.lineTo(screenX + width / 2 + width / 2 * Math.cos(angle), screenY + width / 2 + width / 2 * Math.sin(angle));
                ctx.moveTo(screenX + width / 2, screenY + width / 2);
                ctx.arc(screenX + width / 2, screenY + width / 2, width / 2, 0, angle);
                ctx.fillStyle = 'rgba(' + (Math.floor(percentage * 200) + 30) + ', ' + (Math.floor((1 - percentage) * 200) + 30) + ', 60, 0.8)';
                ctx.fill();
                ctx.closePath();
            }

            if (this.mouseInObjectTime > 0.5 && !this.isHolding) {
                ctx.globalAlpha = this.mouseInObjectTime > 1.5 ? 0.8 : (this.mouseInObjectTime - 0.5) * 0.8;
                var borderWidth = 3;
                ctx.fillStyle = "#a7815a";
                ctx.fillRect(screenX - width * 2.5 - borderWidth, screenY - borderWidth, width * 2.5 + 2 * borderWidth, height * 3 + 2 * borderWidth);
                ctx.fillStyle = "#97714a";
                ctx.fillRect(screenX - width * 2.5, screenY, width * 2.5, height * 3);

                var drawX = screenX - width * 2.5 + 8;
                var drawY = screenY;
                var dy = 24;
                ctx.font = "18px Arial";
                if (this.isEquipable) {
                    ctx.fillStyle = "#106010";
                    ctx.fillText("Equipable", drawX, drawY += dy);
                    ctx.fillText(this.typeId, drawX, drawY += dy);
                    ctx.fillStyle = "white";
                    ctx.fillText("Armor: " + this.strength, drawX, drawY += dy);
                } else if (this.isUsable) {
                    ctx.fillStyle = "#601010";
                    ctx.fillText("Usable", drawX, drawY += dy);
                    ctx.fillText(this.typeId, drawX, drawY += dy);
                    ctx.fillStyle = "white";
                    ctx.fillText("Effect: " + this.strength, drawX, drawY += dy);
                } else if (this.weapontype !== this.WEAPONTYPES.NONE) {
                    ctx.fillStyle = "#101060";
                    ctx.fillText("Weapon", drawX, drawY += dy);
                    ctx.fillText(this.typeId, drawX, drawY += dy);
                    ctx.fillStyle = "white";
                    ctx.fillText("Damage: " + this.strength, drawX, drawY += dy);
                    ctx.fillText("Reload time: " + this.intervalTime + "s", drawX, drawY += dy);
                    ctx.fillText("Dps: " + Math.round(this.strength / this.intervalTime * 100) / 100 + "/s", drawX, drawY += dy);
                    if (this.levelRequired > 1) {
                        ctx.fillText("Level required: " + this.levelRequired, drawX, drawY += dy);
                    }
                } else {
                    ctx.fillStyle = "#606060";
                    ctx.fillText(this.typeId, drawX, drawY += dy);
                }
                ctx.fillText("Stack: " + this.stackCount + "/" + this.stackLimit, drawX, drawY += dy);

                ctx.globalAlpha = 1;
            }
        }
    }]);

    return InventoryObject;
}(_GameObjectBase2.default);

exports.default = InventoryObject;

/***/ }),
/* 1 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var GameObject = function () {
    function GameObject() {
        _classCallCheck(this, GameObject);

        this.image = null;
        this.rows = 1;
        this.cols = 1;
        this.tileWidth = 1;
        this.tileHeight = 1;
        this.imageIndex = 0;
        this.increaseRatio = 1;
        this.topText = [];
    }

    _createClass(GameObject, [{
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
        key: "isNear",
        value: function isNear(xMin, yMin, xMax, yMax) {
            // (source: https://stackoverflow.com/questions/306316/determine-if-two-rectangles-overlap-each-other)
            return this.x < xMax && this.x + this.width > xMin && this.y < yMax && this.y + this.height > yMin;
        }
    }, {
        key: "getImageIndex",
        value: function getImageIndex() {
            return Math.floor(this.imageIndex);
        }
    }, {
        key: "getImageX",
        value: function getImageX() {
            return this.getImageIndex() % this.cols;
        }
    }, {
        key: "getImageY",
        value: function getImageY() {
            return Math.floor(this.getImageIndex() / this.cols);
        }
    }, {
        key: "update",
        value: function update(delta) {
            var _this = this;

            if (this.image !== null && (this.rows > 1 || this.cols > 1)) {
                this.increaseImageIndex(delta);
            }
            if (this.topText.length > 0) {
                this.topText.forEach(function (text) {
                    text.time += delta;
                    if (text.time > 1) {
                        _this.topText.splice(_this.topText.indexOf(text), 1);
                    }
                });
            }
        }
    }, {
        key: "draw",
        value: function draw(ctx, screenX, screenY) {
            if (this.image === null) {
                ctx.fillText("Object", screenX, screenY);
                ctx.fillStyle = "purple";
                ctx.fillRect(screenX, screenY, this.width, this.height);
            } else {
                ctx.drawImage(this.image, // Image
                this.getImageX() * this.tileWidth, // Src x
                this.getImageY() * this.tileHeight, // Src y
                this.tileWidth, // Src width
                this.tileHeight, // Src height
                screenX, // Target x
                screenY, // Target y
                this.width, // Target width
                this.height); // Target height
            }
            this.drawTopText(ctx, screenX, screenY);
            if (this.health !== undefined) {
                if (this.health < this.maxHealth) {
                    ctx.fillStyle = "black";
                    ctx.fillRect(screenX, screenY, this.width, 10);
                    if (this.health > 0) {
                        var percent = this.health / this.maxHealth;
                        if (percent > 0.8) {
                            ctx.fillStyle = "green";
                        } else if (percent > 0.2) {
                            ctx.fillStyle = "orange";
                        } else {
                            ctx.fillStyle = "red";
                        }
                        ctx.fillRect(screenX, screenY, percent * this.width, 10);
                    }
                }
            }
        }
    }, {
        key: "drawTopText",
        value: function drawTopText(ctx, screenX, screenY) {
            var _this2 = this;

            if (this.topText.length > 0) {
                ctx.font = "20px Arial";
                this.topText.forEach(function (text) {
                    ctx.fillStyle = text.fillStyle;
                    ctx.fillText(text.text, screenX + 15, screenY - _this2.height * (0.2 + text.time));
                });
            }
        }
    }, {
        key: "drawRotatedImage",
        value: function drawRotatedImage(ctx, image, sourceX, sourceY, sourceWidth, sourceHeight, x, y, width, height, angleInRadians) {
            ctx.translate(x, y);
            ctx.rotate(angleInRadians);
            ctx.drawImage(image, sourceX, sourceY, sourceWidth, sourceHeight, -width / 2, -height / 2, width, height);
            ctx.rotate(-angleInRadians);
            ctx.translate(-x, -y);
        }
    }]);

    return GameObject;
}();

exports.default = GameObject;

/***/ }),
/* 2 */
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

    function Empty_bottle_1(loader, stackCount, inventoryLocation, actionLocation) {
        _classCallCheck(this, Empty_bottle_1);

        var _this = _possibleConstructorReturn(this, (Empty_bottle_1.__proto__ || Object.getPrototypeOf(Empty_bottle_1)).call(this, "empty_bottle_1", 50, stackCount, inventoryLocation, actionLocation));

        _this.setImage(loader.getImage('empty_bottle_1'));
        return _this;
    }

    return Empty_bottle_1;
}(_InventoryObjectBase2.default);

exports.default = Empty_bottle_1;

/***/ }),
/* 3 */
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

    function Empty_bottle_2(loader, stackCount, inventoryLocation, actionLocation) {
        _classCallCheck(this, Empty_bottle_2);

        var _this = _possibleConstructorReturn(this, (Empty_bottle_2.__proto__ || Object.getPrototypeOf(Empty_bottle_2)).call(this, "empty_bottle_2", 50, stackCount, inventoryLocation, actionLocation));

        _this.setImage(loader.getImage('empty_bottle_2'));
        return _this;
    }

    return Empty_bottle_2;
}(_InventoryObjectBase2.default);

exports.default = Empty_bottle_2;

/***/ }),
/* 4 */
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

    function Empty_bottle_3(loader, stackCount, inventoryLocation, actionLocation) {
        _classCallCheck(this, Empty_bottle_3);

        var _this = _possibleConstructorReturn(this, (Empty_bottle_3.__proto__ || Object.getPrototypeOf(Empty_bottle_3)).call(this, "empty_bottle_3", 50, stackCount, inventoryLocation, actionLocation));

        _this.setImage(loader.getImage('empty_bottle_3'));
        return _this;
    }

    return Empty_bottle_3;
}(_InventoryObjectBase2.default);

exports.default = Empty_bottle_3;

/***/ }),
/* 5 */
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

    function Empty_bottle_4(loader, stackCount, inventoryLocation, actionLocation) {
        _classCallCheck(this, Empty_bottle_4);

        var _this = _possibleConstructorReturn(this, (Empty_bottle_4.__proto__ || Object.getPrototypeOf(Empty_bottle_4)).call(this, "empty_bottle_4", 50, stackCount, inventoryLocation, actionLocation));

        _this.setImage(loader.getImage('empty_bottle_4'));
        return _this;
    }

    return Empty_bottle_4;
}(_InventoryObjectBase2.default);

exports.default = Empty_bottle_4;

/***/ }),
/* 6 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _get = function get(object, property, receiver) { if (object === null) object = Function.prototype; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { return get(parent, property, receiver); } } else if ("value" in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } };

var _GameObjectBase = __webpack_require__(1);

var _GameObjectBase2 = _interopRequireDefault(_GameObjectBase);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var NPCObject = function (_GameObject) {
    _inherits(NPCObject, _GameObject);

    function NPCObject(type, x, y, width, height, maxHealth, damage, attackSpeed, speed, xp, passive, map, bounds) {
        _classCallCheck(this, NPCObject);

        var _this = _possibleConstructorReturn(this, (NPCObject.__proto__ || Object.getPrototypeOf(NPCObject)).call(this));

        _this.type = type;
        _this.x = x;
        _this.y = y;
        _this.width = width;
        _this.height = height;
        _this.health = maxHealth;
        _this.maxHealth = maxHealth;
        _this.damage = damage;
        _this.map = map;
        _this.bounds = bounds;
        _this.tileLevel = 0;
        _this.damageDone = 0;
        _this.attackSpeed = attackSpeed;
        _this.speed = speed;
        _this.xp = xp;
        _this.passive = passive;
        //this.canBePickedUp = false;
        _this.STATE = {
            STOP: 0,
            RUNNINGNORTH: 1,
            RUNNINGEAST: 2,
            RUNNINGSOUTH: 3,
            RUNNINGWEST: 4
        };

        _this.action = _this.STATE.STOP;
        _this.doingAction = 0;
        _this.imageState = 0;
        _this.id = -1;
        return _this;
    }

    _createClass(NPCObject, [{
        key: "hasDamage",
        value: function hasDamage() {
            return this.damageDone > 0 ? false : this.damage >= 0;
        }
    }, {
        key: "doDamage",
        value: function doDamage() {
            this.damageDone += 1;
            return this.damage;
        }
    }, {
        key: "getImageIndex",
        value: function getImageIndex() {
            if (this.action === this.STATE.STOP || !this.moving) return this.imageState;
            // else
            return this.imageState + this.cols * Math.floor(this.imageIndex);
        }
    }, {
        key: "getImageX",
        value: function getImageX() {
            return this.getImageIndex() % this.rows;
        }
    }, {
        key: "getImageY",
        value: function getImageY() {
            return Math.floor(this.getImageIndex() / this.rows);
        }
    }, {
        key: "increaseImageIndex",
        value: function increaseImageIndex(increase) {
            this.imageIndex += increase * this.increaseRatio;
            if (this.imageIndex >= this.cols) {
                this.imageIndex -= this.cols;
            }
        }
    }, {
        key: "isHit",
        value: function isHit(projectiles) {
            for (var i = 0; i < projectiles.length; i++) {
                var projectile = projectiles[i];
                if (this.isNear(projectile.x, projectile.y, projectile.x + projectile.width, projectile.y + projectile.height)) {
                    var damage = projectile.doDamage();
                    this.health -= damage;
                    this.topText.push({
                        text: "-" + damage,
                        fillStyle: "red",
                        time: 0
                    });
                    return true;
                }
            }
            return false;
        }
    }, {
        key: "update",
        value: function update(delta, otherNPCs) {
            _get(NPCObject.prototype.__proto__ || Object.getPrototypeOf(NPCObject.prototype), "update", this).call(this, delta);
            if (this.damageDone > 0) {
                this.damageDone -= delta;
            }
            if (this.doingAction > 0) {
                this.doingAction -= delta;
            }
            if (this.doingAction <= 0) {
                delta += this.doingAction; // Get the difference
                //this.action = this.STATE.STOP;
            }

            this.move(delta, otherNPCs);
        }
    }, {
        key: "move",
        value: function move(delta, units) {
            var dirx = 0;
            var diry = 0;
            switch (this.action) {
                case this.STATE.RUNNINGNORTH:
                    diry = -1;
                    break;
                case this.STATE.RUNNINGEAST:
                    dirx = 1;
                    break;
                case this.STATE.RUNNINGSOUTH:
                    diry = 1;
                    break;
                case this.STATE.RUNNINGWEST:
                    dirx = -1;
                    break;
                //default: // STOP
                //    break;
            }

            this.moving = false;
            if (!this.unitsOverlap(units, this.x + dirx * this.speed * delta, this.y + diry * this.speed * delta)) {
                this.moving = true;
                this.x += dirx * this.speed * delta;
                this.y += diry * this.speed * delta;
                this._collide(dirx, diry);
            }
        }
    }, {
        key: "unitsOverlap",
        value: function unitsOverlap(units, thisx, thisy) {
            if (thisx === undefined) {
                thisx = this.x;
            }
            if (thisy === undefined) {
                thisy = this.y;
            }
            var left = thisx;
            var right = thisx + this.width - 1;
            var top = thisy;
            var bottom = thisy + this.height - 1;

            for (var i = 0; i < units.length; i++) {
                var npc = units[i];
                if (npc !== this) {
                    if (npc.isNear(left, top, right, bottom)) {
                        return true;
                    }
                }
            }
            return false;
        }
    }, {
        key: "_collide",
        value: function _collide(dirx, diry) {
            var row = void 0,
                col = void 0;
            var left = this.x;
            var right = this.x + this.width - 1;
            var top = this.y;
            var bottom = this.y + this.height - 1;

            if (left < this.bounds.x) {
                this.x = this.bounds.x;
                this.imageIndex = 0;
            } else if (right > this.bounds.x + this.bounds.width) {
                this.x = this.bounds.x + this.bounds.width - this.width;
                this.imageIndex = 0;
            } else if (top < this.bounds.y) {
                this.y = this.bounds.y;
                this.imageIndex = 0;
            } else if (bottom > this.bounds.y + this.bounds.height) {
                this.y = this.bounds.y + this.bounds.height - this.height;
                this.imageIndex = 0;
            }

            // check for collisions on sprite sides
            var collision = this.map.isSolidTileAtXY(left, top, this.tileLevel) || this.map.isSolidTileAtXY(right, top, this.tileLevel) || this.map.isSolidTileAtXY(right, bottom, this.tileLevel) || this.map.isSolidTileAtXY(left, bottom, this.tileLevel);
            if (!collision) {
                return;
            }
            this.moving = false;

            if (diry > 0) {
                row = this.map.getRow(bottom);
                this.y = -this.height + this.map.getY(row);
                this.imageIndex = 0;
            } else if (diry < 0) {
                row = this.map.getRow(top);
                this.y = this.map.getY(row + 1);
                this.imageIndex = 0;
            } else if (dirx > 0) {
                col = this.map.getCol(right);
                this.x = -this.width + this.map.getX(col);
                this.imageIndex = 0;
            } else if (dirx < 0) {
                col = this.map.getCol(left);
                this.x = this.map.getX(col + 1);
                this.imageIndex = 0;
            }
        }
    }, {
        key: "getSmallObject",
        value: function getSmallObject() {
            var smallObject = {};
            smallObject.id = this.id;
            smallObject.x = this.x;
            smallObject.y = this.y;
            smallObject.type = this.type;
            smallObject.health = this.health;
            smallObject.action = this.action;
            smallObject.doingAction = this.doingAction;
            return JSON.stringify(smallObject);
        }
    }]);

    return NPCObject;
}(_GameObjectBase2.default);

exports.default = NPCObject;

/***/ }),
/* 7 */
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

    function Sword_3(loader, stackCount, inventoryLocation, actionLocation) {
        _classCallCheck(this, Sword_3);

        //this.setEquipable(this.AREAS.ONE_HANDED, 10);
        var _this = _possibleConstructorReturn(this, (Sword_3.__proto__ || Object.getPrototypeOf(Sword_3)).call(this, "sword_3", 10, stackCount, inventoryLocation, actionLocation));

        _this.setImage(loader.getImage('sword_3'));
        _this.setWeapon(_this.WEAPONTYPES.MELEE, 25, 0.25, "DamageArea_1", 3);
        return _this;
    }

    return Sword_3;
}(_InventoryObjectBase2.default);

exports.default = Sword_3;

/***/ }),
/* 8 */
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

    function Shield_4(loader, stackCount, inventoryLocation, actionLocation, isEquipped) {
        _classCallCheck(this, Shield_4);

        var _this = _possibleConstructorReturn(this, (Shield_4.__proto__ || Object.getPrototypeOf(Shield_4)).call(this, "shield_4", 50, stackCount, inventoryLocation, actionLocation));

        _this.setEquipable(_this.AREAS.OFF_HAND, 50, isEquipped);
        _this.setTilesImage(loader.getImage('shield_4'), 4, 4, 16);
        return _this;
    }

    return Shield_4;
}(_InventoryObjectBase2.default);

exports.default = Shield_4;

/***/ }),
/* 9 */
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

    function Spear(loader, stackCount, inventoryLocation, actionLocation) {
        _classCallCheck(this, Spear);

        var _this = _possibleConstructorReturn(this, (Spear.__proto__ || Object.getPrototypeOf(Spear)).call(this, "spear", 10, stackCount, inventoryLocation, actionLocation));

        _this.setImage(loader.getImage('spear'));
        _this.setWeapon(_this.WEAPONTYPES.MELEE, 75, 4, "DamageArea_1", 0);
        return _this;
    }

    return Spear;
}(_InventoryObjectBase2.default);

exports.default = Spear;

/***/ }),
/* 10 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});

var _InventoryObjectBase = __webpack_require__(0);

var _InventoryObjectBase2 = _interopRequireDefault(_InventoryObjectBase);

var _Empty_bottle_ = __webpack_require__(2);

var _Empty_bottle_2 = _interopRequireDefault(_Empty_bottle_);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var Health_bottle_1 = function (_InventoryObject) {
    _inherits(Health_bottle_1, _InventoryObject);

    function Health_bottle_1(loader, stackCount, inventoryLocation, actionLocation) {
        _classCallCheck(this, Health_bottle_1);

        var _this = _possibleConstructorReturn(this, (Health_bottle_1.__proto__ || Object.getPrototypeOf(Health_bottle_1)).call(this, "health_bottle_1", 50, stackCount, inventoryLocation, actionLocation));

        _this.setUsable(_this.USES.HEALTH, 10, "empty_bottle_1");
        _this.setImage(loader.getImage('health_bottle_1'));
        return _this;
    }

    return Health_bottle_1;
}(_InventoryObjectBase2.default);

exports.default = Health_bottle_1;

/***/ }),
/* 11 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});

var _nonCharacterObjectBase = __webpack_require__(12);

var _nonCharacterObjectBase2 = _interopRequireDefault(_nonCharacterObjectBase);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var Fire = function (_NonCharacterObject) {
    _inherits(Fire, _NonCharacterObject);

    function Fire(loader, id, x, y) {
        _classCallCheck(this, Fire);

        var _this = _possibleConstructorReturn(this, (Fire.__proto__ || Object.getPrototypeOf(Fire)).call(this, id, x, y, 96, 96, 45, false));

        _this.setTilesImage(loader.getImage('fire'), 1, 5, 12);
        return _this;
    }

    return Fire;
}(_nonCharacterObjectBase2.default);

exports.default = Fire;

/***/ }),
/* 12 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _get = function get(object, property, receiver) { if (object === null) object = Function.prototype; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { return get(parent, property, receiver); } } else if ("value" in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } };

var _GameObjectBase = __webpack_require__(1);

var _GameObjectBase2 = _interopRequireDefault(_GameObjectBase);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var NonCharacterObject = function (_GameObject) {
    _inherits(NonCharacterObject, _GameObject);

    function NonCharacterObject(id, x, y, width, height, damage, solid) {
        _classCallCheck(this, NonCharacterObject);

        var _this = _possibleConstructorReturn(this, (NonCharacterObject.__proto__ || Object.getPrototypeOf(NonCharacterObject)).call(this));

        _this.id = id;
        _this.x = x;
        _this.y = y;
        _this.width = width;
        _this.height = height;
        _this.damage = damage;
        _this.damageDone = 0;
        _this.solid = solid;
        _this.canBePickedUp = false;
        return _this;
    }

    _createClass(NonCharacterObject, [{
        key: "hasDamage",
        value: function hasDamage() {
            return this.damageDone > 0 ? false : this.damage >= 0;
        }
    }, {
        key: "doDamage",
        value: function doDamage() {
            this.damageDone += 1;
            return this.damage;
        }
    }, {
        key: "update",
        value: function update(delta) {
            _get(NonCharacterObject.prototype.__proto__ || Object.getPrototypeOf(NonCharacterObject.prototype), "update", this).call(this, delta);
            if (this.damageDone > 0) {
                this.damageDone -= delta;
            }
        }
    }, {
        key: "getSmallObject",
        value: function getSmallObject() {
            var smallObject = {};
            smallObject.id = this.id;
            smallObject.x = this.x;
            smallObject.y = this.y;
            smallObject.width = this.width;
            smallObject.height = this.height;
            smallObject.damage = this.damage;
            smallObject.damageDone = this.damageDone;
            smallObject.solid = this.solid;
            smallObject.canBePickedUp = this.canBePickedUp;
            return smallObject;
        }
    }]);

    return NonCharacterObject;
}(_GameObjectBase2.default);

exports.default = NonCharacterObject;

/***/ }),
/* 13 */
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

    function Sword_1(loader, stackCount, inventoryLocation, actionLocation) {
        _classCallCheck(this, Sword_1);

        //this.setEquipable(this.AREAS.ONE_HANDED, 10);
        var _this = _possibleConstructorReturn(this, (Sword_1.__proto__ || Object.getPrototypeOf(Sword_1)).call(this, "sword_1", 10, stackCount, inventoryLocation, actionLocation));

        _this.setImage(loader.getImage('sword_1'));
        _this.setWeapon(_this.WEAPONTYPES.MELEE, 10, 1, "DamageArea_1", 0);
        return _this;
    }

    return Sword_1;
}(_InventoryObjectBase2.default);

exports.default = Sword_1;

/***/ }),
/* 14 */
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

    function Sword_2(loader, stackCount, inventoryLocation, actionLocation) {
        _classCallCheck(this, Sword_2);

        //this.setEquipable(this.AREAS.ONE_HANDED, 10);
        var _this = _possibleConstructorReturn(this, (Sword_2.__proto__ || Object.getPrototypeOf(Sword_2)).call(this, "sword_2", 10, stackCount, inventoryLocation, actionLocation));

        _this.setImage(loader.getImage('sword_2'));
        _this.setWeapon(_this.WEAPONTYPES.MELEE, 25, 0.66, "DamageArea_1", 2);
        return _this;
    }

    return Sword_2;
}(_InventoryObjectBase2.default);

exports.default = Sword_2;

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

var Shield_1 = function (_InventoryObject) {
    _inherits(Shield_1, _InventoryObject);

    function Shield_1(loader, stackCount, inventoryLocation, actionLocation, isEquipped) {
        _classCallCheck(this, Shield_1);

        var _this = _possibleConstructorReturn(this, (Shield_1.__proto__ || Object.getPrototypeOf(Shield_1)).call(this, "shield_1", 50, stackCount, inventoryLocation, actionLocation));

        _this.setEquipable(_this.AREAS.OFF_HAND, 10, isEquipped);
        _this.setImage(loader.getImage('shield_1'));
        return _this;
    }

    return Shield_1;
}(_InventoryObjectBase2.default);

exports.default = Shield_1;

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

var Shield_2 = function (_InventoryObject) {
    _inherits(Shield_2, _InventoryObject);

    function Shield_2(loader, stackCount, inventoryLocation, actionLocation, isEquipped) {
        _classCallCheck(this, Shield_2);

        var _this = _possibleConstructorReturn(this, (Shield_2.__proto__ || Object.getPrototypeOf(Shield_2)).call(this, "shield_2", 50, stackCount, inventoryLocation, actionLocation));

        _this.setEquipable(_this.AREAS.OFF_HAND, 15, isEquipped);
        _this.setImage(loader.getImage('shield_2'));
        return _this;
    }

    return Shield_2;
}(_InventoryObjectBase2.default);

exports.default = Shield_2;

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

var Shield_3 = function (_InventoryObject) {
    _inherits(Shield_3, _InventoryObject);

    function Shield_3(loader, stackCount, inventoryLocation, actionLocation, isEquipped) {
        _classCallCheck(this, Shield_3);

        var _this = _possibleConstructorReturn(this, (Shield_3.__proto__ || Object.getPrototypeOf(Shield_3)).call(this, "shield_3", 50, stackCount, inventoryLocation, actionLocation));

        _this.setEquipable(_this.AREAS.OFF_HAND, 25, isEquipped);
        _this.setImage(loader.getImage('shield_3'));
        return _this;
    }

    return Shield_3;
}(_InventoryObjectBase2.default);

exports.default = Shield_3;

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

var Axe_1 = function (_InventoryObject) {
    _inherits(Axe_1, _InventoryObject);

    function Axe_1(loader, stackCount, inventoryLocation, actionLocation) {
        _classCallCheck(this, Axe_1);

        var _this = _possibleConstructorReturn(this, (Axe_1.__proto__ || Object.getPrototypeOf(Axe_1)).call(this, "axe_1", 10, stackCount, inventoryLocation, actionLocation));

        _this.setImage(loader.getImage('axe_1'));
        _this.setWeapon(_this.WEAPONTYPES.MELEE, 15, 4, "DamageArea_1", 0);
        return _this;
    }

    return Axe_1;
}(_InventoryObjectBase2.default);

exports.default = Axe_1;

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

var Axe_2 = function (_InventoryObject) {
    _inherits(Axe_2, _InventoryObject);

    function Axe_2(loader, stackCount, inventoryLocation, actionLocation) {
        _classCallCheck(this, Axe_2);

        var _this = _possibleConstructorReturn(this, (Axe_2.__proto__ || Object.getPrototypeOf(Axe_2)).call(this, "axe_2", 10, stackCount, inventoryLocation, actionLocation));

        _this.setImage(loader.getImage('axe_2'));
        _this.setWeapon(_this.WEAPONTYPES.MELEE, 30, 4, "DamageArea_1", 2);
        return _this;
    }

    return Axe_2;
}(_InventoryObjectBase2.default);

exports.default = Axe_2;

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

var Axe_3 = function (_InventoryObject) {
    _inherits(Axe_3, _InventoryObject);

    function Axe_3(loader, stackCount, inventoryLocation, actionLocation) {
        _classCallCheck(this, Axe_3);

        var _this = _possibleConstructorReturn(this, (Axe_3.__proto__ || Object.getPrototypeOf(Axe_3)).call(this, "axe_3", 10, stackCount, inventoryLocation, actionLocation));

        _this.setImage(loader.getImage('axe_3'));
        _this.setWeapon(_this.WEAPONTYPES.MELEE, 100, 1, "DamageArea_1", 4);
        return _this;
    }

    return Axe_3;
}(_InventoryObjectBase2.default);

exports.default = Axe_3;

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

var Bow_1 = function (_InventoryObject) {
    _inherits(Bow_1, _InventoryObject);

    function Bow_1(loader, stackCount, inventoryLocation, actionLocation) {
        _classCallCheck(this, Bow_1);

        var _this = _possibleConstructorReturn(this, (Bow_1.__proto__ || Object.getPrototypeOf(Bow_1)).call(this, "bow_1", 10, stackCount, inventoryLocation, actionLocation));

        _this.setImage(loader.getImage('bow_1'));
        _this.setWeapon(_this.WEAPONTYPES.RANGED, 10, 3, "Arrow_1", 0);
        return _this;
    }

    return Bow_1;
}(_InventoryObjectBase2.default);

exports.default = Bow_1;

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

var Bow_2 = function (_InventoryObject) {
    _inherits(Bow_2, _InventoryObject);

    function Bow_2(loader, stackCount, inventoryLocation, actionLocation) {
        _classCallCheck(this, Bow_2);

        var _this = _possibleConstructorReturn(this, (Bow_2.__proto__ || Object.getPrototypeOf(Bow_2)).call(this, "bow_2", 10, stackCount, inventoryLocation, actionLocation));

        _this.setImage(loader.getImage('bow_2'));
        _this.setWeapon(_this.WEAPONTYPES.RANGED, 20, 1, "Arrow_1", 2);
        return _this;
    }

    return Bow_2;
}(_InventoryObjectBase2.default);

exports.default = Bow_2;

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

var Bow_3 = function (_InventoryObject) {
    _inherits(Bow_3, _InventoryObject);

    function Bow_3(loader, stackCount, inventoryLocation, actionLocation) {
        _classCallCheck(this, Bow_3);

        var _this = _possibleConstructorReturn(this, (Bow_3.__proto__ || Object.getPrototypeOf(Bow_3)).call(this, "bow_3", 10, stackCount, inventoryLocation, actionLocation));

        _this.setImage(loader.getImage('bow_3'));
        _this.setWeapon(_this.WEAPONTYPES.RANGED, 50, 0.5, "Arrow_1", 5);
        return _this;
    }

    return Bow_3;
}(_InventoryObjectBase2.default);

exports.default = Bow_3;

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

var Mace = function (_InventoryObject) {
    _inherits(Mace, _InventoryObject);

    function Mace(loader, stackCount, inventoryLocation, actionLocation) {
        _classCallCheck(this, Mace);

        var _this = _possibleConstructorReturn(this, (Mace.__proto__ || Object.getPrototypeOf(Mace)).call(this, "mace", 10, stackCount, inventoryLocation, actionLocation));

        _this.setImage(loader.getImage('mace'));
        _this.setWeapon(_this.WEAPONTYPES.MELEE, 200, 2, "DamageArea_1", 5);
        return _this;
    }

    return Mace;
}(_InventoryObjectBase2.default);

exports.default = Mace;

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

var Armor_1 = function (_InventoryObject) {
    _inherits(Armor_1, _InventoryObject);

    function Armor_1(loader, stackCount, inventoryLocation, actionLocation, isEquipped) {
        _classCallCheck(this, Armor_1);

        var _this = _possibleConstructorReturn(this, (Armor_1.__proto__ || Object.getPrototypeOf(Armor_1)).call(this, "armor_1", 50, stackCount, inventoryLocation, actionLocation));

        _this.setEquipable(_this.AREAS.BODY, 20, isEquipped);
        _this.setImage(loader.getImage('armor_1'));
        return _this;
    }

    return Armor_1;
}(_InventoryObjectBase2.default);

exports.default = Armor_1;

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

var Armor_2 = function (_InventoryObject) {
    _inherits(Armor_2, _InventoryObject);

    function Armor_2(loader, stackCount, inventoryLocation, actionLocation, isEquipped) {
        _classCallCheck(this, Armor_2);

        var _this = _possibleConstructorReturn(this, (Armor_2.__proto__ || Object.getPrototypeOf(Armor_2)).call(this, "armor_2", 50, stackCount, inventoryLocation, actionLocation));

        _this.setEquipable(_this.AREAS.BODY, 40, isEquipped);
        _this.setImage(loader.getImage('armor_2'));
        return _this;
    }

    return Armor_2;
}(_InventoryObjectBase2.default);

exports.default = Armor_2;

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

var Boots_1 = function (_InventoryObject) {
    _inherits(Boots_1, _InventoryObject);

    function Boots_1(loader, stackCount, inventoryLocation, actionLocation, isEquipped) {
        _classCallCheck(this, Boots_1);

        var _this = _possibleConstructorReturn(this, (Boots_1.__proto__ || Object.getPrototypeOf(Boots_1)).call(this, "boots_1", 50, stackCount, inventoryLocation, actionLocation));

        _this.setEquipable(_this.AREAS.BOOTS, 4, isEquipped);
        _this.setImage(loader.getImage('boots_1'));
        return _this;
    }

    return Boots_1;
}(_InventoryObjectBase2.default);

exports.default = Boots_1;

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

var Boots_2 = function (_InventoryObject) {
    _inherits(Boots_2, _InventoryObject);

    function Boots_2(loader, stackCount, inventoryLocation, actionLocation, isEquipped) {
        _classCallCheck(this, Boots_2);

        var _this = _possibleConstructorReturn(this, (Boots_2.__proto__ || Object.getPrototypeOf(Boots_2)).call(this, "boots_2", 50, stackCount, inventoryLocation, actionLocation));

        _this.setEquipable(_this.AREAS.BOOTS, 8, isEquipped);
        _this.setImage(loader.getImage('boots_2'));
        return _this;
    }

    return Boots_2;
}(_InventoryObjectBase2.default);

exports.default = Boots_2;

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

var Boots_3 = function (_InventoryObject) {
    _inherits(Boots_3, _InventoryObject);

    function Boots_3(loader, stackCount, inventoryLocation, actionLocation, isEquipped) {
        _classCallCheck(this, Boots_3);

        var _this = _possibleConstructorReturn(this, (Boots_3.__proto__ || Object.getPrototypeOf(Boots_3)).call(this, "boots_3", 50, stackCount, inventoryLocation, actionLocation));

        _this.setEquipable(_this.AREAS.BOOTS, 20, isEquipped);
        _this.setImage(loader.getImage('boots_3'));
        return _this;
    }

    return Boots_3;
}(_InventoryObjectBase2.default);

exports.default = Boots_3;

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

var Helmet_1 = function (_InventoryObject) {
    _inherits(Helmet_1, _InventoryObject);

    function Helmet_1(loader, stackCount, inventoryLocation, actionLocation, isEquipped) {
        _classCallCheck(this, Helmet_1);

        var _this = _possibleConstructorReturn(this, (Helmet_1.__proto__ || Object.getPrototypeOf(Helmet_1)).call(this, "helmet_1", 50, stackCount, inventoryLocation, actionLocation));

        _this.setEquipable(_this.AREAS.HEAD, 10, isEquipped);
        _this.setImage(loader.getImage('helmet_1'));
        return _this;
    }

    return Helmet_1;
}(_InventoryObjectBase2.default);

exports.default = Helmet_1;

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

var Helmet_2 = function (_InventoryObject) {
    _inherits(Helmet_2, _InventoryObject);

    function Helmet_2(loader, stackCount, inventoryLocation, actionLocation, isEquipped) {
        _classCallCheck(this, Helmet_2);

        var _this = _possibleConstructorReturn(this, (Helmet_2.__proto__ || Object.getPrototypeOf(Helmet_2)).call(this, "helmet_2", 50, stackCount, inventoryLocation, actionLocation));

        _this.setEquipable(_this.AREAS.HEAD, 25, isEquipped);
        _this.setImage(loader.getImage('helmet_2'));
        return _this;
    }

    return Helmet_2;
}(_InventoryObjectBase2.default);

exports.default = Helmet_2;

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

var Coin = function (_InventoryObject) {
    _inherits(Coin, _InventoryObject);

    function Coin(loader, stackCount, inventoryLocation, actionLocation) {
        _classCallCheck(this, Coin);

        var _this = _possibleConstructorReturn(this, (Coin.__proto__ || Object.getPrototypeOf(Coin)).call(this, "coin", 999999, stackCount, inventoryLocation, actionLocation));

        _this.setImage(loader.getImage('coin'));
        _this.setWeapon(_this.WEAPONTYPES.MELEE, 1, 1, "DamageArea_1", 0);
        return _this;
    }

    return Coin;
}(_InventoryObjectBase2.default);

exports.default = Coin;

/***/ }),
/* 33 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});

var _InventoryObjectBase = __webpack_require__(0);

var _InventoryObjectBase2 = _interopRequireDefault(_InventoryObjectBase);

var _Empty_bottle_ = __webpack_require__(3);

var _Empty_bottle_2 = _interopRequireDefault(_Empty_bottle_);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var Health_bottle_2 = function (_InventoryObject) {
    _inherits(Health_bottle_2, _InventoryObject);

    function Health_bottle_2(loader, stackCount, inventoryLocation, actionLocation) {
        _classCallCheck(this, Health_bottle_2);

        var _this = _possibleConstructorReturn(this, (Health_bottle_2.__proto__ || Object.getPrototypeOf(Health_bottle_2)).call(this, "health_bottle_2", 50, stackCount, inventoryLocation, actionLocation));

        _this.setUsable(_this.USES.HEALTH, 25, "empty_bottle_2");
        _this.setImage(loader.getImage('health_bottle_2'));
        return _this;
    }

    return Health_bottle_2;
}(_InventoryObjectBase2.default);

exports.default = Health_bottle_2;

/***/ }),
/* 34 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});

var _InventoryObjectBase = __webpack_require__(0);

var _InventoryObjectBase2 = _interopRequireDefault(_InventoryObjectBase);

var _Empty_bottle_ = __webpack_require__(4);

var _Empty_bottle_2 = _interopRequireDefault(_Empty_bottle_);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var Health_bottle_3 = function (_InventoryObject) {
    _inherits(Health_bottle_3, _InventoryObject);

    function Health_bottle_3(loader, stackCount, inventoryLocation, actionLocation) {
        _classCallCheck(this, Health_bottle_3);

        var _this = _possibleConstructorReturn(this, (Health_bottle_3.__proto__ || Object.getPrototypeOf(Health_bottle_3)).call(this, "health_bottle_3", 50, stackCount, inventoryLocation, actionLocation));

        _this.setUsable(_this.USES.HEALTH, 50, "empty_bottle_3");
        _this.setImage(loader.getImage('health_bottle_3'));
        return _this;
    }

    return Health_bottle_3;
}(_InventoryObjectBase2.default);

exports.default = Health_bottle_3;

/***/ }),
/* 35 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});

var _InventoryObjectBase = __webpack_require__(0);

var _InventoryObjectBase2 = _interopRequireDefault(_InventoryObjectBase);

var _Empty_bottle_ = __webpack_require__(5);

var _Empty_bottle_2 = _interopRequireDefault(_Empty_bottle_);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var Health_bottle_4 = function (_InventoryObject) {
    _inherits(Health_bottle_4, _InventoryObject);

    function Health_bottle_4(loader, stackCount, inventoryLocation, actionLocation) {
        _classCallCheck(this, Health_bottle_4);

        var _this = _possibleConstructorReturn(this, (Health_bottle_4.__proto__ || Object.getPrototypeOf(Health_bottle_4)).call(this, "health_bottle_4", 50, stackCount, inventoryLocation, actionLocation));

        _this.setUsable(_this.USES.HEALTH, 100, "empty_bottle_4");
        _this.setImage(loader.getImage('health_bottle_4'));
        return _this;
    }

    return Health_bottle_4;
}(_InventoryObjectBase2.default);

exports.default = Health_bottle_4;

/***/ }),
/* 36 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});

var _ProjectileBase = __webpack_require__(37);

var _ProjectileBase2 = _interopRequireDefault(_ProjectileBase);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var Arrow_1 = function (_Projectile) {
    _inherits(Arrow_1, _Projectile);

    function Arrow_1(id, loader, playerId, x, y, angleInRadians, strength, map) {
        _classCallCheck(this, Arrow_1);

        var _this = _possibleConstructorReturn(this, (Arrow_1.__proto__ || Object.getPrototypeOf(Arrow_1)).call(this, id, "Arrow_1", playerId, x, y, angleInRadians, strength, map.drawSize * 0.5, map.drawSize * 0.5, map));

        _this.setImage(loader.getImage('arrow_1'));
        return _this;
    }

    return Arrow_1;
}(_ProjectileBase2.default);

exports.default = Arrow_1;

/***/ }),
/* 37 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _get = function get(object, property, receiver) { if (object === null) object = Function.prototype; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { return get(parent, property, receiver); } } else if ("value" in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } };

var _DamageAreaBase = __webpack_require__(38);

var _DamageAreaBase2 = _interopRequireDefault(_DamageAreaBase);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var Projectile = function (_DamageArea) {
    _inherits(Projectile, _DamageArea);

    function Projectile(id, name, playerId, x, y, angleInRadians, strength, width, height, map) {
        _classCallCheck(this, Projectile);

        var _this = _possibleConstructorReturn(this, (Projectile.__proto__ || Object.getPrototypeOf(Projectile)).call(this, id, name, playerId, x, y, angleInRadians, strength, width, height, 3, map));

        _this.speed = 512;
        return _this;
    }

    _createClass(Projectile, [{
        key: "doDamage",
        value: function doDamage() {
            this.destroyed = true;
            return this.strength;
        }
    }, {
        key: "update",
        value: function update(delta) {
            _get(Projectile.prototype.__proto__ || Object.getPrototypeOf(Projectile.prototype), "update", this).call(this, delta);
            this.x += Math.cos(this.angleInRadians) * this.speed * delta;
            this.y += Math.sin(this.angleInRadians) * this.speed * delta;
            if (this.map.isSolidTileAtXY(this.x, this.y, 99)) {
                this.destroyed = true;
            }
        }
    }, {
        key: "draw",
        value: function draw(ctx, screenX, screenY) {
            if (this.image !== null) {
                this.drawRotatedImage(ctx, this.image, this.getImageX() * this.tileWidth, // Src x
                this.getImageY() * this.tileHeight, // Src y
                this.tileWidth, // Src width
                this.tileHeight, // Src height
                screenX, screenY, this.width, this.height, this.angleInRadians + Math.PI / 4 * 5 // The image is rotated
                );
            } else {
                _get(Projectile.prototype.__proto__ || Object.getPrototypeOf(Projectile.prototype), "draw", this).call(this, ctx, screenX, screenY);
            }
        }
    }]);

    return Projectile;
}(_DamageAreaBase2.default);

exports.default = Projectile;

/***/ }),
/* 38 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _get = function get(object, property, receiver) { if (object === null) object = Function.prototype; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { return get(parent, property, receiver); } } else if ("value" in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } };

var _GameObjectBase = __webpack_require__(1);

var _GameObjectBase2 = _interopRequireDefault(_GameObjectBase);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var DamageArea = function (_GameObject) {
    _inherits(DamageArea, _GameObject);

    function DamageArea(id, name, playerId, x, y, angleInRadians, strength, width, height, totalLifeTime, map) {
        _classCallCheck(this, DamageArea);

        var _this = _possibleConstructorReturn(this, (DamageArea.__proto__ || Object.getPrototypeOf(DamageArea)).call(this));

        _this.id = id;
        _this.name = name;
        _this.playerId = playerId;
        _this.x = x;
        _this.y = y;
        _this.angleInRadians = angleInRadians;
        _this.strength = strength;
        _this.width = width;
        _this.height = height;
        _this.map = map;
        _this.lifeTime = 0;
        _this.totalLifeTime = totalLifeTime;
        _this.destroyed = false;
        return _this;
    }

    _createClass(DamageArea, [{
        key: "getSmallObject",
        value: function getSmallObject() {
            var smallObject = {};
            smallObject.id = this.id;
            smallObject.name = this.name;
            smallObject.playerId = this.playerId;
            smallObject.x = this.x;
            smallObject.y = this.y;
            smallObject.angleInRadians = this.angleInRadians;
            smallObject.strength = this.strength;
            smallObject.width = this.width;
            smallObject.height = this.height;
            smallObject.lifeTime = this.lifeTime;
            smallObject.totalLifeTime = this.totalLifeTime;
            smallObject.destroyed = this.destroyed;
            return JSON.stringify(smallObject);
        }
    }, {
        key: "doDamage",
        value: function doDamage() {
            this.destroyed = true;
            return this.strength;
        }
    }, {
        key: "update",
        value: function update(delta) {
            _get(DamageArea.prototype.__proto__ || Object.getPrototypeOf(DamageArea.prototype), "update", this).call(this, delta);
            this.lifeTime += delta;
            if (this.totalLifeTime <= this.lifeTime) {
                this.destroyed = true;
            }
        }
    }, {
        key: "draw",
        value: function draw(ctx, screenX, screenY) {
            if (this.image !== null) {
                this.drawRotatedImage(ctx, this.image, this.getImageX() * this.tileWidth, // Src x
                this.getImageY() * this.tileHeight, // Src y
                this.tileWidth, // Src width
                this.tileHeight, // Src height
                screenX + this.width / 2 + this.width / 2 * Math.cos(this.angleInRadians), screenY + this.height / 2 + this.height / 2 * Math.sin(this.angleInRadians), this.width, this.height, this.angleInRadians // The image is rotated
                );
            } else {
                _get(DamageArea.prototype.__proto__ || Object.getPrototypeOf(DamageArea.prototype), "draw", this).call(this, ctx, screenX, screenY);
            }
        }
    }]);

    return DamageArea;
}(_GameObjectBase2.default);

exports.default = DamageArea;

/***/ }),
/* 39 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});

var _DamageAreaBase = __webpack_require__(38);

var _DamageAreaBase2 = _interopRequireDefault(_DamageAreaBase);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var DamageArea_1 = function (_DamageArea) {
    _inherits(DamageArea_1, _DamageArea);

    function DamageArea_1(id, loader, playerId, x, y, angleInRadians, strength, map) {
        _classCallCheck(this, DamageArea_1);

        var _this = _possibleConstructorReturn(this, (DamageArea_1.__proto__ || Object.getPrototypeOf(DamageArea_1)).call(this, id, "DamageArea_1", playerId, x, y, angleInRadians, strength, map.drawSize * 1, map.drawSize * 1, 0.2, map));

        _this.setImage(loader.getImage('damageArea_1'));
        return _this;
    }

    return DamageArea_1;
}(_DamageAreaBase2.default);

exports.default = DamageArea_1;

/***/ }),
/* 40 */
/***/ (function(module, exports, __webpack_require__) {

__webpack_require__(41);
module.exports = __webpack_require__(63);


/***/ }),
/* 41 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _GameStateManager = __webpack_require__(42);

var _GameStateManager2 = _interopRequireDefault(_GameStateManager);

var _LoginState = __webpack_require__(43);

var _LoginState2 = _interopRequireDefault(_LoginState);

var _MainGameState = __webpack_require__(45);

var _MainGameState2 = _interopRequireDefault(_MainGameState);

var _Map = __webpack_require__(62);

var _Map2 = _interopRequireDefault(_Map);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

(function () {
    var socket = io();
    //const socket = io.connect("http://localhost:5000");

    var gamestatemanager = new _GameStateManager2.default();
    var mainstate = new _MainGameState2.default(new _Map2.default(), socket);
    var loginstate = new _LoginState2.default(socket);

    gamestatemanager.addState(loginstate);
    gamestatemanager.addState(mainstate);

    gamestatemanager.setState(loginstate);

    socket.on("requestLogin", function (res) {
        if (res.success == true) {
            mainstate.setUser(res.user);
            gamestatemanager.setState(mainstate);
        }
    });
})();

/***/ }),
/* 42 */
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
        this.states = [];
    }

    _createClass(GameStateManager, [{
        key: "start",
        value: function start() {
            //start the tickevent
            this.currentState.start();
        }
    }, {
        key: "setState",
        value: function setState(state) {
            this.currentState = state;
            this.start();
        }
    }, {
        key: "getState",
        value: function getState(state) {
            states.forEach(function (el) {
                if (el === state) return el;else throw new Error("state not found in GameStateManager");
            });
        }
    }, {
        key: "getCurrentState",
        value: function getCurrentState() {
            if (this.currentState != null) return this.currentState;else throw new Error("No current state is set");
        }
    }, {
        key: "addState",
        value: function addState(state) {
            this.states.push(state);
        }
    }, {
        key: "removeState",
        value: function removeState(state) {
            var index = this.states.indexOf(state);
            if (index != null) {
                this.states.splice(index, 1);
            } else throw new Error("state not found");
        }
    }, {
        key: "update",
        value: function update() {}
    }]);

    return GameStateManager;
}();

exports.default = GameStateManager;

/***/ }),
/* 43 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _User = __webpack_require__(44);

var _User2 = _interopRequireDefault(_User);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var LoginState = function () {
    function LoginState(socket) {
        _classCallCheck(this, LoginState);

        this.socket = socket;
        this.user;
        this.body = document.querySelector("body");
    }

    _createClass(LoginState, [{
        key: "start",
        value: function start() {
            this.clearBody();
            this.drawBackground();
            this.drawLogin();
        }
    }, {
        key: "drawBackground",
        value: function drawBackground() {
            this.clearBody();
            var template = "\n        <div class=\"background\">\n           \n        </div>\n        ";
            this.body.innerHTML = template;
        }
    }, {
        key: "checkErrors",
        value: function checkErrors(err) {
            document.querySelector(".errorContainer").innerHTML = err;
        }
    }, {
        key: "drawRegister",
        value: function drawRegister() {
            var template = "\n        <div class=\"register\">\n        <h1>Register</h1>\n        <p>Please fill in an email, username and password to register.</p>\n        <div class=\"errorContainer\"></div>\n            <form class=\"startForm\" action=\"/\">\n                <input type=\"email\" placeholder=\"Email\" name=\"email\" id=\"registerEmail\" />\n                <input type=\"text\" placeholder=\"Username\" name=\"username\" id=\"registerUser\" />\n                <input type=\"password\" placeholder=\"Password\" name=\"password\" id=\"registerPassword\" />\n                <button type=\"submit\" class=\"btn-form btnregister\" value=\"Register\">Register</button>              \n            </form>\n            <a href=\"\" class=\"formLink\">Login</a>\n        </div>\n       ";
            document.querySelector(".background").innerHTML = template;

            this.body.querySelector(".formLink").addEventListener("click", function (e) {
                e.preventDefault();
                this.drawLogin();
            }.bind(this));

            this.body.querySelector(".btnregister").addEventListener("click", function (e) {
                e.preventDefault();
                var username = this.body.querySelector("#registerUser").value;
                var password = this.body.querySelector("#registerPassword").value;
                var email = this.body.querySelector("#registerEmail").value;
                var user = new _User2.default(username, password, email);
                this.registerCall(user);
            }.bind(this));
        }
    }, {
        key: "drawLogin",
        value: function drawLogin() {
            var template = "\n        <div class=\"login\">\n        <h1>Login</h1>\n        <p>Please log in using your email and password.</p>\n        <div class=\"errorContainer\"></div>\n            <form class=\"startForm\" action=\"/\">\n                <input type=\"text\" placeholder=\"Email\" name=\"email\" id=\"loginEmail\" />\n                <input type=\"password\" placeholder=\"Password\" name=\"password\" id=\"loginPassword\" />\n                <button type=\"submit\" class=\"btn-form btnlogin\" value=\"Login\">Login</button>                \n            </form>\n            <a href=\"\" class=\"formLink\">Register</a>\n        </div>\n        ";
            document.querySelector(".background").innerHTML = template;

            this.body.querySelector(".formLink").addEventListener("click", function (e) {
                e.preventDefault();
                this.drawRegister();
            }.bind(this));

            this.body.querySelector(".btnlogin").addEventListener("click", function (e) {
                e.preventDefault();
                var password = this.body.querySelector("#loginPassword").value;
                var email = this.body.querySelector("#loginEmail").value;
                var user = new _User2.default(null, password, email);
                this.loginCall(user);
            }.bind(this));
        }
    }, {
        key: "registerCall",
        value: function registerCall(user) {
            this.socket.emit("registerUser", {
                user: user
            });
            this.socket.on("requestRegister", function (res) {
                if (res.success == false) this.checkErrors(res.message);
                //console.log(res.user);
            }.bind(this));
        }
    }, {
        key: "loginCall",
        value: function loginCall(user) {
            this.socket.emit("requestLogin", {
                user: user
            });
            this.socket.on("requestLogin", function (res) {
                if (res.success == false) this.checkErrors(res.message);
                //console.log(res.message);
            }.bind(this));
        }
    }, {
        key: "clearBody",
        value: function clearBody() {
            while (this.body.firstChild) {
                this.body.removeChild(this.body.firstChild);
            }
        }
    }]);

    return LoginState;
}();

exports.default = LoginState;

/***/ }),
/* 44 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var User = function () {
    function User(username, password, mail) {
        _classCallCheck(this, User);

        this.username = username;
        this.password = password;
        this.mail = mail;
    }

    _createClass(User, [{
        key: "getUsername",
        value: function getUsername() {
            return this.username;
        }
    }, {
        key: "setUsername",
        value: function setUsername(username) {
            this.username = username;
        }
    }, {
        key: "getPassword",
        value: function getPassword() {
            return this.password;
        }
    }, {
        key: "getEmail",
        value: function getEmail() {
            return this.mail;
        }
    }, {
        key: "setEmail",
        value: function setEmail(email) {
            this.mail = mail;
        }
    }]);

    return User;
}();

exports.default = User;

/***/ }),
/* 45 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

// inventoryItems


var _Camera = __webpack_require__(46);

var _Camera2 = _interopRequireDefault(_Camera);

var _Keyboard = __webpack_require__(47);

var _Keyboard2 = _interopRequireDefault(_Keyboard);

var _Fire = __webpack_require__(11);

var _Fire2 = _interopRequireDefault(_Fire);

var _DroppedItem = __webpack_require__(48);

var _DroppedItem2 = _interopRequireDefault(_DroppedItem);

var _SpawnerBase = __webpack_require__(49);

var _SpawnerBase2 = _interopRequireDefault(_SpawnerBase);

var _Hero = __webpack_require__(54);

var _Hero2 = _interopRequireDefault(_Hero);

var _InventoryManager = __webpack_require__(55);

var _InventoryManager2 = _interopRequireDefault(_InventoryManager);

var _OtherPlayer = __webpack_require__(59);

var _OtherPlayer2 = _interopRequireDefault(_OtherPlayer);

var _Loader = __webpack_require__(60);

var _Loader2 = _interopRequireDefault(_Loader);

var _GameState = __webpack_require__(61);

var _GameState2 = _interopRequireDefault(_GameState);

var _ProjectileBase = __webpack_require__(37);

var _ProjectileBase2 = _interopRequireDefault(_ProjectileBase);

var _Arrow_ = __webpack_require__(36);

var _Arrow_2 = _interopRequireDefault(_Arrow_);

var _DamageArea_ = __webpack_require__(39);

var _DamageArea_2 = _interopRequireDefault(_DamageArea_);

var _Sword_ = __webpack_require__(13);

var _Sword_2 = _interopRequireDefault(_Sword_);

var _Sword_3 = __webpack_require__(14);

var _Sword_4 = _interopRequireDefault(_Sword_3);

var _Sword_5 = __webpack_require__(7);

var _Sword_6 = _interopRequireDefault(_Sword_5);

var _Shield_ = __webpack_require__(15);

var _Shield_2 = _interopRequireDefault(_Shield_);

var _Shield_3 = __webpack_require__(16);

var _Shield_4 = _interopRequireDefault(_Shield_3);

var _Shield_5 = __webpack_require__(17);

var _Shield_6 = _interopRequireDefault(_Shield_5);

var _Shield_7 = __webpack_require__(8);

var _Shield_8 = _interopRequireDefault(_Shield_7);

var _Axe_ = __webpack_require__(18);

var _Axe_2 = _interopRequireDefault(_Axe_);

var _Axe_3 = __webpack_require__(19);

var _Axe_4 = _interopRequireDefault(_Axe_3);

var _Axe_5 = __webpack_require__(20);

var _Axe_6 = _interopRequireDefault(_Axe_5);

var _Bow_ = __webpack_require__(21);

var _Bow_2 = _interopRequireDefault(_Bow_);

var _Bow_3 = __webpack_require__(22);

var _Bow_4 = _interopRequireDefault(_Bow_3);

var _Bow_5 = __webpack_require__(23);

var _Bow_6 = _interopRequireDefault(_Bow_5);

var _Mace = __webpack_require__(24);

var _Mace2 = _interopRequireDefault(_Mace);

var _Spear = __webpack_require__(9);

var _Spear2 = _interopRequireDefault(_Spear);

var _Armor_ = __webpack_require__(25);

var _Armor_2 = _interopRequireDefault(_Armor_);

var _Armor_3 = __webpack_require__(26);

var _Armor_4 = _interopRequireDefault(_Armor_3);

var _Boots_ = __webpack_require__(27);

var _Boots_2 = _interopRequireDefault(_Boots_);

var _Boots_3 = __webpack_require__(28);

var _Boots_4 = _interopRequireDefault(_Boots_3);

var _Boots_5 = __webpack_require__(29);

var _Boots_6 = _interopRequireDefault(_Boots_5);

var _Helmet_ = __webpack_require__(30);

var _Helmet_2 = _interopRequireDefault(_Helmet_);

var _Helmet_3 = __webpack_require__(31);

var _Helmet_4 = _interopRequireDefault(_Helmet_3);

var _Coin = __webpack_require__(32);

var _Coin2 = _interopRequireDefault(_Coin);

var _Health_bottle_ = __webpack_require__(10);

var _Health_bottle_2 = _interopRequireDefault(_Health_bottle_);

var _Health_bottle_3 = __webpack_require__(33);

var _Health_bottle_4 = _interopRequireDefault(_Health_bottle_3);

var _Health_bottle_5 = __webpack_require__(34);

var _Health_bottle_6 = _interopRequireDefault(_Health_bottle_5);

var _Health_bottle_7 = __webpack_require__(35);

var _Health_bottle_8 = _interopRequireDefault(_Health_bottle_7);

var _Empty_bottle_ = __webpack_require__(2);

var _Empty_bottle_2 = _interopRequireDefault(_Empty_bottle_);

var _Empty_bottle_3 = __webpack_require__(3);

var _Empty_bottle_4 = _interopRequireDefault(_Empty_bottle_3);

var _Empty_bottle_5 = __webpack_require__(4);

var _Empty_bottle_6 = _interopRequireDefault(_Empty_bottle_5);

var _Empty_bottle_7 = __webpack_require__(5);

var _Empty_bottle_8 = _interopRequireDefault(_Empty_bottle_7);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var MainGameState = function () {
    function MainGameState(map, socket) {
        _classCallCheck(this, MainGameState);

        this.map = map;
        this.hero;
        this.camera;
        this.socket = socket;
        this.fullscreenState = false;
        this.loader = new _Loader2.default();
        this.otherPlayers = [];
        this.connected = false;
        this.nonCharacterObjects = [];
        //this.NPCObjects = [];
        this.spawners = [];
        this.projectiles = [];
        this.mobileKeyPressed = 0;
        this._previousElapsed = 0;
        this.isMousePressed = true;
        this.loadassets = this.load();
    }

    //showCustomMenu() {
    //
    //}

    _createClass(MainGameState, [{
        key: "start",
        value: function start() {
            document.querySelector("body").innerHTML = "<canvas id=\"game\" width=\"512\" height=\"512\"></canvas>";
            this.ctx = document.querySelector("#game").getContext('2d');
            this.ctx.width = window.innerWidth;
            this.ctx.height = window.innerHeight;

            Promise.all(this.loadassets).then(function (loaded) {
                this.init();

                //if user is on mobile platform check?
                var check = false;
                (function (a) {
                    if (/(android|bb\d+|meego).+mobile|avantgo|bada\/|blackberry|blazer|compal|elaine|fennec|hiptop|iemobile|ip(hone|od)|iris|kindle|lge |maemo|midp|mmp|mobile.+firefox|netfront|opera m(ob|in)i|palm( os)?|phone|p(ixi|re)\/|plucker|pocket|psp|series(4|6)0|symbian|treo|up\.(browser|link)|vodafone|wap|windows ce|xda|xiino|android|ipad|playbook|silk/i.test(a) || /1207|6310|6590|3gso|4thp|50[1-6]i|770s|802s|a wa|abac|ac(er|oo|s\-)|ai(ko|rn)|al(av|ca|co)|amoi|an(ex|ny|yw)|aptu|ar(ch|go)|as(te|us)|attw|au(di|\-m|r |s )|avan|be(ck|ll|nq)|bi(lb|rd)|bl(ac|az)|br(e|v)w|bumb|bw\-(n|u)|c55\/|capi|ccwa|cdm\-|cell|chtm|cldc|cmd\-|co(mp|nd)|craw|da(it|ll|ng)|dbte|dc\-s|devi|dica|dmob|do(c|p)o|ds(12|\-d)|el(49|ai)|em(l2|ul)|er(ic|k0)|esl8|ez([4-7]0|os|wa|ze)|fetc|fly(\-|_)|g1 u|g560|gene|gf\-5|g\-mo|go(\.w|od)|gr(ad|un)|haie|hcit|hd\-(m|p|t)|hei\-|hi(pt|ta)|hp( i|ip)|hs\-c|ht(c(\-| |_|a|g|p|s|t)|tp)|hu(aw|tc)|i\-(20|go|ma)|i230|iac( |\-|\/)|ibro|idea|ig01|ikom|im1k|inno|ipaq|iris|ja(t|v)a|jbro|jemu|jigs|kddi|keji|kgt( |\/)|klon|kpt |kwc\-|kyo(c|k)|le(no|xi)|lg( g|\/(k|l|u)|50|54|\-[a-w])|libw|lynx|m1\-w|m3ga|m50\/|ma(te|ui|xo)|mc(01|21|ca)|m\-cr|me(rc|ri)|mi(o8|oa|ts)|mmef|mo(01|02|bi|de|do|t(\-| |o|v)|zz)|mt(50|p1|v )|mwbp|mywa|n10[0-2]|n20[2-3]|n30(0|2)|n50(0|2|5)|n7(0(0|1)|10)|ne((c|m)\-|on|tf|wf|wg|wt)|nok(6|i)|nzph|o2im|op(ti|wv)|oran|owg1|p800|pan(a|d|t)|pdxg|pg(13|\-([1-8]|c))|phil|pire|pl(ay|uc)|pn\-2|po(ck|rt|se)|prox|psio|pt\-g|qa\-a|qc(07|12|21|32|60|\-[2-7]|i\-)|qtek|r380|r600|raks|rim9|ro(ve|zo)|s55\/|sa(ge|ma|mm|ms|ny|va)|sc(01|h\-|oo|p\-)|sdk\/|se(c(\-|0|1)|47|mc|nd|ri)|sgh\-|shar|sie(\-|m)|sk\-0|sl(45|id)|sm(al|ar|b3|it|t5)|so(ft|ny)|sp(01|h\-|v\-|v )|sy(01|mb)|t2(18|50)|t6(00|10|18)|ta(gt|lk)|tcl\-|tdg\-|tel(i|m)|tim\-|t\-mo|to(pl|sh)|ts(70|m\-|m3|m5)|tx\-9|up(\.b|g1|si)|utst|v400|v750|veri|vi(rg|te)|vk(40|5[0-3]|\-v)|vm40|voda|vulc|vx(52|53|60|61|70|80|81|83|85|98)|w3c(\-| )|webc|whit|wi(g |nc|nw)|wmlb|wonu|x700|yas\-|your|zeto|zte\-/i.test(a.substr(0, 4))) check = true;
                })(navigator.userAgent || navigator.vendor || window.opera);
                this.onMobile = check;

                if (this.onMobile) {
                    document.ontouchmove = function (event) {
                        this.onMouseMove(event);
                    }.bind(this);
                    document.ontouchstart = function (event) {
                        this.onMouseDown(event);
                    }.bind(this);
                    document.ontouchend = function (event) {
                        this.onMouseUp(event);
                    }.bind(this);
                } else {
                    document.onmousemove = function (event) {
                        this.onMouseMove(event);
                    }.bind(this);
                    document.onmousedown = function (event) {
                        this.onMouseDown(event);
                    }.bind(this);
                    document.onmouseup = function (event) {
                        this.onMouseUp(event);
                    }.bind(this);
                }
                window.requestAnimationFrame(function (elapsed) {
                    this.draw(elapsed);
                }.bind(this));
                window.oncontextmenu = function () {
                    return false; // cancel default menu
                }.bind(this);
            }.bind(this));
        }
    }, {
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
            //delta = Math.min(delta, 0.25); // maximum delta of 250 ms
            this._previousElapsed = elapsed;

            //let in update == delta, see commented code above
            this.update(delta);
            this.render(delta);
        }
    }, {
        key: "setSound",
        value: function setSound(sound) {
            sound.loop = true;
            sound.volume = 0.1;
            sound.play().then(function () {});
        }
    }, {
        key: "setUser",
        value: function setUser(user) {
            // Use data from server
            this.overwriteHero = {};
            this.overwriteHero.id = user._id;
            this.overwriteHero.x = user.position.x;
            this.overwriteHero.y = user.position.y;
            this.overwriteHero.health = user.health;
            this.overwriteHero.tileLevel = user.tileLevel;
            this.overwriteHero.token = user.token;
            this.overwriteHero.level = user.level;
            this.overwriteHero.xp = user.xp;
            this.overwriteHero.questsCompleted = user.questsCompleted;
            this.overwriteHero.stats = user.stats;
            this.wasPvpEnabled = user.pvp;
            this.overwriteInventory = user.items;
        }
    }, {
        key: "loadNonCharacterObjects",
        value: function loadNonCharacterObjects(objects) {
            var _this = this;

            this.nonCharacterObjects = [];
            objects.forEach(function (object) {
                _this.createNonCharacterObject(object);
            });
        }
    }, {
        key: "createNonCharacterObject",
        value: function createNonCharacterObject(object) {
            switch (object.name) {
                case "Fire":
                    this.nonCharacterObjects.push(new _Fire2.default(this.loader, object.id, object.x, object.y));
                    break;

                case "Coin":
                    this.nonCharacterObjects.push(new _DroppedItem2.default(this.loader, object.id, object.x, object.y, 16, 16, "coin", object.properties.Count));
                    break;

                default:
                    this.nonCharacterObjects.push(new _DroppedItem2.default(this.loader, object.id, object.x, object.y, 32, 32, object.name, object.properties.Count));
                    break;
            }
        }
    }, {
        key: "loadNPCs",
        value: function loadNPCs(npcs) {
            var _this2 = this;

            this.spawners = [];
            npcs.forEach(function (npc) {
                var bounds = {
                    x: npc.x,
                    y: npc.y,
                    width: npc.width,
                    height: npc.height
                };
                _this2.spawners.push(new _SpawnerBase2.default(bounds, npc.name, _this2.loader, npc.properties.Count, _this2.map));
            });
        }
    }, {
        key: "loadSpawners",
        value: function loadSpawners(spawners) {
            var _this3 = this;

            this.spawners = [];
            spawners.forEach(function (spawner) {
                _this3.spawners.push(new _SpawnerBase2.default(spawner.bounds, spawner.type, _this3.loader, spawner.count, _this3.map, spawner.id, spawner.units));
            });
        }
    }, {
        key: "loadInventoryObjects",
        value: function loadInventoryObjects() {
            var _this4 = this;

            var inventoryObjects = [];
            this.overwriteInventory.forEach(function (item) {
                _this4.createInventoryObject(inventoryObjects, item);
            });
            this.inventoryManager = new _InventoryManager2.default(inventoryObjects, this.loader, this.hero, this.projectiles, this.map);
        }
    }, {
        key: "createInventoryObject",
        value: function createInventoryObject(inventoryObjects, object) {
            switch (object.name) {
                case "sword_1":
                    inventoryObjects.push(new _Sword_2.default(this.loader, object.count, object.inventoryLocation, object.actionLocation));
                    break;
                case "sword_2":
                    inventoryObjects.push(new _Sword_4.default(this.loader, object.count, object.inventoryLocation, object.actionLocation));
                    break;
                case "sword_3":
                    inventoryObjects.push(new _Sword_6.default(this.loader, object.count, object.inventoryLocation, object.actionLocation));
                    break;
                case "shield_1":
                    inventoryObjects.push(new _Shield_2.default(this.loader, object.count, object.inventoryLocation, object.actionLocation, object.isEquipped));
                    break;
                case "shield_2":
                    inventoryObjects.push(new _Shield_4.default(this.loader, object.count, object.inventoryLocation, object.actionLocation, object.isEquipped));
                    break;
                case "shield_3":
                    inventoryObjects.push(new _Shield_6.default(this.loader, object.count, object.inventoryLocation, object.actionLocation, object.isEquipped));
                    break;
                case "shield_4":
                    inventoryObjects.push(new _Shield_8.default(this.loader, object.count, object.inventoryLocation, object.actionLocation, object.isEquipped));
                    break;
                case "axe_1":
                    inventoryObjects.push(new _Axe_2.default(this.loader, object.count, object.inventoryLocation, object.actionLocation));
                    break;
                case "axe_2":
                    inventoryObjects.push(new _Axe_4.default(this.loader, object.count, object.inventoryLocation, object.actionLocation));
                    break;
                case "axe_3":
                    inventoryObjects.push(new _Axe_6.default(this.loader, object.count, object.inventoryLocation, object.actionLocation));
                    break;
                case "bow_1":
                    inventoryObjects.push(new _Bow_2.default(this.loader, object.count, object.inventoryLocation, object.actionLocation));
                    break;
                case "bow_2":
                    inventoryObjects.push(new _Bow_4.default(this.loader, object.count, object.inventoryLocation, object.actionLocation));
                    break;
                case "bow_3":
                    inventoryObjects.push(new _Bow_6.default(this.loader, object.count, object.inventoryLocation, object.actionLocation));
                    break;
                case "mace":
                    inventoryObjects.push(new _Mace2.default(this.loader, object.count, object.inventoryLocation, object.actionLocation));
                    break;
                case "spear":
                    inventoryObjects.push(new _Spear2.default(this.loader, object.count, object.inventoryLocation, object.actionLocation));
                    break;
                case "armor_1":
                    inventoryObjects.push(new _Armor_2.default(this.loader, object.count, object.inventoryLocation, object.actionLocation, object.isEquipped));
                    break;
                case "armor_2":
                    inventoryObjects.push(new _Armor_4.default(this.loader, object.count, object.inventoryLocation, object.actionLocation, object.isEquipped));
                    break;
                case "boots_1":
                    inventoryObjects.push(new _Boots_2.default(this.loader, object.count, object.inventoryLocation, object.actionLocation, object.isEquipped));
                    break;
                case "boots_2":
                    inventoryObjects.push(new _Boots_4.default(this.loader, object.count, object.inventoryLocation, object.actionLocation, object.isEquipped));
                    break;
                case "boots_3":
                    inventoryObjects.push(new _Boots_6.default(this.loader, object.count, object.inventoryLocation, object.actionLocation, object.isEquipped));
                    break;
                case "helmet_1":
                    inventoryObjects.push(new _Helmet_2.default(this.loader, object.count, object.inventoryLocation, object.actionLocation, object.isEquipped));
                    break;
                case "helmet_2":
                    inventoryObjects.push(new _Helmet_4.default(this.loader, object.count, object.inventoryLocation, object.actionLocation, object.isEquipped));
                    break;
                case "coin":
                    inventoryObjects.push(new _Coin2.default(this.loader, object.count, object.inventoryLocation, object.actionLocation));
                    break;
                case "health_bottle_1":
                    inventoryObjects.push(new _Health_bottle_2.default(this.loader, object.count, object.inventoryLocation, object.actionLocation));
                    break;
                case "health_bottle_2":
                    inventoryObjects.push(new _Health_bottle_4.default(this.loader, object.count, object.inventoryLocation, object.actionLocation));
                    break;
                case "health_bottle_3":
                    inventoryObjects.push(new _Health_bottle_6.default(this.loader, object.count, object.inventoryLocation, object.actionLocation));
                    break;
                case "health_bottle_4":
                    inventoryObjects.push(new _Health_bottle_8.default(this.loader, object.count, object.inventoryLocation, object.actionLocation));
                    break;
                case "empty_bottle_1":
                    inventoryObjects.push(new _Empty_bottle_2.default(this.loader, object.count, object.inventoryLocation, object.actionLocation));
                    break;
                case "empty_bottle_2":
                    inventoryObjects.push(new _Empty_bottle_4.default(this.loader, object.count, object.inventoryLocation, object.actionLocation));
                    break;
                case "empty_bottle_3":
                    inventoryObjects.push(new _Empty_bottle_6.default(this.loader, object.count, object.inventoryLocation, object.actionLocation));
                    break;
                case "empty_bottle_4":
                    inventoryObjects.push(new _Empty_bottle_8.default(this.loader, object.count, object.inventoryLocation, object.actionLocation));
                    break;
            }
        }

        // send map in this

    }, {
        key: "init",
        value: function init() {
            this.keyboard = new _Keyboard2.default(this);
            this.keyboard.listenForEvents([this.keyboard.LEFT, this.keyboard.RIGHT, this.keyboard.UP, this.keyboard.DOWN, this.keyboard.A, this.keyboard.D, this.keyboard.W, this.keyboard.S], [this.keyboard.I, this.keyboard.C, this.keyboard.T, this.keyboard.Q]);

            this.imageBarEmpty = this.loader.getImage("bar_empty");
            this.imageBarBlueFill = this.loader.getImage("bar_blue_fill");
            this.imageBarRedFill = this.loader.getImage("bar_red_fill");
            this.imagePvp = this.loader.getImage("pvp");
            this.tileAtlas = this.loader.getImage('tiles');

            var sound = this.loader.getSound("ambience");
            this.setSound(sound);

            this.hero = new _Hero2.default(this.map, this.overwriteHero.x, this.overwriteHero.y, this.overwriteHero.id, this.overwriteHero.health, this.overwriteHero.tileLevel, this.overwriteHero.xp, this.overwriteHero.level, this.overwriteHero.questsCompleted, this.overwriteHero.stats, this.wasPvpEnabled, this.overwriteHero.token, this.loader);

            this.camera = new _Camera2.default(this.map, window.innerWidth, window.innerHeight);
            this.loadInventoryObjects();

            this.map.loadMap('../../assets/map/map.json', this.camera, this.hero, function (objects, npcs) {
                this.socket.emit("new_user", this.hero.getSmallObject(this.inventoryManager.getSmallObject()));
                this.loadSocket(this.socket);
                //this.loadNonCharacterObjects(objects);
                //this.loadNPCs(npcs);
            }.bind(this));
            this.events();
        }
    }, {
        key: "numPressed",
        value: function numPressed(num) {
            this.inventoryManager.numPressed(num);
        }
    }, {
        key: "keyPressed",
        value: function keyPressed(keyCode) {
            this.inventoryManager.keyPressed(keyCode, this.keyboard);
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
            var _this5 = this;

            client.on('connect', function () {
                _this5.connected = true;
                clearTimeout(_this5.timeout);
                console.log('connected');
            });
            client.on('disconnect', function () {
                _this5.connected = false;
                console.log('disconnected');
                _this5.retryConnectOnFailure(3000, client, _this5); // Try again in 3s
            });
            client.on("otherPlayers", function (othersJsonString) {
                _this5.otherPlayers = [];
                var others = JSON.parse(othersJsonString);
                others.forEach(function (playerJsonString) {
                    var player = JSON.parse(playerJsonString);
                    if (player.id != _this5.hero.id) {
                        _this5.otherPlayers.push(new _OtherPlayer2.default(player, _this5.loader, _this5.map));
                    }
                });
            });
            client.on("New_connection", function (playerString) {
                var player = JSON.parse(playerString);
                _this5.otherPlayers.push(new _OtherPlayer2.default(player, _this5.loader, _this5.map));
            });
            client.on("user_leave", function (playerString) {
                var player = JSON.parse(playerString);
                //console.log('player left');
                var toDeleteIndex = 0;
                for (var _i = 0; _i < _this5.otherPlayers.length; _i++) {
                    if (_this5.otherPlayers[_i].id === player.id) toDeleteIndex = _i;
                }
                _this5.otherPlayers.splice(i, 1);
                //this.otherPlayers.push(new OtherPlayer(hero, this.loader, this.map));
            });
            client.on("updatingPlayer", function (heroString) {
                var found = false; // is player in cache
                var hero = JSON.parse(heroString);
                _this5.otherPlayers.forEach(function (player) {
                    if (player.id === hero.id) {
                        //console.log('info from ' + player.id);
                        player.action = hero.action;
                        player.x = hero.x;
                        player.y = hero.y;
                        player.tileLevel = hero.tileLevel;
                        player.health = hero.health;
                        player.pvp = hero.pvp;
                        player.topText = hero.topText;
                        player.level = hero.level;
                        found = true;
                    }
                });
                if (!found) {
                    _this5.otherPlayers.push(new _OtherPlayer2.default(hero, _this5.loader, _this5.map));
                }
            });
            client.on("allObjects", function (objectsString) {
                var objects = JSON.parse(objectsString);
                _this5.loadNonCharacterObjects(objects);
            });
            client.on("newProjectile", function (projectileJsonString) {
                var projectile = JSON.parse(projectileJsonString);
                var newProjectile = null;
                switch (projectile.name) {
                    case "Arrow_1":
                        newProjectile = new _Arrow_2.default(projectile.id, _this5.loader, projectile.playerId, projectile.x, projectile.y, projectile.angleInRadians, projectile.strength, _this5.map);
                        break;
                    case "DamageArea_1":
                        newProjectile = new _DamageArea_2.default(projectile.id, _this5.loader, projectile.playerId, projectile.x, projectile.y, projectile.angleInRadians, projectile.strength, _this5.map);
                        break;
                }

                _this5.inventoryManager.damageAreas.push(newProjectile);
            });
            client.on("allSpawners", function (spawnersString) {
                var spawners = JSON.parse(spawnersString);
                _this5.loadSpawners(spawners);
            });
            client.on("newUnit", function (unitString) {
                var unit = JSON.parse(unitString);
                //console.log(unit);
                _this5.spawners.forEach(function (spawner) {
                    spawner.newUnit(unit);
                });
            });
            client.on("updateUnit", function (unitString) {
                var unit = JSON.parse(unitString);
                _this5.spawners.forEach(function (spawner) {
                    spawner.updateUnit(unit);
                });
            });
        }
    }, {
        key: "updateUnit",
        value: function updateUnit(unitJsonString) {
            this.socket.emit("updateUnit", unitJsonString);
        }
    }, {
        key: "load",
        value: function load() {
            return [this.loader.loadImage('tiles', '../../assets/map/tileset.png'), this.loader.loadImage('hero', '../../assets/sprites/george.png'), this.loader.loadImage('death', '../../assets/sprites/deathAnimation.png'), this.loader.loadImage('otherPlayer', '../../assets/sprites/other.png'), this.loader.loadImage('fire', '../../assets/sprites/CampFire.png'), this.loader.loadImage('inventoryTileSet', '../../assets/sprites/inventoryManager.png'), this.loader.loadImage('iconbar', '../../assets/sprites/iconBar.png'), this.loader.loadImage('characterModel', '../../assets/sprites/characterModel.png'), this.loader.loadImage('goblin', '../../assets/sprites/goblin.png'), this.loader.loadImage('sheep', '../../assets/sprites/sheep.png'), this.loader.loadImage('slime', '../../assets/sprites/slime.png'), this.loader.loadImage('dog', '../../assets/sprites/dog.png'), this.loader.loadImage('arrow_1', '../../assets/sprites/arrow.png'), this.loader.loadImage('damageArea_1', '../../assets/sprites/melee_attack.png'), this.loader.loadImage('bar_empty', '../../assets/sprites/bar_empty.png'), this.loader.loadImage('bar_red_fill', '../../assets/sprites/bar_red_fill.png'), this.loader.loadImage('bar_blue_fill', '../../assets/sprites/bar_blue_fill.png'), this.loader.loadImage('levelToLow', '../../assets/sprites/inventory/LevelToLow.png'), this.loader.loadImage('pvp', '../../assets/sprites/pvp.png'), this.loader.loadImage('otherPlayerPVP', '../../assets/sprites/otherPlayerPVP.png'),

            // InventoryItems
            this.loader.loadImage('sword_1', '../../assets/sprites/inventory/W_Dagger002.png'), this.loader.loadImage('sword_2', '../../assets/sprites/inventory/W_Dagger003.png'), this.loader.loadImage('sword_3', '../../assets/sprites/inventory/W_Dagger005.png'), this.loader.loadImage('shield_1', '../../assets/sprites/inventory/E_Wood01.png'), this.loader.loadImage('shield_2', '../../assets/sprites/inventory/E_Wood02.png'), this.loader.loadImage('shield_3', '../../assets/sprites/inventory/E_Wood03.png'), this.loader.loadImage('shield_4', '../../assets/sprites/inventory/E_Metal04.png'), this.loader.loadImage('axe_1', '../../assets/sprites/inventory/W_Axe001.png'), this.loader.loadImage('axe_2', '../../assets/sprites/inventory/W_Axe002.png'), this.loader.loadImage('axe_3', '../../assets/sprites/inventory/W_Axe007.png'), this.loader.loadImage('bow_1', '../../assets/sprites/inventory/W_Bow01.png'), this.loader.loadImage('bow_2', '../../assets/sprites/inventory/W_Bow04.png'), this.loader.loadImage('bow_3', '../../assets/sprites/inventory/W_Bow05.png'), this.loader.loadImage('mace', '../../assets/sprites/inventory/W_Mace005.png'), this.loader.loadImage('spear', '../../assets/sprites/inventory/W_Spear001.png'), this.loader.loadImage('armor_1', '../../assets/sprites/inventory/A_Armor04.png'), this.loader.loadImage('armor_2', '../../assets/sprites/inventory/A_Armour02.png'), this.loader.loadImage('boots_1', '../../assets/sprites/inventory/A_Shoes01.png'), this.loader.loadImage('boots_2', '../../assets/sprites/inventory/A_Shoes03.png'), this.loader.loadImage('boots_3', '../../assets/sprites/inventory/A_Shoes04.png'), this.loader.loadImage('helmet_1', '../../assets/sprites/inventory/C_Elm01.png'), this.loader.loadImage('helmet_2', '../../assets/sprites/inventory/C_Elm03.png'), this.loader.loadImage('health_bottle_1', '../../assets/sprites/inventory/P_Red04.png'), this.loader.loadImage('health_bottle_2', '../../assets/sprites/inventory/P_Red02.png'), this.loader.loadImage('health_bottle_3', '../../assets/sprites/inventory/P_Red03.png'), this.loader.loadImage('health_bottle_4', '../../assets/sprites/inventory/P_Red01.png'), this.loader.loadImage('empty_bottle_1', '../../assets/sprites/inventory/I_Bottle01.png'), this.loader.loadImage('empty_bottle_2', '../../assets/sprites/inventory/I_Bottle02.png'), this.loader.loadImage('empty_bottle_3', '../../assets/sprites/inventory/I_Bottle04.png'), this.loader.loadImage('empty_bottle_4', '../../assets/sprites/inventory/I_Bottle03.png'), this.loader.loadImage('coin', '../../assets/sprites/inventory/I_GoldCoin.png'),

            //Sounds
            this.loader.loadSound('ambience', '../../assets/sounds/ambiance.mp3'), this.loader.loadSound('goblin-death', '../../assets/sounds/goblin-death.mp3'), this.loader.loadSound('goblin-death-2', '../../assets/sounds/goblin-death-2.mp3'), this.loader.loadSound('explosion', '../../assets/sounds/explosion.mp3'), this.loader.loadSound('sheep', '../../assets/sounds/sheep.mp3'), this.loader.loadSound('sheep-2', '../../assets/sounds/sheep-2.mp3'), this.loader.loadSound('sheep-3', '../../assets/sounds/sheep-3.mp3'), this.loader.loadSound('slime', '../../assets/sounds/slime.mp3'), this.loader.loadSound('default', '../../assets/sounds/default.mp3')];
        }
    }, {
        key: "sendNewDamageArea",
        value: function sendNewDamageArea(damageArea) {
            this.socket.emit("newProjectile", damageArea.getSmallObject());
        }
    }, {
        key: "update",
        value: function update(delta) {
            var _this6 = this;

            var dirx = 0;
            var diry = 0;
            if (this.keyboard.isDown(this.keyboard.LEFT) || this.keyboard.isDown(this.keyboard.A) || this.onMobile && this.mobileKeyPressed === this.keyboard.LEFT) {
                if (this.hero.action != this.hero.STATE.RUNNINGWEST) {
                    this.hero.action = this.hero.STATE.RUNNINGWEST;
                    this.socket.emit("updatePlayer", this.hero.getSmallObject(this.inventoryManager.getSmallObject()));
                }
                dirx = -1;
            } else if (this.keyboard.isDown(this.keyboard.RIGHT) || this.keyboard.isDown(this.keyboard.D) || this.onMobile && this.mobileKeyPressed === this.keyboard.RIGHT) {
                if (this.hero.action != this.hero.STATE.RUNNINGEAST) {
                    this.hero.action = this.hero.STATE.RUNNINGEAST;
                    this.socket.emit("updatePlayer", this.hero.getSmallObject(this.inventoryManager.getSmallObject()));
                }
                dirx = 1;
            } else if (this.keyboard.isDown(this.keyboard.UP) || this.keyboard.isDown(this.keyboard.W) || this.onMobile && this.mobileKeyPressed === this.keyboard.UP) {
                if (this.hero.action != this.hero.STATE.RUNNINGNORTH) {
                    this.hero.action = this.hero.STATE.RUNNINGNORTH;
                    this.socket.emit("updatePlayer", this.hero.getSmallObject(this.inventoryManager.getSmallObject()));
                }
                diry = -1;
            } else if (this.keyboard.isDown(this.keyboard.DOWN) || this.keyboard.isDown(this.keyboard.S) || this.onMobile && this.mobileKeyPressed === this.keyboard.DOWN) {
                if (this.hero.action != this.hero.STATE.RUNNINGSOUTH) {
                    this.hero.action = this.hero.STATE.RUNNINGSOUTH;
                    this.socket.emit("updatePlayer", this.hero.getSmallObject(this.inventoryManager.getSmallObject()));
                }
                diry = 1;
            } else {
                if (this.hero.action != this.hero.STATE.STOP) {
                    this.hero.action = this.hero.STATE.STOP;
                    this.socket.emit("updatePlayer", this.hero.getSmallObject(this.inventoryManager.getSmallObject()));
                }
            }
            if (this.hero.resurected) {
                this.socket.emit("updatePlayer", this.hero.getSmallObject(this.inventoryManager.getSmallObject()));
            }
            if (this.hero.isHit(this.projectiles)) {
                this.socket.emit("updatePlayer", this.hero.getSmallObject(this.inventoryManager.getSmallObject()));
            }
            this.hero.move(delta, dirx, diry);
            this.otherPlayers.forEach(function (player) {
                player.update(delta);
                player.move(delta);
                player.isHit(_this6.projectiles);
            });
            this.projectiles.forEach(function (projectile) {
                projectile.update(delta);
                if (projectile.destroyed) {
                    _this6.projectiles.splice(_this6.projectiles.indexOf(projectile), 1);
                }
            });
            this.nonCharacterObjects.forEach(function (thisObject) {
                thisObject.update(delta);
                if (thisObject.hasDamage()) {
                    var playerBounds = _this6.hero.getPlayerBounds();
                    if (thisObject.isNear(playerBounds.xMin, playerBounds.yMin, playerBounds.xMax, playerBounds.yMax)) {
                        _this6.hero.takeDamage(thisObject.doDamage());
                    }
                }
                if (thisObject.canBePickedUp) {
                    var _playerBounds = _this6.hero.getPlayerBounds();
                    if (thisObject.isNear(_playerBounds.xMin, _playerBounds.yMin, _playerBounds.xMax, _playerBounds.yMax)) {
                        var countLeft = _this6.inventoryManager.addObject(thisObject.value);
                        if (countLeft === 0) {
                            _this6.nonCharacterObjects.splice(_this6.nonCharacterObjects.indexOf(thisObject), 1);
                        } else {
                            thisObject.value.stackCount = countLeft;
                        }
                        _this6.socket.emit("updateObject", JSON.stringify(thisObject.getSmallObject()));
                    }
                }
            });

            if (this.wasPvpEnabled !== this.hero.pvp) {
                this.wasPvpEnabled = this.hero.pvp;
                this.socket.emit("updatePlayer", this.hero.getSmallObject(this.inventoryManager.getSmallObject()));
            }

            this.spawners.forEach(function (spawner) {
                spawner.update(delta, _this6.projectiles, _this6);
            });
            this.inventoryManager.update(delta);
            this.hero.update(delta);
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
            var _this7 = this;

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
            var objectLayersUnder = this.getLayersUnder(2);
            var totalLayers = this.map.layers.length;

            // draw map top layer

            var _loop = function _loop(_i2) {
                _this7._drawLayer(_i2);

                if (layersUnderPlayer === _i2) {
                    _this7.hero.draw(_this7.ctx);
                }

                if (objectLayersUnder - 1 === _i2) {
                    _this7.nonCharacterObjects.forEach(function (thisObject) {
                        thisObject.draw(_this7.ctx, _this7.camera.getScreenX(thisObject.x), _this7.camera.getScreenY(thisObject.y));
                    });

                    //this.NPCObjects.forEach(npc => {
                    //    npc.draw(this.ctx,
                    //        this.camera.getScreenX(npc.x),
                    //        this.camera.getScreenY(npc.y));
                    //});
                    _this7.spawners.forEach(function (spawner) {
                        spawner.draw(_this7.ctx, _this7.camera);
                    });

                    _this7.projectiles.forEach(function (projectile) {
                        projectile.draw(_this7.ctx, _this7.camera.getScreenX(projectile.x), _this7.camera.getScreenY(projectile.y));
                    });
                }

                _this7.otherPlayers.forEach(function (player) {
                    var thisLayersUnder = _this7.getLayersUnder(player.tileLevel);
                    if (thisLayersUnder - 1 === _i2) {
                        player.draw(_this7.ctx, _this7.camera.getScreenX(player.x), _this7.camera.getScreenY(player.y));
                    }
                });
            };

            for (var _i2 = 0; _i2 < totalLayers - 1; _i2++) {
                _loop(_i2);
            }

            this.ctx.globalAlpha = 0.5;
            this._drawLayer(totalLayers - 1);

            this.ctx.globalAlpha = 1;
            this.inventoryManager.draw(this.ctx, this.ctx.width * 0.7, 0, this.ctx.width * 0.3, this.ctx.width * 0.36, this.ctx.width * 0.3, 0, delta, this.otherPlayers);
            this._drawUI();
        }
    }, {
        key: "onMouseDown",
        value: function onMouseDown(event) {
            var mousePosition = {
                x: event.type.toLowerCase() === 'mousedown' ? event.pageX : event.touches[0].pageX,
                y: event.type.toLowerCase() === 'mousedown' ? event.pageY : event.touches[0].pageY
            };
            var width = width = this.ctx.width / 5;
            var height = width / this.imageBarEmpty.width * this.imageBarEmpty.height;
            this.pvpToggle = {
                x: width / 20,
                y: height * 3.5,
                width: height * 2,
                height: height * 2
            };

            if (this.onMobile) {
                this.mobileKeyUp = {
                    x: 80,
                    y: this.ctx.height - 130
                };
                this.mobileKeyLeft = {
                    x: 20,
                    y: this.ctx.height - 70
                };
                this.mobileKeyRight = {
                    x: 140,
                    y: this.ctx.height - 70
                };
                this.mobileKeyDown = {
                    x: 80,
                    y: this.ctx.height - 70
                };

                if (mousePosition.x > this.mobileKeyUp.x && mousePosition.x < this.mobileKeyUp.x + 50 && mousePosition.y > this.mobileKeyUp.y && mousePosition.y < this.mobileKeyUp.y + 50) {
                    this.mobileKeyPressed = this.keyboard.UP;
                } else if (mousePosition.x > this.mobileKeyRight.x && mousePosition.x < this.mobileKeyRight.x + 50 && mousePosition.y > this.mobileKeyRight.y && mousePosition.y < this.mobileKeyRight.y + 50) {
                    this.mobileKeyPressed = this.keyboard.RIGHT;
                } else if (mousePosition.x > this.mobileKeyLeft.x && mousePosition.x < this.mobileKeyLeft.x + 50 && mousePosition.y > this.mobileKeyLeft.y && mousePosition.y < this.mobileKeyLeft.y + 50) {
                    this.mobileKeyPressed = this.keyboard.LEFT;
                } else if (mousePosition.x > this.mobileKeyDown.x && mousePosition.x < this.mobileKeyDown.x + 50 && mousePosition.y > this.mobileKeyDown.y && mousePosition.y < this.mobileKeyDown.y + 50) {
                    this.mobileKeyPressed = this.keyboard.DOWN;
                } else if (!(mousePosition.x > this.pvpToggle.x && mousePosition.x < this.pvpToggle.x + this.pvpToggle.width && mousePosition.y > this.pvpToggle.y && mousePosition.y < this.pvpToggle.y + this.pvpToggle.height)) {
                    this.inventoryManager.onMouseDown(mousePosition);
                }
            } else {
                if (!(mousePosition.x > this.pvpToggle.x && mousePosition.x < this.pvpToggle.x + this.pvpToggle.width && mousePosition.y > this.pvpToggle.y && mousePosition.y < this.pvpToggle.y + this.pvpToggle.height)) {
                    this.inventoryManager.onMouseDown(mousePosition);
                }
            }
        }
    }, {
        key: "onMouseUp",
        value: function onMouseUp(event) {
            var mousePosition = {
                x: event.type.toLowerCase() === 'mouseup' ? event.pageX : event.changedTouches[0].pageX,
                y: event.type.toLowerCase() === 'mouseup' ? event.pageY : event.changedTouches[0].pageY
            };

            if (this.onMobile) {
                if (mousePosition.x > this.mobileKeyUp.x && mousePosition.x < this.mobileKeyUp.x + 50 && mousePosition.y > this.mobileKeyUp.y && mousePosition.y < this.mobileKeyUp.y + 50) {
                    this.mobileKeyPressed = 0;
                } else if (mousePosition.x > this.mobileKeyRight.x && mousePosition.x < this.mobileKeyRight.x + 50 && mousePosition.y > this.mobileKeyRight.y && mousePosition.y < this.mobileKeyRight.y + 50) {
                    this.mobileKeyPressed = 0;
                } else if (mousePosition.x > this.mobileKeyLeft.x && mousePosition.x < this.mobileKeyLeft.x + 50 && mousePosition.y > this.mobileKeyLeft.y && mousePosition.y < this.mobileKeyLeft.y + 50) {
                    this.mobileKeyPressed = 0;
                } else if (mousePosition.x > this.mobileKeyDown.x && mousePosition.x < this.mobileKeyDown.x + 50 && mousePosition.y > this.mobileKeyDown.y && mousePosition.y < this.mobileKeyDown.y + 50) {
                    this.mobileKeyPressed = 0;
                } else if (mousePosition.x > this.pvpToggle.x && mousePosition.x < this.pvpToggle.x + this.pvpToggle.width && mousePosition.y > this.pvpToggle.y && mousePosition.y < this.pvpToggle.y + this.pvpToggle.height) {
                    this.hero.pvp = !this.hero.pvp;
                } else {
                    this.inventoryManager.onMouseUp(mousePosition, this);
                }
            } else {
                if (mousePosition.x > this.pvpToggle.x && mousePosition.x < this.pvpToggle.x + this.pvpToggle.width && mousePosition.y > this.pvpToggle.y && mousePosition.y < this.pvpToggle.y + this.pvpToggle.height) {
                    this.hero.pvp = !this.hero.pvp;
                } else {
                    this.inventoryManager.onMouseUp(mousePosition, this);
                }
            }
        }
    }, {
        key: "onMouseMove",
        value: function onMouseMove(event) {
            var mousePosition = {
                x: event.type.toLowerCase() === 'mousemove' ? event.pageX : event.targetTouches[0].pageX,
                y: event.type.toLowerCase() === 'mousemove' ? event.pageY : event.targetTouches[0].pageY
            };
            var width = width = this.ctx.width / 5;
            var height = width / this.imageBarEmpty.width * this.imageBarEmpty.height;
            this.pvpToggle = {
                x: width / 20,
                y: height * 3.5,
                width: height * 2,
                height: height * 2
            };

            if (this.onMobile) {
                if (mousePosition.x > this.mobileKeyUp.x && mousePosition.x < this.mobileKeyUp.x + 50 && mousePosition.y > this.mobileKeyUp.y && mousePosition.y < this.mobileKeyUp.y + 50) {
                    this.mobileKeyPressed = this.keyboard.UP;
                } else if (mousePosition.x > this.mobileKeyRight.x && mousePosition.x < this.mobileKeyRight.x + 50 && mousePosition.y > this.mobileKeyRight.y && mousePosition.y < this.mobileKeyRight.y + 50) {
                    this.mobileKeyPressed = this.keyboard.RIGHT;
                } else if (mousePosition.x > this.mobileKeyLeft.x && mousePosition.x < this.mobileKeyLeft.x + 50 && mousePosition.y > this.mobileKeyLeft.y && mousePosition.y < this.mobileKeyLeft.y + 50) {
                    this.mobileKeyPressed = this.keyboard.LEFT;
                } else if (mousePosition.x > this.mobileKeyDown.x && mousePosition.x < this.mobileKeyDown.x + 50 && mousePosition.y > this.mobileKeyDown.y && mousePosition.y < this.mobileKeyDown.y + 50) {
                    this.mobileKeyPressed = this.keyboard.DOWN;
                } else if (!(mousePosition.x > this.pvpToggle.x && mousePosition.x < this.pvpToggle.x + this.pvpToggle.width && mousePosition.y > this.pvpToggle.y && mousePosition.y < this.pvpToggle.y + this.pvpToggle.height)) {
                    this.mobileKeyPressed = 0;
                    this.inventoryManager.onMouseMove(mousePosition);
                }
            } else {
                if (!(mousePosition.x > this.pvpToggle.x && mousePosition.x < this.pvpToggle.x + this.pvpToggle.width && mousePosition.y > this.pvpToggle.y && mousePosition.y < this.pvpToggle.y + this.pvpToggle.height)) {
                    this.inventoryManager.onMouseMove(mousePosition);
                }
            }
        }
    }, {
        key: "events",
        value: function events() {
            var self = this;
            document.addEventListener("keypress", function (event) {
                if (event.key === 'f') {
                    self.fullscreen();
                }
            }, this);
            document.addEventListener("fullscreenchange", function () {
                self.fullscreenState = document.fullscreen;
            }, this);

            document.addEventListener("mozfullscreenchange", function () {
                self.fullscreenState = document.mozFullScreen;
            }, this);

            document.addEventListener("webkitfullscreenchange", function () {
                self.fullscreenState = document.webkitIsFullScreen;
            }, this);

            document.addEventListener("msfullscreenchange", function () {
                self.fullscreenState = document.msFullscreenElement;
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
            var width = this.ctx.width / 5,
                height = width / this.imageBarEmpty.width * this.imageBarEmpty.height; // Keep aspect ratio
            var tx = width / 20,
                // temporary
            ty = height / 2;

            this.ctx.drawImage(this.imageBarEmpty, tx, ty, width, height);

            if (this.hero.health > 0) {
                this.ctx.drawImage(this.imageBarRedFill, 0, 0, this.hero.health / this.hero.maxHealth * this.imageBarRedFill.width, this.imageBarRedFill.height, tx, ty, this.hero.health / this.hero.maxHealth * width, height);
            }

            ty += 1.5 * height;

            this.ctx.drawImage(this.imageBarEmpty, tx, ty, width, height);

            if (this.hero.xp > 0) {
                this.ctx.drawImage(this.imageBarBlueFill, 0, 0, this.hero.xp / (this.hero.level * 100) * this.imageBarBlueFill.width, this.imageBarBlueFill.height, tx, ty, this.hero.xp / (this.hero.level * 100) * width, height);
            }

            this.ctx.font = "22px Arial";
            this.ctx.fillStyle = "white";
            this.ctx.fillText(this.hero.level, tx + width / 20, ty + height / 1.5);

            ty += 1.5 * height;

            this.ctx.drawImage(this.imagePvp, 0, this.hero.pvp ? this.imagePvp.height / 2 : 0, this.imagePvp.width, this.imagePvp.height / 2, tx, ty, height * 2, // Square
            height * 2 // Square
            );

            this.ctx.font = "22px Arial";
            this.ctx.fillStyle = "black";
            this.ctx.fillText("PVP: " + (this.hero.pvp ? "ON" : "OFF"), tx + 1, ty + height * 2.5 + 1);
            this.ctx.fillStyle = "white";
            this.ctx.fillText("PVP: " + (this.hero.pvp ? "ON" : "OFF"), tx, ty + height * 2.5);

            if (this.onMobile) {
                var _width = this.ctx.width;
                var _height = this.ctx.height;
                //draw mobile movement UI

                var buttonedge = 50;
                var padding = 10;

                //opacity
                this.ctx.globalAlpha = 0.7;
                this.ctx.fillStyle = "white";
                //left
                this.ctx.fillRect(20, _height - 70, buttonedge, buttonedge);
                //down
                this.ctx.fillRect(20 + buttonedge + padding, _height - 70, buttonedge, buttonedge);
                //right
                this.ctx.fillRect(20 + 2 * (buttonedge + padding), _height - 70, buttonedge, buttonedge);
                //up
                this.ctx.fillRect(20 + buttonedge + padding, _height - 70 - buttonedge - padding, buttonedge, buttonedge);
                this.ctx.globalAlpha = 1;
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
}();

exports.default = MainGameState;

/***/ }),
/* 46 */
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
/* 47 */
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
        //this.E = 69;
        //this.R = 82;
        //this.X = 88;
        this.C = 67;
        this.I = 73;
        this.T = 84;
        this.Q = 81;
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
/* 48 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _get = function get(object, property, receiver) { if (object === null) object = Function.prototype; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { return get(parent, property, receiver); } } else if ("value" in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } };

var _nonCharacterObjectBase = __webpack_require__(12);

var _nonCharacterObjectBase2 = _interopRequireDefault(_nonCharacterObjectBase);

var _Sword_ = __webpack_require__(13);

var _Sword_2 = _interopRequireDefault(_Sword_);

var _Sword_3 = __webpack_require__(14);

var _Sword_4 = _interopRequireDefault(_Sword_3);

var _Sword_5 = __webpack_require__(7);

var _Sword_6 = _interopRequireDefault(_Sword_5);

var _Shield_ = __webpack_require__(15);

var _Shield_2 = _interopRequireDefault(_Shield_);

var _Shield_3 = __webpack_require__(16);

var _Shield_4 = _interopRequireDefault(_Shield_3);

var _Shield_5 = __webpack_require__(17);

var _Shield_6 = _interopRequireDefault(_Shield_5);

var _Shield_7 = __webpack_require__(8);

var _Shield_8 = _interopRequireDefault(_Shield_7);

var _Axe_ = __webpack_require__(18);

var _Axe_2 = _interopRequireDefault(_Axe_);

var _Axe_3 = __webpack_require__(19);

var _Axe_4 = _interopRequireDefault(_Axe_3);

var _Axe_5 = __webpack_require__(20);

var _Axe_6 = _interopRequireDefault(_Axe_5);

var _Bow_ = __webpack_require__(21);

var _Bow_2 = _interopRequireDefault(_Bow_);

var _Bow_3 = __webpack_require__(22);

var _Bow_4 = _interopRequireDefault(_Bow_3);

var _Bow_5 = __webpack_require__(23);

var _Bow_6 = _interopRequireDefault(_Bow_5);

var _Mace = __webpack_require__(24);

var _Mace2 = _interopRequireDefault(_Mace);

var _Spear = __webpack_require__(9);

var _Spear2 = _interopRequireDefault(_Spear);

var _Armor_ = __webpack_require__(25);

var _Armor_2 = _interopRequireDefault(_Armor_);

var _Armor_3 = __webpack_require__(26);

var _Armor_4 = _interopRequireDefault(_Armor_3);

var _Boots_ = __webpack_require__(27);

var _Boots_2 = _interopRequireDefault(_Boots_);

var _Boots_3 = __webpack_require__(28);

var _Boots_4 = _interopRequireDefault(_Boots_3);

var _Boots_5 = __webpack_require__(29);

var _Boots_6 = _interopRequireDefault(_Boots_5);

var _Helmet_ = __webpack_require__(30);

var _Helmet_2 = _interopRequireDefault(_Helmet_);

var _Helmet_3 = __webpack_require__(31);

var _Helmet_4 = _interopRequireDefault(_Helmet_3);

var _Coin = __webpack_require__(32);

var _Coin2 = _interopRequireDefault(_Coin);

var _Health_bottle_ = __webpack_require__(10);

var _Health_bottle_2 = _interopRequireDefault(_Health_bottle_);

var _Health_bottle_3 = __webpack_require__(33);

var _Health_bottle_4 = _interopRequireDefault(_Health_bottle_3);

var _Health_bottle_5 = __webpack_require__(34);

var _Health_bottle_6 = _interopRequireDefault(_Health_bottle_5);

var _Health_bottle_7 = __webpack_require__(35);

var _Health_bottle_8 = _interopRequireDefault(_Health_bottle_7);

var _Empty_bottle_ = __webpack_require__(2);

var _Empty_bottle_2 = _interopRequireDefault(_Empty_bottle_);

var _Empty_bottle_3 = __webpack_require__(3);

var _Empty_bottle_4 = _interopRequireDefault(_Empty_bottle_3);

var _Empty_bottle_5 = __webpack_require__(4);

var _Empty_bottle_6 = _interopRequireDefault(_Empty_bottle_5);

var _Empty_bottle_7 = __webpack_require__(5);

var _Empty_bottle_8 = _interopRequireDefault(_Empty_bottle_7);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

// inventoryItems


var DroppedItem = function (_NonCharacterObject) {
    _inherits(DroppedItem, _NonCharacterObject);

    function DroppedItem(loader, id, x, y, width, height, type, count) {
        _classCallCheck(this, DroppedItem);

        var _this = _possibleConstructorReturn(this, (DroppedItem.__proto__ || Object.getPrototypeOf(DroppedItem)).call(this, id, x, y, width, height, 0, false));

        _this.type = type;

        switch (type) {
            case "coin":
                _this.setImage(loader.getImage('coin'));
                _this.value = new _Coin2.default(loader, count);
                break;

            case "Armor_1":
                _this.setImage(loader.getImage('armor_1'));
                _this.value = new _Armor_2.default(loader, count);
                break;

            case "Armor_2":
                _this.setImage(loader.getImage('armor_2'));
                _this.value = new _Armor_4.default(loader, count);
                break;

            case "Axe_1":
                _this.setImage(loader.getImage('axe_1'));
                _this.value = new _Axe_2.default(loader, count);
                break;

            case "Axe_2":
                _this.setImage(loader.getImage('axe_2'));
                _this.value = new _Axe_4.default(loader, count);
                break;

            case "Axe_3":
                _this.setImage(loader.getImage('axe_3'));
                _this.value = new _Axe_6.default(loader, count);
                break;

            case "Boots_1":
                _this.setImage(loader.getImage('boots_1'));
                _this.value = new _Boots_2.default(loader, count);
                break;

            case "Boots_2":
                _this.setImage(loader.getImage('boots_2'));
                _this.value = new _Boots_4.default(loader, count);
                break;

            case "Boots_3":
                _this.setImage(loader.getImage('boots_3'));
                _this.value = new _Boots_6.default(loader, count);
                break;

            case "Bow_1":
                _this.setImage(loader.getImage('bow_1'));
                _this.value = new _Bow_2.default(loader, count);
                break;

            case "Bow_2":
                _this.setImage(loader.getImage('bow_2'));
                _this.value = new _Bow_4.default(loader, count);
                break;

            case "Bow_3":
                _this.setImage(loader.getImage('bow_3'));
                _this.value = new _Bow_6.default(loader, count);
                break;

            case "Empty_bottle_1":
                _this.setImage(loader.getImage('empty_bottle_1'));
                _this.value = new _Empty_bottle_2.default(loader, count);
                break;

            case "Empty_bottle_2":
                _this.setImage(loader.getImage('empty_bottle_2'));
                _this.value = new _Empty_bottle_4.default(loader, count);
                break;

            case "Empty_bottle_3":
                _this.setImage(loader.getImage('empty_bottle_3'));
                _this.value = new _Empty_bottle_6.default(loader, count);
                break;

            case "Empty_bottle_4":
                _this.setImage(loader.getImage('empty_bottle_4'));
                _this.value = new _Empty_bottle_8.default(loader, count);
                break;

            case "Health_bottle_1":
                _this.setImage(loader.getImage('health_bottle_1'));
                _this.value = new _Health_bottle_2.default(loader, count);
                break;

            case "Health_bottle_2":
                _this.setImage(loader.getImage('health_bottle_2'));
                _this.value = new _Health_bottle_4.default(loader, count);
                break;

            case "Health_bottle_3":
                _this.setImage(loader.getImage('health_bottle_3'));
                _this.value = new _Health_bottle_6.default(loader, count);
                break;

            case "Health_bottle_4":
                _this.setImage(loader.getImage('health_bottle_4'));
                _this.value = new _Health_bottle_8.default(loader, count);
                break;

            case "Helmet_1":
                _this.setImage(loader.getImage('helmet_1'));
                _this.value = new _Helmet_2.default(loader, count);
                break;

            case "Helmet_2":
                _this.setImage(loader.getImage('helmet_2'));
                _this.value = new _Helmet_4.default(loader, count);
                break;

            case "Mace":
                _this.setImage(loader.getImage('mace'));
                _this.value = new _Mace2.default(loader, count);
                break;

            case "Shield_1":
                _this.setImage(loader.getImage('shield_1'));
                _this.value = new _Shield_2.default(loader, count);
                break;

            case "Shield_2":
                _this.setImage(loader.getImage('shield_2'));
                _this.value = new _Shield_4.default(loader, count);
                break;

            case "Shield_3":
                _this.setImage(loader.getImage('shield_3'));
                _this.value = new _Shield_6.default(loader, count);
                break;

            case "Shield_4":
                _this.setImage(loader.getImage('shield_4'));
                _this.value = new _Shield_8.default(loader, count);
                break;

            case "Spear":
                _this.setImage(loader.getImage('spear'));
                _this.value = new _Spear2.default(loader, count);
                break;

            case "Sword_1":
                _this.setImage(loader.getImage('sword_1'));
                _this.value = new _Sword_2.default(loader, count);
                break;

            case "Sword_2":
                _this.setImage(loader.getImage('sword_2'));
                _this.value = new _Sword_4.default(loader, count);
                break;

            case "Sword_3":
                _this.setImage(loader.getImage('sword_3'));
                _this.value = new _Sword_6.default(loader, count);
                break;

            default:
                throw new Error("type '" + type + "' not found in DroppedItem");
        }

        _this.canBePickedUp = true;
        return _this;
    }

    _createClass(DroppedItem, [{
        key: "getSmallObject",
        value: function getSmallObject() {
            var smallObject = _get(DroppedItem.prototype.__proto__ || Object.getPrototypeOf(DroppedItem.prototype), "getSmallObject", this).call(this);
            smallObject.canBePickedUp = this.canBePickedUp;
            smallObject.value = this.value;
            return smallObject;
        }
    }]);

    return DroppedItem;
}(_nonCharacterObjectBase2.default);

exports.default = DroppedItem;

/***/ }),
/* 49 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _Goblin = __webpack_require__(50);

var _Goblin2 = _interopRequireDefault(_Goblin);

var _Sheep = __webpack_require__(51);

var _Sheep2 = _interopRequireDefault(_Sheep);

var _Slime = __webpack_require__(52);

var _Slime2 = _interopRequireDefault(_Slime);

var _Dog = __webpack_require__(53);

var _Dog2 = _interopRequireDefault(_Dog);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var Spawner = function () {
    function Spawner(bounds, type, loader, count, map, id, units) {
        var _this = this;

        _classCallCheck(this, Spawner);

        this.tileLevel = 0;
        this.id = id;
        this.bounds = bounds;
        this.type = type;
        this.loader = loader;
        this.count = count;
        this.map = map;
        this.units = [];
        this.timeToCreate = 0;

        if (units === undefined) {
            for (var i = 0; i < count; i++) {
                this.units.push(this.createOfType(type));
            }
        } else {
            units.forEach(function (unit) {
                _this.units.push(_this.createUnit(unit));
            });
        }
    }

    _createClass(Spawner, [{
        key: "update",
        value: function update(delta, projectiles, parent) {
            var _this2 = this;

            //if (this.units.length < this.count) {
            //    if (this.timeToCreate < 10) {
            //        this.timeToCreate += delta;
            //    } else {
            //        this.timeToCreate = 0;
            //        this.units.push(this.createOfType(this.type));
            //    }
            //}
            this.units.forEach(function (unit) {
                unit.update(delta, _this2.units);
                if (unit.isHit(projectiles)) {
                    var sound = void 0;
                    var random = Math.floor(Math.random() * 10 + 1);
                    parent.updateUnit(unit.getSmallObject());
                    if (unit.health > 0) {
                        switch (unit.type) {
                            case "Goblins":
                                sound = _this2.loader.getSound("goblin-death");
                                sound.loop = false;
                                sound.volume = 1;
                                sound.play().then();
                                break;
                            case "Sheep":
                                if (random <= 3) sound = _this2.loader.getSound("sheep");else sound = _this2.loader.getSound("sheep-2");
                                sound.loop = false;
                                sound.volume = 1;
                                sound.play().then();
                                break;
                            case "Slimes":
                                sound = _this2.loader.getSound("slime");
                                sound.loop = false;
                                sound.volume = 1;
                                sound.play().then();
                                break;
                            default:
                                sound = _this2.loader.getSound("default");
                                sound.loop = false;
                                sound.volume = 1;
                                sound.play().then();
                                break;
                        }
                    } else {
                        switch (unit.type) {
                            case "Goblins":
                                parent.hero.stats.goblinKills++;
                                sound = _this2.loader.getSound("goblin-death-2");
                                sound.loop = false;
                                sound.volume = 1;
                                sound.play().then();
                                break;
                            case "Sheep":
                                parent.hero.stats.sheepKills++;
                                sound = _this2.loader.getSound("sheep-3");
                                sound.loop = false;
                                sound.volume = 1;
                                sound.play().then();
                                break;
                            case "Slimes":
                                parent.hero.stats.slimeKills++;
                                sound = _this2.loader.getSound("slime");
                                sound.loop = false;
                                sound.volume = 1;
                                sound.play().then();
                                break;
                            default:
                                sound = _this2.loader.getSound("default");
                                sound.loop = false;
                                sound.volume = 1;
                                sound.play().then();
                                break;
                        }
                        parent.hero.xp += unit.xp;
                        _this2.units.splice(_this2.units.indexOf(unit), 1);
                    }
                }
            });
        }
    }, {
        key: "newUnit",
        value: function newUnit(remoteUnit) {
            if (remoteUnit.id.startsWith(this.id)) {
                this.units.push(this.createUnit(remoteUnit));
            }
        }
    }, {
        key: "updateUnit",
        value: function updateUnit(remoteUnit) {
            if (remoteUnit.id.startsWith(this.id)) {
                this.units.forEach(function (unit) {
                    if (remoteUnit.id === unit.id) {
                        unit.x = remoteUnit.x;
                        unit.y = remoteUnit.y;
                        unit.health = remoteUnit.health;
                        unit.action = remoteUnit.action;
                        unit.doingAction = remoteUnit.doingAction;
                        switch (unit.action) {
                            case unit.STATE.RUNNINGNORTH:
                                unit.imageState = 3;
                                break;
                            case unit.STATE.RUNNINGEAST:
                                unit.imageState = 2;
                                break;
                            case unit.STATE.RUNNINGSOUTH:
                                unit.imageState = 0;
                                break;
                            case unit.STATE.RUNNINGWEST:
                                unit.imageState = 1;
                                break;
                        }
                    }
                });
            }
        }
    }, {
        key: "draw",
        value: function draw(ctx, camera) {
            this.units.forEach(function (unit) {
                unit.draw(ctx, camera.getScreenX(unit.x), camera.getScreenY(unit.y));
            });
        }
    }, {
        key: "createOfType",
        value: function createOfType(type) {
            var x = void 0,
                y = void 0,
                collision = void 0,
                unit = void 0;
            do {
                x = Math.random() * this.bounds.width + this.bounds.x;
                y = Math.random() * this.bounds.height + this.bounds.y;
                switch (type) {
                    case "Goblins":
                        unit = new _Goblin2.default(this.loader, x, y, this.map, this.bounds);
                        break;

                    case "Sheep":
                        unit = new _Sheep2.default(this.loader, x, y, this.map, this.bounds);
                        break;

                    case "Slimes":
                        unit = new _Slime2.default(this.loader, x, y, this.map, this.bounds);
                        break;

                    case "Dog":
                        unit = new _Dog2.default(this.loader, x, y, this.map, this.bounds);
                        break;

                    default:
                        console.log('Cannot create unit of type ' + type);
                        return null;
                }

                var left = x;
                var right = x + this.map.drawSize - 1;
                var top = y;
                var bottom = y + this.map.drawSize - 1;
                collision = this.map.isSolidTileAtXY(left, top, this.tileLevel) || this.map.isSolidTileAtXY(right, top, this.tileLevel) || this.map.isSolidTileAtXY(right, bottom, this.tileLevel) || this.map.isSolidTileAtXY(left, bottom, this.tileLevel) || unit.unitsOverlap(this.units);
            } while (collision);
            return unit;
        }
    }, {
        key: "createUnit",
        value: function createUnit(unit) {
            var newUnit = void 0;
            switch (unit.type) {
                case "Goblins":
                    newUnit = new _Goblin2.default(this.loader, unit.x, unit.y, this.map, this.bounds);
                    break;

                case "Sheep":
                    newUnit = new _Sheep2.default(this.loader, unit.x, unit.y, this.map, this.bounds);
                    break;

                case "Slimes":
                    newUnit = new _Slime2.default(this.loader, unit.x, unit.y, this.map, this.bounds);
                    break;

                case "Dog":
                    newUnit = new _Dog2.default(this.loader, unit.x, unit.y, this.map, this.bounds);
                    break;

                default:
                    console.log('Cannot create unit of type ' + unit.type);
                    return null;
            }
            newUnit.id = unit.id;
            newUnit.health = unit.health;
            newUnit.action = unit.action;
            newUnit.doingAction = unit.doingAction;
            switch (newUnit.action) {
                case newUnit.STATE.RUNNINGNORTH:
                    newUnit.imageState = 3;
                    break;
                case newUnit.STATE.RUNNINGEAST:
                    newUnit.imageState = 2;
                    break;
                case newUnit.STATE.RUNNINGSOUTH:
                    newUnit.imageState = 0;
                    break;
                case newUnit.STATE.RUNNINGWEST:
                    newUnit.imageState = 1;
                    break;
            }
            return newUnit;
        }
    }]);

    return Spawner;
}();

exports.default = Spawner;

/***/ }),
/* 50 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});

var _NPCObjectBase = __webpack_require__(6);

var _NPCObjectBase2 = _interopRequireDefault(_NPCObjectBase);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var Goblin = function (_NPCObject) {
    _inherits(Goblin, _NPCObject);

    function Goblin(loader, x, y, map, bounds) {
        _classCallCheck(this, Goblin);

        var _this = _possibleConstructorReturn(this, (Goblin.__proto__ || Object.getPrototypeOf(Goblin)).call(this, "Goblins", x, y, map.drawSize * 0.8, map.drawSize * 0.8, 50, 10, 3, 196, 20, false, map, bounds));

        _this.setTilesImage(loader.getImage('goblin'), 4, 4, 4);
        return _this;
    }

    return Goblin;
}(_NPCObjectBase2.default);

exports.default = Goblin;

/***/ }),
/* 51 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});

var _NPCObjectBase = __webpack_require__(6);

var _NPCObjectBase2 = _interopRequireDefault(_NPCObjectBase);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var Sheep = function (_NPCObject) {
    _inherits(Sheep, _NPCObject);

    function Sheep(loader, x, y, map, bounds) {
        _classCallCheck(this, Sheep);

        var _this = _possibleConstructorReturn(this, (Sheep.__proto__ || Object.getPrototypeOf(Sheep)).call(this, "Sheep", x, y, map.drawSize * 0.8, map.drawSize * 0.8, 10, 10, 3, 160, 5, true, map, bounds));

        _this.setTilesImage(loader.getImage('sheep'), 4, 4, 4);
        return _this;
    }

    return Sheep;
}(_NPCObjectBase2.default);

exports.default = Sheep;

/***/ }),
/* 52 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});

var _NPCObjectBase = __webpack_require__(6);

var _NPCObjectBase2 = _interopRequireDefault(_NPCObjectBase);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var Slime = function (_NPCObject) {
    _inherits(Slime, _NPCObject);

    function Slime(loader, x, y, map, bounds) {
        _classCallCheck(this, Slime);

        var _this = _possibleConstructorReturn(this, (Slime.__proto__ || Object.getPrototypeOf(Slime)).call(this, "Slimes", x, y, map.drawSize * 2, map.drawSize * 2, 500, 10, 3, 80, 100, false, map, bounds));

        _this.setTilesImage(loader.getImage('slime'), 4, 4, 4);
        return _this;
    }

    return Slime;
}(_NPCObjectBase2.default);

exports.default = Slime;

/***/ }),
/* 53 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _get = function get(object, property, receiver) { if (object === null) object = Function.prototype; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { return get(parent, property, receiver); } } else if ("value" in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } };

var _NPCObjectBase = __webpack_require__(6);

var _NPCObjectBase2 = _interopRequireDefault(_NPCObjectBase);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var Dog = function (_NPCObject) {
    _inherits(Dog, _NPCObject);

    function Dog(loader, x, y, map, bounds) {
        _classCallCheck(this, Dog);

        var _this = _possibleConstructorReturn(this, (Dog.__proto__ || Object.getPrototypeOf(Dog)).call(this, "Dog", x, y, map.drawSize * 0.8, map.drawSize * 0.8, 100000, 10, 3, 128, 20, true, map, bounds));

        _this.setTilesImage(loader.getImage('dog'), 4, 4, 4);
        return _this;
    }

    _createClass(Dog, [{
        key: "draw",
        value: function draw(ctx, screenX, screenY) {
            _get(Dog.prototype.__proto__ || Object.getPrototypeOf(Dog.prototype), "draw", this).call(this, ctx, screenX, screenY);
            ctx.font = "22px Arial";
            ctx.fillStyle = "blue";
            ctx.fillText("Pickles", screenX, screenY - 20);
        }
    }]);

    return Dog;
}(_NPCObjectBase2.default);

exports.default = Dog;

/***/ }),
/* 54 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _GameObjectBase = __webpack_require__(1);

var _GameObjectBase2 = _interopRequireDefault(_GameObjectBase);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var Hero = function (_GameObject) {
    _inherits(Hero, _GameObject);

    function Hero(map, x, y, id, health, tileLevel, xp, level, questsCompleted, stats, pvp, token, loader) {
        _classCallCheck(this, Hero);

        var _this = _possibleConstructorReturn(this, (Hero.__proto__ || Object.getPrototypeOf(Hero)).call(this));

        _this.map = map;
        _this.x = x;
        _this.y = y;
        _this.startX = 3200;
        _this.startY = 3200;
        _this.loader = loader;
        _this.debugging = false;
        _this.token = token;

        _this.health = health;
        _this.maxHealth = 100;
        _this.armor = 0;

        _this.imageIndex = 0;
        _this.imageState = 0;
        _this.width = map.drawSize;
        _this.height = map.drawSize;
        _this.imageWidth = 48;
        _this.imageHeight = 48;
        _this.maskWidth = map.drawSize * 0.65;
        _this.maskHeight = map.drawSize * 0.8;
        _this.tileLevel = tileLevel; // HeighttileLevel
        _this.STATE = {
            RUNNINGNORTH: 1,
            RUNNINGEAST: 2,
            RUNNINGSOUTH: 3,
            RUNNINGWEST: 4,
            STOP: 5
        };

        _this.action = _this.STATE.STOP;
        _this.image = _this.loader.getImage('hero');
        _this.deathAnimation = _this.loader.getImage('death');
        _this.deathAnimationCols = 5;
        _this.deathAnimationRows = 3;
        _this.deadTime = 0;
        _this.totalDeadTime = 1;
        _this.respawnTimer = 8;
        _this.dead = false;
        _this.resurected = false;
        _this.pvp = pvp;
        _this.deathSound = _this.loader.getSound("explosion");

        _this.speed = 256;
        _this.id = id;
        _this.level = level === undefined || level <= 0 ? 1 : level;
        _this.xp = xp === undefined ? 0 : xp;
        _this.questsCompleted = questsCompleted === undefined ? 0 : questsCompleted;

        try {
            _this.stats = JSON.parse(stats);
        } catch (error) {
            _this.stats = {};
            _this.stats.goblinKills = 0;
            _this.stats.sheepKills = 0;
            _this.stats.slimeKills = 0;
        }

        if (_this.debugging) {
            _this.speed = 512;
        }
        return _this;
    }

    _createClass(Hero, [{
        key: 'getSmallObject',
        value: function getSmallObject(inventory) {
            var smallObject = {};
            smallObject.token = this.token;
            smallObject.id = this.id;
            smallObject.x = Math.floor(this.x * 100) / 100;
            smallObject.y = Math.floor(this.y * 100) / 100;
            smallObject.action = this.action;
            smallObject.tileLevel = this.tileLevel;
            smallObject.health = this.health;
            smallObject.speed = this.speed;
            smallObject.xp = this.xp;
            smallObject.level = this.level;
            smallObject.questsCompleted = this.questsCompleted;
            smallObject.stats = JSON.stringify(this.stats);
            smallObject.pvp = this.pvp;
            smallObject.topText = this.topText;
            smallObject.width = this.width;
            smallObject.height = this.height;
            smallObject.resurected = this.resurected;
            smallObject.items = inventory;
            return JSON.stringify(smallObject);
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
        key: 'isHit',
        value: function isHit(projectiles) {
            if (this.pvp) {
                for (var i = 0; i < projectiles.length; i++) {
                    var projectile = projectiles[i];
                    if (projectile.playerId !== this.id && projectile.playerId !== -1) {
                        // -1 means pvp was off
                        if (this.isNear(projectile.x, projectile.y, projectile.x + projectile.width, projectile.y + projectile.height)) {
                            this.takeDamage(projectile.doDamage());
                            return true;
                        }
                    }
                }
            }
            return false;
        }
    }, {
        key: 'move',
        value: function move(delta, dirx, diry) {
            if (this.dead) return;
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
            if (this.dead) return Math.floor(this.deadTime / this.totalDeadTime * (this.deathAnimationCols * this.deathAnimationRows));
            return this.imageState + 4 * Math.floor(this.imageIndex);
        }
    }, {
        key: 'setDirection',
        value: function setDirection(state) {
            switch (state) {
                case this.STATE.RUNNINGEAST:
                    this._calculateImageState(1, 0, 0);
                    break;
                case this.STATE.RUNNINGNORTH:
                    this._calculateImageState(0, -1, 0);
                    break;
                case this.STATE.RUNNINGSOUTH:
                    this._calculateImageState(0, 1, 0);
                    break;
                case this.STATE.RUNNINGWEST:
                    this._calculateImageState(-1, 0, 0);
                    break;

                default:
                    this._calculateImageState(0, 0, 0);
                    break;
            }
        }
    }, {
        key: 'takeDamage',
        value: function takeDamage(damage) {
            if (this.dead) return;
            var damageTaken = damage - this.armor;
            if (damageTaken <= 0) return; // No damage done

            this.topText.push({
                text: "-" + damageTaken,
                fillStyle: "red",
                time: 0
            });

            this.health -= damageTaken;
            if (this.health <= 0) {
                // Die
                this.die();
            }
        }
    }, {
        key: 'die',
        value: function die() {
            this.deathSound.loop = false;
            this.deathSound.volume = 1;
            this.deathSound.play().then(function () {});
            this.deadTime = 0;
            this.dead = true;
        }
    }, {
        key: 'heal',
        value: function heal(extraHealth) {
            if (this.dead) return;
            var maxExtra = this.maxHealth - this.health;
            var healthTaken = maxExtra < extraHealth ? maxExtra : extraHealth;
            if (healthTaken <= 0) return false; // No health gain

            this.topText.push({
                text: "+" + healthTaken,
                fillStyle: "green",
                time: 0
            });

            this.health += healthTaken;
            return true;
        }
    }, {
        key: 'update',
        value: function update(delta) {
            var _this2 = this;

            if (this.dead) {
                if (this.deadTime >= this.respawnTimer) {
                    this.dead = false;
                    this.x = this.startX;
                    this.y = this.startY;
                    this.health = this.maxHealth;
                    this.topText = [];
                    this.topText.push({
                        text: "died",
                        fillStyle: "black",
                        time: 0
                    });
                    this.resurected = true;
                } else {
                    this.deadTime += delta;
                }
            } else {
                if (this.resurected) {
                    this.resurected = false;
                }
                if (this.topText.length > 0) {
                    this.topText.forEach(function (text) {
                        text.time += delta;
                        if (text.time > 2) {
                            _this2.topText.splice(_this2.topText.indexOf(text), 1);
                        }
                    });
                }
                if (this.xp >= this.level * 100) {
                    this.xp -= this.level * 100;
                    this.level += 1;
                }
            }
        }
    }, {
        key: 'draw',
        value: function draw(ctx) {
            var _this3 = this;

            if (this.dead) {
                var width = this.deathAnimation.width / this.deathAnimationCols;
                var height = this.deathAnimation.height / this.deathAnimationRows;
                ctx.drawImage(this.deathAnimation, // Image
                this.getImageIndex() % this.deathAnimationCols * width, // Src x
                Math.floor(this.getImageIndex() / this.deathAnimationCols) * height, // Src y
                width, // Src width
                height, // Src height
                this.screenX - this.width / 2, // Target x
                this.screenY - this.height / 2, // Target y
                this.width, // Target width
                this.height); // Target height
            } else {
                ctx.drawImage(this.image, // Image
                this.getImageIndex() % 4 * this.imageWidth, // Src x
                Math.floor(this.getImageIndex() / 4) * this.imageHeight, // Src y
                this.imageWidth, // Src width
                this.imageHeight, // Src height
                this.screenX - this.width / 2, // Target x
                this.screenY - this.height / 2, // Target y
                this.width, // Target width
                this.height); // Target height

                if (this.topText.length > 0) {
                    ctx.font = "20px Arial";
                    this.topText.forEach(function (text) {
                        ctx.fillStyle = text.fillStyle;
                        ctx.fillText(text.text, _this3.screenX - 15, _this3.screenY - _this3.height * (0.3 + text.time / 2));
                    });
                }
            }
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
}(_GameObjectBase2.default);

exports.default = Hero;

/***/ }),
/* 55 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _InventoryIcon = __webpack_require__(56);

var _InventoryIcon2 = _interopRequireDefault(_InventoryIcon);

var _QuestManager = __webpack_require__(57);

var _QuestManager2 = _interopRequireDefault(_QuestManager);

var _Arrow_ = __webpack_require__(36);

var _Arrow_2 = _interopRequireDefault(_Arrow_);

var _DamageArea_ = __webpack_require__(39);

var _DamageArea_2 = _interopRequireDefault(_DamageArea_);

var _Empty_bottle_ = __webpack_require__(2);

var _Empty_bottle_2 = _interopRequireDefault(_Empty_bottle_);

var _Empty_bottle_3 = __webpack_require__(3);

var _Empty_bottle_4 = _interopRequireDefault(_Empty_bottle_3);

var _Empty_bottle_5 = __webpack_require__(4);

var _Empty_bottle_6 = _interopRequireDefault(_Empty_bottle_5);

var _Empty_bottle_7 = __webpack_require__(5);

var _Empty_bottle_8 = _interopRequireDefault(_Empty_bottle_7);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var InventoryManager = function () {
    function InventoryManager(inventoryObjects, loader, hero, damageAreas, map) {
        var _this = this;

        _classCallCheck(this, InventoryManager);

        this.inventory = [];
        var i = 0;
        inventoryObjects.forEach(function (inventoryObject) {
            _this.addObject(inventoryObject);
        });

        //this.inventory = inventoryObjects;
        //let i = 0;
        //this.inventory.forEach(inventoryObject => {
        //    inventoryObject.shownLocation = i;
        //    inventoryObject.inventoryLocation = i++;
        //});

        this.imageCharacter = loader.getImage("characterModel");
        this.imageBack = loader.getImage("inventoryTileSet");
        this.imageIconBar = loader.getImage("iconbar");
        this.imageLevelToLow = loader.getImage("levelToLow");
        this.hero = hero;
        this.iterations = 8;
        this.loader = loader;
        this.damageAreas = damageAreas;
        this.map = map;
        this.backCols = 4;
        this.backRows = 4;
        this.tileBackWidth = this.imageBack.width / this.backCols;
        this.tileBackHeight = this.imageBack.height / this.backRows;
        this.loader = loader;
        this.iconBarRows = 4;
        this.tileIconBarHeight = this.imageIconBar.height / this.iconBarRows;
        this.selectedAction = 1;
        this.mousePosition = {
            x: 0,
            y: 0
        };

        this.STATES = {
            HIDDEN: 0,
            INVENTORY: 1,
            CHARACTER: 2,
            STATS: 3,
            QUESTS: 4
        };
        this.iconBar = [];
        this.iconBar.push(new _InventoryIcon2.default(this.STATES.INVENTORY, this.imageIconBar, 1, this.tileIconBarHeight));
        this.iconBar.push(new _InventoryIcon2.default(this.STATES.CHARACTER, this.imageIconBar, 2, this.tileIconBarHeight));
        this.iconBar.push(new _InventoryIcon2.default(this.STATES.STATS, this.imageIconBar, 3, this.tileIconBarHeight));
        this.iconBar.push(new _InventoryIcon2.default(this.STATES.QUESTS, this.imageIconBar, 4, this.tileIconBarHeight));

        this.actionBarIcons = [];
        for (var _i = 1; _i <= 10; _i++) {
            this.actionBarIcons[_i === 10 ? 0 : _i] = new _InventoryIcon2.default(_i === 10 ? 0 : _i, this.imageIconBar, 0, this.tileIconBarHeight);
            if (this.selectedAction === (_i === 10 ? 0 : _i)) this.actionBarIcons[_i === 10 ? 0 : _i].isSelected = true;
        }

        this.questManager = new _QuestManager2.default(this.hero, this, loader);

        this.state = this.STATES.HIDDEN;
    }

    _createClass(InventoryManager, [{
        key: "numPressed",
        value: function numPressed(num) {
            var _this2 = this;

            if (num >= 0 && num <= 9) {
                this.actionBarIcons.forEach(function (actionIcon) {
                    if (actionIcon.state === num) {
                        actionIcon.isSelected = true;
                        _this2.selectedAction = actionIcon.state;
                    } else {
                        actionIcon.isSelected = false;
                    }
                });
            }
        }
    }, {
        key: "keyPressed",
        value: function keyPressed(keyCode, keyboard) {
            var _this3 = this;

            var checkState = this.STATES.HIDDEN;

            if (keyCode === keyboard.I) {
                checkState = this.STATES.INVENTORY;
            } else if (keyCode === keyboard.C) {
                checkState = this.STATES.CHARACTER;
            } else if (keyCode === keyboard.T) {
                checkState = this.STATES.STATS;
            } else if (keyCode === keyboard.Q) {
                checkState = this.STATES.QUESTS;
            }
            this.iconBar.forEach(function (icon) {
                if (icon.state === checkState) {
                    var oldState = _this3.state;
                    if (icon.isSelected) {
                        icon.isSelected = false;
                        _this3.state = _this3.STATES.HIDDEN;
                    } else {
                        _this3.state = icon.state;
                        icon.isSelected = true;
                    }
                    if (oldState != _this3.state) {
                        _this3.iconBar.forEach(function (icon) {
                            if (icon.state != _this3.state) {
                                icon.isSelected = false;
                            }
                        });
                    }
                }
            });
        }
    }, {
        key: "getEmptyPosition",
        value: function getEmptyPosition() {
            var allInventoryPositions = [];
            for (var i = this.iterations * this.iterations - 1; i >= 0; i--) {
                allInventoryPositions.push(i);
            }
            this.inventory.forEach(function (inventoryObject) {
                if (allInventoryPositions.indexOf(inventoryObject.inventoryLocation) >= 0) {
                    allInventoryPositions.splice(allInventoryPositions.indexOf(inventoryObject.inventoryLocation), 1);
                }
            });

            if (allInventoryPositions.length > 0) {
                return allInventoryPositions[allInventoryPositions.length - 1];
            } else {
                return false;
            }
        }
    }, {
        key: "update",
        value: function update(delta) {
            var _this4 = this;

            var anyUnequiped = false;
            var position = false;
            this.inventory.forEach(function (inventoryObject) {
                if (inventoryObject.inventoryLocation === -2) {
                    anyUnequiped = true;
                }
            });
            if (anyUnequiped) {
                position = this.getEmptyPosition();
            }
            this.hero.armor = 0;
            this.inventory.forEach(function (inventoryObject) {
                inventoryObject.update(delta, position);
                if (inventoryObject.isEquiped && inventoryObject.isEquipable) {
                    _this4.hero.armor += inventoryObject.strength;
                }
            });
            this.questManager.update();
        }
    }, {
        key: "addObject",
        value: function addObject(newObject) {
            if (newObject.inventoryLocation === undefined || newObject.inventoryLocation === -1 && newObject.actionLocation === -1 && !newObject.isEquiped) {
                newObject.inventoryLocation = this.getEmptyPosition();
            }

            this.inventory.forEach(function (oldObject) {
                if (newObject.stackCount > 0) {
                    if (oldObject.typeId === newObject.typeId && oldObject.stackCount < oldObject.stackLimit) {
                        //console.log(oldObject);
                        //console.log(newObject);
                        var max = oldObject.stackLimit - oldObject.stackCount;
                        if (newObject.stackCount > max) {
                            newObject.stackCount -= max;
                            oldObject.stackCount += max;
                        } else {
                            oldObject.stackCount += newObject.stackCount;
                            newObject.stackCount = 0;
                        }
                    }
                }
            });
            if (newObject.stackCount > 0) {
                newObject.shownLocation = newObject.inventoryLocation;
                this.inventory.push(newObject);
                return 0;
            }
            return newObject.stackCount;
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
        key: "isInIconBar",
        value: function isInIconBar(x, y) {
            return this.xIcon < x && this.xIcon + this.widthSingleIcon * this.iconBar.length > x && this.yIcon - this.heightSingleIcon < y && this.yIcon > y;
        }
    }, {
        key: "onMouseDown",
        value: function onMouseDown(mousePosition) {
            var _this5 = this;

            this.inventory.forEach(function (inventoryObject) {
                if (inventoryObject.isEquiped && _this5.state === _this5.STATES.CHARACTER || !inventoryObject.isEquiped && _this5.state === _this5.STATES.INVENTORY) {
                    inventoryObject.onMouseDown(mousePosition);
                }
            });

            this.mousePosition = mousePosition;
            this.movingObject = false;
        }
    }, {
        key: "onMouseUp",
        value: function onMouseUp(mousePosition, sendNewDamageAreaListener) {
            var _this6 = this;

            if (this.movingObject) {
                if (this.isInActionBar(mousePosition.x, mousePosition.y)) {
                    this.moveAction(mousePosition, true);
                } else {
                    this.moveInventory(mousePosition, true);
                }
            } else if (!this.isInActionBar(mousePosition.x, mousePosition.y)) {
                this.equipObject();
                this.useObject();
            }

            if (!this.movingObject) {
                var oldState = this.state;
                var oldSelectedAction = this.selectedAction;
                this.iconBar.forEach(function (icon) {
                    if (icon.onMouseMove(mousePosition)) {
                        if (icon.isSelected) {
                            icon.isSelected = false;
                            _this6.state = _this6.STATES.HIDDEN;
                        } else {
                            _this6.state = icon.state;
                            icon.isSelected = true;
                        }
                    }
                });
                if (oldState != this.state) {
                    this.iconBar.forEach(function (icon) {
                        if (icon.state != _this6.state) {
                            icon.isSelected = false;
                        }
                    });
                }
                this.actionBarIcons.forEach(function (icon) {
                    if (icon.onMouseMove(mousePosition)) {
                        icon.isSelected = true;
                        _this6.selectedAction = icon.state;
                    }
                });
                if (this.selectedAction !== oldSelectedAction) {
                    this.actionBarIcons.forEach(function (icon) {
                        if (_this6.selectedAction !== icon.state) {
                            icon.isSelected = false;
                        }
                    });
                }
                if ((!this.isInInventory(mousePosition.x, mousePosition.y) || this.state === this.STATES.HIDDEN) && !this.isInActionBar(mousePosition.x, mousePosition.y) && !this.isInIconBar(mousePosition.x, mousePosition.y)) {
                    this.fireObject(mousePosition, sendNewDamageAreaListener);
                }
            }
            this.inventory.forEach(function (inventoryObject) {
                inventoryObject.onMouseUp(mousePosition);
            });
        }
    }, {
        key: "fireObject",
        value: function fireObject(mousePosition, sendNewDamageAreaListener) {
            var _this7 = this;

            this.inventory.forEach(function (inventoryObject) {
                var location = _this7.selectedAction - 1;
                if (location < 0) location = 9;
                if (inventoryObject.actionLocation === location && inventoryObject.interval === 0 && inventoryObject.levelRequired <= _this7.hero.level) {
                    if (inventoryObject.weapontype === inventoryObject.WEAPONTYPES.RANGED) {
                        inventoryObject.interval = inventoryObject.intervalTime;
                        //console.log('bow used, creating ' + inventoryObject.createObjectName);
                        switch (inventoryObject.createObjectName) {
                            case 'Arrow_1':
                                var angleInRadians = Math.atan2(mousePosition.y - _this7.hero.screenY, mousePosition.x - _this7.hero.screenX); // https://gist.github.com/conorbuck/2606166                                       
                                var projectile = new _Arrow_2.default(Math.random(), _this7.loader, _this7.hero.pvp ? _this7.hero.id : -1, _this7.hero.x, _this7.hero.y, angleInRadians, inventoryObject.strength, _this7.map);
                                sendNewDamageAreaListener.sendNewDamageArea(projectile);
                                _this7.damageAreas.push(projectile);
                                //console.log(angleInRadians + ', ' + -Math.PI / 4 * 5);
                                if (angleInRadians >= -Math.PI / 4 && angleInRadians <= Math.PI / 4) {
                                    _this7.hero.setDirection(_this7.hero.STATE.RUNNINGEAST);
                                } else if (angleInRadians <= -Math.PI / 4 && angleInRadians >= -Math.PI / 4 * 3) {
                                    _this7.hero.setDirection(_this7.hero.STATE.RUNNINGNORTH);
                                } else if (angleInRadians >= Math.PI / 4 && angleInRadians <= Math.PI / 4 * 3) {
                                    _this7.hero.setDirection(_this7.hero.STATE.RUNNINGSOUTH);
                                } else {
                                    _this7.hero.setDirection(_this7.hero.STATE.RUNNINGWEST);
                                }
                                break;
                        }
                    } else if (inventoryObject.weapontype === inventoryObject.WEAPONTYPES.MELEE) {
                        inventoryObject.interval = inventoryObject.intervalTime;
                        //console.log('melee used, creating ' + inventoryObject.createObjectName);
                        switch (inventoryObject.createObjectName) {
                            case 'DamageArea_1':
                                var _angleInRadians = Math.atan2(mousePosition.y - _this7.hero.screenY, mousePosition.x - _this7.hero.screenX); // https://gist.github.com/conorbuck/2606166
                                var damageArea = new _DamageArea_2.default(Math.random(), _this7.loader, _this7.hero.pvp ? _this7.hero.id : -1, _this7.hero.x - _this7.hero.width / 2 + _this7.hero.width / 3 * Math.cos(_angleInRadians), _this7.hero.y - _this7.hero.height / 2 + _this7.hero.height / 3 * Math.sin(_angleInRadians), _angleInRadians, inventoryObject.strength, _this7.map);
                                sendNewDamageAreaListener.sendNewDamageArea(damageArea);
                                _this7.damageAreas.push(damageArea);
                                if (_angleInRadians >= -Math.PI / 4 && _angleInRadians <= Math.PI / 4) {
                                    _this7.hero.setDirection(_this7.hero.STATE.RUNNINGEAST);
                                } else if (_angleInRadians <= -Math.PI / 4 && _angleInRadians >= -Math.PI / 4 * 3) {
                                    _this7.hero.setDirection(_this7.hero.STATE.RUNNINGNORTH);
                                } else if (_angleInRadians >= Math.PI / 4 && _angleInRadians <= Math.PI / 4 * 3) {
                                    _this7.hero.setDirection(_this7.hero.STATE.RUNNINGSOUTH);
                                } else {
                                    _this7.hero.setDirection(_this7.hero.STATE.RUNNINGWEST);
                                }
                                break;
                        }
                    }
                }
            });
        }
    }, {
        key: "onMouseMove",
        value: function onMouseMove(mousePosition, mousePressed) {
            var _this8 = this;

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
                        _this8.movingObject = true;
                    }
                }
                inventoryObject.onMouseMove(mousePosition);
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
            var position = tempX + tempY * this.iterations;
            var positionsBetween = [];

            this.inventory.forEach(function (inventoryObject) {
                // Get original position
                if (inventoryObject.isHolding) {
                    originalPosition = inventoryObject.inventoryLocation;
                    //console.log(originalPosition + ", " + position);
                }
            });

            if (position !== originalPosition) {
                if (originalPosition === -1) {
                    for (var i = position; i < this.iterations * this.iterations; i++) {
                        positionsBetween.push(i);
                    }
                } else if (position < originalPosition) {
                    for (var _i2 = position; _i2 < originalPosition; _i2++) {
                        positionsBetween.push(_i2);
                    }
                } else if (position > originalPosition) {
                    for (var _i3 = position; _i3 > originalPosition; _i3--) {
                        positionsBetween.push(_i3);
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
            var objectAtPosition = null;

            this.inventory.forEach(function (inventoryObject) {
                // Get original position
                if (inventoryObject.actionLocation === position) {
                    objectAtPosition = inventoryObject;
                }
            });

            if (position < 0) position = 0;
            if (position > 9) position = 9;

            this.inventory.forEach(function (inventoryObject) {
                if (binding) {
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
                            //console.log(inventoryObject);
                        }
                    }
                }
                inventoryObject.shownLocation = inventoryObject.inventoryLocation;
            });
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
        key: "useObject",
        value: function useObject() {
            var _this9 = this;

            this.inventory.forEach(function (inventoryObject) {
                if (inventoryObject.isHolding && inventoryObject.isUsable) {
                    if (inventoryObject.usage === inventoryObject.USES.HEALTH) {
                        var worked = _this9.hero.heal(inventoryObject.strength);
                        if (worked) {
                            if (inventoryObject.usedObject !== null) {
                                switch (inventoryObject.usedObject) {
                                    case "empty_bottle_1":
                                        _this9.addObject(new _Empty_bottle_2.default(_this9.loader, 1, -2, -1));
                                        break;
                                    case "empty_bottle_2":
                                        _this9.addObject(new _Empty_bottle_4.default(_this9.loader, 1, -2, -1));
                                        break;
                                    case "empty_bottle_3":
                                        _this9.addObject(new _Empty_bottle_6.default(_this9.loader, 1, -2, -1));
                                        break;
                                    case "empty_bottle_4":
                                        _this9.addObject(new _Empty_bottle_8.default(_this9.loader, 1, -2, -1));
                                        break;
                                }
                            }
                            if (inventoryObject.stackCount > 1) {
                                inventoryObject.stackCount--;
                            } else {
                                _this9.inventory.splice(_this9.inventory.indexOf(inventoryObject), 1);
                            }
                        }
                    }
                }
            });
        }
    }, {
        key: "objectsInInventory",
        value: function objectsInInventory() {
            var inventoryObjectsCount = 0;
            var distinctItems = [];
            this.inventory.forEach(function (item) {
                if (item.typeId !== "coin") {
                    inventoryObjectsCount += item.stackCount;
                }
                if (distinctItems.indexOf(item.typeId) === -1) {
                    distinctItems.push(item.typeId);
                }
            });
            return {
                count: inventoryObjectsCount,
                distinctCount: distinctItems.length
            };
        }
    }, {
        key: "countObjectsOfType",
        value: function countObjectsOfType(typeId) {
            var inventoryObjectsCount = 0;
            this.inventory.forEach(function (item) {
                if (item.typeId === typeId) {
                    inventoryObjectsCount += item.stackCount;
                }
            });
            return inventoryObjectsCount;
        }
    }, {
        key: "getSmallObject",
        value: function getSmallObject() {
            var smallObject = [];
            this.inventory.forEach(function (item) {
                smallObject.push(item.getSmallObject());
            });
            return smallObject;
        }
    }, {
        key: "draw",
        value: function draw(ctx, xIcon, yIcon, width, height, xAction, yAction, delta, otherPlayers) {
            var drawWidth = Math.round(width / this.iterations * 5) / 5;
            var drawHeight = Math.round(height / (this.iterations + 1));
            this.yTop = yIcon + drawHeight;

            this.xIcon = xIcon;
            this.yIcon = this.yTop;
            this.widthIcon = width;
            this.heightIcon = height;
            this.widthSingleIcon = drawWidth;
            this.heightSingleIcon = drawHeight;
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
                } else if (this.state === this.STATES.STATS) {
                    this.drawStats(ctx, xIcon + drawWidth / 2, this.yTop + drawHeight / 2, delta, otherPlayers);
                } else if (this.state === this.STATES.QUESTS) {
                    this.drawQuest(ctx, xIcon + drawWidth / 2, this.yTop + drawHeight / 2);
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
            var _this10 = this;

            this.inventory.forEach(function (inventoryObject) {
                if (!(inventoryObject.isHolding && _this10.movingObject) && inventoryObject.shownLocation >= 0 && !inventoryObject.isMouseInObject) {
                    var drawX = x + Math.floor(inventoryObject.shownLocation % iterations) * drawWidth;
                    var drawY = y + Math.floor(inventoryObject.shownLocation / iterations) * drawHeight;
                    _this10.drawItem(ctx, inventoryObject, drawX, drawY, drawWidth, drawHeight);
                }
            });
            this.inventory.forEach(function (inventoryObject) {
                if (!(inventoryObject.isHolding && _this10.movingObject) && inventoryObject.shownLocation >= 0 && inventoryObject.isMouseInObject) {
                    var drawX = x + Math.floor(inventoryObject.shownLocation % iterations) * drawWidth;
                    var drawY = y + Math.floor(inventoryObject.shownLocation / iterations) * drawHeight;
                    _this10.drawItem(ctx, inventoryObject, drawX, drawY, drawWidth, drawHeight);
                }
            });
            this.inventory.forEach(function (inventoryObject) {
                // Draw the held object on top of the others
                if (inventoryObject.isHolding && _this10.movingObject) {
                    var drawX = _this10.mousePosition.x;
                    var drawY = _this10.mousePosition.y;
                    _this10.drawItem(ctx, inventoryObject, drawX, drawY, drawWidth, drawHeight);
                }
            });
        }
    }, {
        key: "drawStats",
        value: function drawStats(ctx, x, y, delta, otherPlayers) {
            var tempX = x + 1;
            var tempY = y + 1;
            var deltaY = 22;
            var objectsData = this.objectsInInventory();

            ctx.font = "22px Arial";
            ctx.fillStyle = "black";
            this.drawStatsText(ctx, delta, otherPlayers, tempX, tempY, deltaY, objectsData);
            tempX = x;
            tempY = y;
            ctx.fillStyle = "white";
            this.drawStatsText(ctx, delta, otherPlayers, tempX, tempY, deltaY, objectsData);
        }
    }, {
        key: "drawStatsText",
        value: function drawStatsText(ctx, delta, otherPlayers, tempX, tempY, deltaY, objectsData) {
            ctx.fillText("Player location: (" + Math.round(this.hero.x) + ", " + Math.round(this.hero.y) + ", " + this.hero.tileLevel + ")", tempX, tempY += deltaY);
            ctx.fillText("Health: " + this.hero.health, tempX, tempY += deltaY);
            ctx.fillText("Armor: " + this.hero.armor, tempX, tempY += deltaY);
            ctx.fillText("Level: " + this.hero.level, tempX, tempY += deltaY);
            ctx.fillText("Xp: " + this.hero.xp + "/" + this.hero.level * 100, tempX, tempY += deltaY);
            ctx.fillText("Quests completed: " + this.hero.questsCompleted + "/6", tempX, tempY += deltaY);
            ctx.fillText("Players connected: " + (otherPlayers.length + 1), tempX, tempY += deltaY);
            ctx.fillText("Objects in inventory: " + objectsData.count + " (without money)", tempX, tempY += deltaY);
            ctx.fillText("Different objects in inventory: " + objectsData.distinctCount + " / 31", tempX, tempY += deltaY);
            ctx.fillText("Sheep killed: " + this.hero.stats.sheepKills, tempX, tempY += deltaY);
            ctx.fillText("Goblins killed: " + this.hero.stats.goblinKills, tempX, tempY += deltaY);
            ctx.fillText("Slimes killed: " + this.hero.stats.slimeKills, tempX, tempY += deltaY);
        }
    }, {
        key: "drawQuest",
        value: function drawQuest(ctx, x, y) {
            this.questManager.draw(ctx, x, y);
        }
    }, {
        key: "drawItem",
        value: function drawItem(ctx, inventoryObject, drawX, drawY, drawWidth, drawHeight) {
            inventoryObject.draw(ctx, drawX, drawY, drawWidth, drawHeight);
            if (inventoryObject.levelRequired > this.hero.level) {
                ctx.drawImage(this.imageLevelToLow, // Image
                drawX, // Target x
                drawY, // Target y
                drawWidth, // Target width
                drawHeight); // Target height
            }
            if (inventoryObject.stackCount != 1) {
                ctx.font = "22px Arial";
                ctx.fillStyle = "white";
                ctx.fillText(inventoryObject.stackCount, drawX, drawY + drawHeight);
            }
        }
    }, {
        key: "drawActionBarItems",
        value: function drawActionBarItems(ctx, x, y, drawWidth, drawHeight, iterations) {
            var _this11 = this;

            this.inventory.forEach(function (inventoryObject) {
                if (!(inventoryObject.isHolding && _this11.movingObject) && !inventoryObject.isMouseInObject && inventoryObject.actionLocation >= 0) {
                    var drawX = x + Math.floor(inventoryObject.actionLocation) * drawWidth;
                    var drawY = y;
                    _this11.drawItem(ctx, inventoryObject, drawX, drawY, drawWidth, drawHeight);
                }
            });
            this.inventory.forEach(function (inventoryObject) {
                if (!(inventoryObject.isHolding && _this11.movingObject) && inventoryObject.isMouseInObject && inventoryObject.actionLocation >= 0) {
                    var drawX = x + Math.floor(inventoryObject.actionLocation) * drawWidth;
                    var drawY = y;
                    _this11.drawItem(ctx, inventoryObject, drawX, drawY, drawWidth, drawHeight);
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
                var xPos = (i === 0 ? 9 : i - 1) * dx;
                this.actionBarIcons[i].draw(ctx, drawX + xPos, y, dx, drawHeight);
                ctx.fillText(this.actionBarIcons[i].state, drawX + dx / 2 + xPos, y + drawHeight / 2);
            }
        }
    }]);

    return InventoryManager;
}();

exports.default = InventoryManager;

/***/ }),
/* 56 */
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
/* 57 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _Quest = __webpack_require__(58);

var _Quest2 = _interopRequireDefault(_Quest);

var _Health_bottle_ = __webpack_require__(10);

var _Health_bottle_2 = _interopRequireDefault(_Health_bottle_);

var _Spear = __webpack_require__(9);

var _Spear2 = _interopRequireDefault(_Spear);

var _Shield_ = __webpack_require__(8);

var _Shield_2 = _interopRequireDefault(_Shield_);

var _Sword_ = __webpack_require__(7);

var _Sword_2 = _interopRequireDefault(_Sword_);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var QuestManager = function () {
    function QuestManager(hero, inventoryManager, loader) {
        _classCallCheck(this, QuestManager);

        this.hero = hero;

        var i = 0;
        this.allQuests = [];
        this.allQuests.push(new _Quest2.default(i++, // id
        "Sheep killer", // Title
        "Find a sword and kill a sheep with it. \nYou will get 10xp as a reward.", // Description
        function () {
            return hero.stats.sheepKills >= 1; // Function returns true when completed
        }, function () {
            hero.xp += 10; // Function gives reward
        }));

        this.allQuests.push(new _Quest2.default(i++, // id
        "Another empty bottle", // Title
        "Find at least 10 empty bottles. \nYou will get 10 potions as a reward.", // Description
        function () {
            return inventoryManager.countObjectsOfType("empty_bottle_1") + inventoryManager.countObjectsOfType("empty_bottle_2") + inventoryManager.countObjectsOfType("empty_bottle_3") + inventoryManager.countObjectsOfType("empty_bottle_4") >= 10; // Function returns true when completed
        }, function () {
            inventoryManager.addObject(new _Health_bottle_2.default(loader, 10, -2, -1)); // Function gives reward
        }));

        this.allQuests.push(new _Quest2.default(i++, // id
        "More money", // Title
        "Get over 1000 coins. \nYou will get a spear as a reward.", // Description
        function () {
            return inventoryManager.countObjectsOfType("coin") >= 1000; // Function returns true when completed
        }, function () {
            inventoryManager.addObject(new _Spear2.default(loader, 1, -2, -1)); // Function gives reward
        }));

        this.allQuests.push(new _Quest2.default(i++, // id
        "Level up", // Title
        "Reach level 3. \nYou will get 100xp as a reward.", // Description
        function () {
            return hero.level >= 3; // Function returns true when completed
        }, function () {
            hero.xp += 100; // Function gives reward
        }));

        this.allQuests.push(new _Quest2.default(i++, // id
        "Hoarder", // Title
        "Have 200 items in total (coins don't count). \nYou will receive a cool sword.", // Description
        function () {
            return inventoryManager.objectsInInventory().count >= 200; // Function returns true when completed
        }, function () {
            inventoryManager.addObject(new _Sword_2.default(loader, 1, -2, -1)); // Function gives reward
        }));

        this.allQuests.push(new _Quest2.default(i++, // id
        "Nothing is safe", // Title
        "Kill at least 25 sheep, 10 Goblins and 1 Slime. \nYou will receive an awesome shield.", // Description
        function () {
            return hero.stats.sheepKills >= 25 && hero.stats.goblinKills >= 10 && hero.stats.slimeKills >= 1; // Function returns true when completed
        }, function () {
            inventoryManager.addObject(new _Shield_2.default(loader, 1, -2, -1)); // Function gives reward
        }));
    }

    _createClass(QuestManager, [{
        key: "update",
        value: function update() {
            if (this.hero.questsCompleted < this.allQuests.length) {
                if (this.allQuests[this.hero.questsCompleted].check()) {
                    this.hero.questsCompleted++;
                }
            }
        }
    }, {
        key: "draw",
        value: function draw(ctx, x, y) {
            if (this.hero.questsCompleted < this.allQuests.length) {
                this.allQuests[this.hero.questsCompleted].draw(ctx, x, y);
            } else {
                ctx.font = "22px Arial";
                ctx.fillStyle = "black";
                ctx.fillText("All quests completed.", x + 1, y + 1);
                ctx.fillStyle = "white";
                ctx.fillText("All quests completed.", x, y);
            }
        }
    }]);

    return QuestManager;
}();

exports.default = QuestManager;

/***/ }),
/* 58 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

/* Example:

new Quest(1, // id
    "Sheep killer", // title
    "Find a sword and kill a sheep with it. You will get 10xp as a reward", // description
    () => {
        return this.hero.stats.sheepKills >= 1; // Function returns true when completed
    },
    () => {
        this.hero.xp += 10; // Gives reward
    })

*/

var Quest = function () {
    function Quest(id, title, description, checkFunction, rewardFunction) {
        _classCallCheck(this, Quest);

        this.id = id;
        this.title = title;
        this.description = description;
        this.descriptionParts = description.split(/[\n]+/);
        this.checkFunction = checkFunction;
        this.rewardFunction = rewardFunction;
        this.completed = false;
    }

    _createClass(Quest, [{
        key: "check",
        value: function check() {
            if (!this.completed) {
                if (this.checkFunction()) {
                    this.rewardFunction();
                    this.completed = true;
                    return true;
                }
            }
            return false; // Not completed this time    
        }
    }, {
        key: "draw",
        value: function draw(ctx, x, y) {
            var tx = x + 1,
                ty = y + 1,
                dy = 20;
            ctx.font = "22px Arial";
            ctx.fillStyle = "black";
            ctx.fillText(this.title + ":", tx, ty += dy);
            this.descriptionParts.forEach(function (description) {
                ctx.fillText(description, tx, ty += dy);
            });
            tx = x;
            ty = y;
            ctx.fillStyle = "white";
            ctx.fillText(this.title + ":", tx, ty += dy);
            this.descriptionParts.forEach(function (description) {
                ctx.fillText(description, tx, ty += dy);
            });
        }
    }]);

    return Quest;
}();

exports.default = Quest;

/***/ }),
/* 59 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _GameObjectBase = __webpack_require__(1);

var _GameObjectBase2 = _interopRequireDefault(_GameObjectBase);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var OtherPlayer = function (_GameObject) {
    _inherits(OtherPlayer, _GameObject);

    function OtherPlayer(hero, loader, map) {
        _classCallCheck(this, OtherPlayer);

        var _this = _possibleConstructorReturn(this, (OtherPlayer.__proto__ || Object.getPrototypeOf(OtherPlayer)).call(this));

        _this.x = hero.x;
        _this.y = hero.y;
        _this.loader = loader;
        _this.action = hero.action;
        _this.image = _this.loader.getImage('otherPlayer');
        _this.imagePvp = _this.loader.getImage('otherPlayerPVP');
        _this.speed = hero.speed;
        _this.id = hero.id;
        _this.map = map;
        _this.pvp = hero.pvp;
        _this.health = hero.health;
        _this.name = hero.username;
        _this.level = hero.level;

        _this.imageIndex = 0;
        _this.imageState = 0;
        _this.width = map.drawSize;
        _this.height = map.drawSize;
        _this.imageWidth = 48;
        _this.imageHeight = 48;
        _this.maskWidth = map.drawSize * 0.65;
        _this.maskHeight = map.drawSize * 0.8;
        _this.tileLevel = 0; // HeighttileLevel
        _this.STATE = {
            RUNNINGNORTH: 1,
            RUNNINGEAST: 2,
            RUNNINGSOUTH: 3,
            RUNNINGWEST: 4,
            STOP: 5
        };
        return _this;
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
        }
    }, {
        key: 'update',
        value: function update(delta) {
            var _this2 = this;

            if (this.topText.length > 0) {
                this.topText.forEach(function (text) {
                    text.time += delta;
                    if (text.time > 1) {
                        _this2.topText.splice(_this2.topText.indexOf(text), 1);
                    }
                });
            }
        }
    }, {
        key: 'isHit',
        value: function isHit(projectiles) {
            if (this.pvp) {
                for (var i = 0; i < projectiles.length; i++) {
                    var projectile = projectiles[i];
                    if (projectile.playerId !== this.id && projectile.playerId !== -1) {
                        // -1 means pvp was off
                        if (this.isNear(projectile.x, projectile.y, projectile.x + projectile.width, projectile.y + projectile.height)) {
                            projectile.doDamage(); // Remove projectile
                            return true;
                        }
                    }
                }
            }
            return false;
        }
    }, {
        key: 'draw',
        value: function draw(ctx, x, y) {
            if (this.health > 0) {
                ctx.drawImage(this.pvp ? this.imagePvp : this.image, // Image
                this.getImageIndex() % 4 * this.imageWidth, // Src x
                Math.floor(this.getImageIndex() / 4) * this.imageHeight, // Src y
                this.imageWidth, // Src width
                this.imageHeight, // Src height
                x - this.width / 2, // Target x
                y - this.height / 2, // Target y
                this.width, // Target width
                this.height); // Target height

                ctx.font = "20px Arial";
                ctx.fillStyle = this.pvp ? "red" : "white";
                ctx.fillText("(lvl: " + this.level + ") - " + this.name, x - this.width / 2, y - 20);

                this.drawTopText(ctx, x - this.width / 2, y - this.height);
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

    return OtherPlayer;
}(_GameObjectBase2.default);

exports.default = OtherPlayer;

/***/ }),
/* 60 */
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
        this.sounds = {};
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
    }, {
        key: 'loadSound',
        value: function loadSound(key, src) {
            var sound = new Audio();
            this.sounds[key] = sound;
            sound.src = src;
            var error = sound.onerror;
            if (error) {
                console.error(error);
            }
            return;
        }
    }, {
        key: 'getSound',
        value: function getSound(key) {
            return key in this.sounds ? this.sounds[key] : null;
        }
    }]);

    return Loader;
}();

exports.default = Loader;

/***/ }),
/* 61 */
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
/* 62 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _Fire = __webpack_require__(11);

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
            var npcs = [];
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
                        if (layer.name === "Objects") {
                            layer.objects.forEach(function (object) {
                                objects.push(object);
                            });
                        } else if (layer.name === "NPC") {
                            layer.objects.forEach(function (object) {
                                npcs.push(object);
                            });
                        } else {
                            console.log("Unknown objectgroup type: '" + layer.name + "' in layer");
                            console.log(layer);
                        }
                        // objects.concat(layer.objects); <- not working?
                    } else {
                        console.log("Unknown layer type: '" + layer.type + "' in layer");
                        console.log(layer);
                    }
                }, this);

                camera.follow(hero);
                //console.log('#layers:' + map.layers.length);
                //console.log('#tiles horizontally in tileset:' + map.twidth);
                callback(objects, npcs);
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
            } else if (level === 99) {
                // Flying objects
                solidLayers = [5, 6, 8, 13];
            } else {
                console.log('Unknown level');
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
/* 63 */
/***/ (function(module, exports) {

// removed by extract-text-webpack-plugin

/***/ })
/******/ ]);