Game.init = function () {
    this.Keyboard = new Keyboard();
    this.Keyboard.listenForEvents([this.Keyboard.LEFT, this.Keyboard.RIGHT, this.Keyboard.UP, this.Keyboard.DOWN, this.Keyboard.A, this.Keyboard.D, this.Keyboard.W, this.Keyboard.S]);

    
    this.tileAtlas = Loader.getImage('tiles');

    this.hero = new Hero(map, 50 * map.drawSize, 50 * map.drawSize);
    this.camera = new Camera(map, window.innerWidth, window.innerHeight);

    map.loadMap('../../assets/map/map.json', this.camera, this.hero);
    events();
};

function events() {
    document.addEventListener("keypress", function (event) {
        if (event.key === 'f') {
            Game.fullscreen();
        }
    }, false);
    document.addEventListener("fullscreenchange", function () {
        Game.fullscreenState = document.fullscreen;
    }, false);

    document.addEventListener("mozfullscreenchange", function () {
        Game.fullscreenState = document.mozFullScreen;
    }, false);

    document.addEventListener("webkitfullscreenchange", function () {
        Game.fullscreenState = document.webkitIsFullScreen;
    }, false);

    document.addEventListener("msfullscreenchange", function () {
        Game.fullscreenState = document.msFullscreenElement;
    }, false);
}