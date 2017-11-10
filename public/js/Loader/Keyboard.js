
//
// Keyboard handler
//
function Keyboard() {
    this.keyboard.LEFT =  37;
    this.keyboard.RIGHT = 39;
    this.keyboard.UP = 38;
    this.keyboard.DOWN = 40;
    this.keyboard.W = 87;
    this.keyboard.A = 65;
    this.keyboard.S = 83;
    this.keyboard.D = 68;
    this.keyboard.F = 70;

    this._keys = {};

}

Keyboard.prototype.listenForEvents = function(keys) {
    window.addEventListener('keydown', this._onKeyDown.bind(this));
    window.addEventListener('keyup', this._onKeyUp.bind(this));

    keys.forEach(function (key) {
        this._keys[key] = false;
    }.bind(this));
}

Keyboard.prototype._onKeyDown = function(event) {
    var keyCode = event.keyCode;
    if (keyCode in this._keys) {
        event.preventDefault();
        this._keys[keyCode] = true;
    }
}

Keyboard.prototype._onKeyUp = function (event) {
    var keyCode = event.keyCode;
    if (keyCode in this._keys) {
        event.preventDefault();
        this._keys[keyCode] = false;
    }
};

Keyboard.prototype.isDown = function (keyCode) {
    if (!keyCode in this._keys) {
        throw new Error('Keycode ' + keyCode + ' is not being listened to');
    }
    return this._keys[keyCode];
};
