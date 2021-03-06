export default class Loader {
    constructor() {
        this.images = {};
        this.sounds = {};
    }

    loadImage(key, src) {
        let img = new Image();

        let d = new Promise(function (resolve, reject) {
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

    getImage(key) {
        return (key in this.images) ? this.images[key] : null;
    }


    loadSound(key,src) {
        let sound = new Audio();
        this.sounds[key] = sound;                
        sound.src = src;
        let error = sound.onerror;
        if(error) {
            console.error(error)
        }
        return 
    }

    getSound(key) {
        return (key in this.sounds) ? this.sounds[key] : null;
    }
}