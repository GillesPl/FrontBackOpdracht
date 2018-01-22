export default class Keyboard {
    constructor(mainGameState) {
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
        for (let i = 0; i <= 9; i++) {
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

    listenForEvents(keys, callbackKeys) {
        window.addEventListener('keydown', this._onKeyDown.bind(this));
        window.addEventListener('keyup', this._onKeyUp.bind(this));

        callbackKeys.forEach(function (key) {
            this._callbackKeys[key] = false;
        }.bind(this));
        keys.forEach(function (key) {
            this._keys[key] = false;
        }.bind(this));
    }

    _onKeyDown(event) {
        let keyCode = event.keyCode;
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
            let self = this;
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

    _onKeyUp(event) {
        let keyCode = event.keyCode;
        //console.log('key pressed: ' + keyCode);
        if (keyCode in this._keys) {
            event.preventDefault();
            this._keys[keyCode] = false;
        } else if (keyCode in this._callbackKeys) {
            event.preventDefault();
            this._callbackKeys[keyCode] = false;
        } else {
            this._nums.forEach(function (num) {
                if (num.key === keyCode)
                    num.isDown = false;
            });
        }
    }

    isDown(keycode) {
        if (!(keycode in this._keys)) {
            throw new Error('keycode ' + keycode + ' is not being listened to');
        }
        return this._keys[keycode];
    }
}