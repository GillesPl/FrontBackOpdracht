//
// Keyboard handler
//
function Keyboard() {
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

Keyboard.prototype.listenForEvents = function (keys) {
    window.addEventListener('keydown', this._onKeyDown.bind(this));
    window.addEventListener('keyup', this._onKeyUp.bind(this));

    keys.forEach(function (key) {
        this._keys[key] = false;
    }.bind(this));
};

Keyboard.prototype._onKeyDown = function (event) {
    var keyCode = event.keyCode;
    if (keyCode in this._keys) {
        event.preventDefault();
        this._keys[keyCode] = true;
    }
};

Keyboard.prototype._onKeyUp = function (event) {
    var keyCode = event.keyCode;
    if (keyCode in this._keys) {
        event.preventDefault();
        this._keys[keyCode] = false;
    }
};

Keyboard.prototype.isDown = function (keyCode) {
    if (!(keyCode in this._keys)) {
        throw new Error('Keycode ' + keyCode + ' is not being listened to');
    }
    return this._keys[keyCode];
};