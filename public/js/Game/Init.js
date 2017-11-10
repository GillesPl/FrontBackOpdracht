Game.init = function () {
    Keyboard.listenForEvents(
        [Keyboard.LEFT, Keyboard.RIGHT, Keyboard.UP, Keyboard.DOWN, Keyboard.A, Keyboard.D, Keyboard.W, Keyboard.S]);
    this.tileAtlas = Loader.getImage('tiles');

    this.hero = new Hero(map, 50 * map.drawSize, 50 * map.drawSize);
    this.camera = new Camera(map, 512, 512);
    this.camera.follow(this.hero);
    map.loadMap('../../assets/map/map.json');
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
};