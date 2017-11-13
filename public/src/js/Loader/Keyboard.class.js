export default class Keyboard {
    constructor() {
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

    listenForEvents(keys) {
        window.addEventListener('keydown', this._onKeyDown.bind(this));
        window.addEventListener('keyup', this._onKeyUp.bind(this));

        keys.forEach(function (key) {
            this._keys[key] = false;
        }.bind(this));
    }

    _onKeyDown(event) {
        let keyCode = event.keyCode;
        if (keyCode in this._keys) {
            event.preventDefault();
            this._keys[keyCode] = true;
        }
    }

    _onKeyUp(event) {
        let keyCode = event.keyCode;
        if (keyCode in this._keys) {
            event.preventDefault();
            this._keys[keyCode] = false;
        }
    }

    isDown(keycode) {
        if (!(keycode in this._keys)) {
            throw new Error('keycode ' + keycode + ' is not being listened to');
        }
        return this._keys[keycode];
    }

}