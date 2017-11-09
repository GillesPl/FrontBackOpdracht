Game.init = function () {
    Keyboard.listenForEvents(
        [Keyboard.LEFT, Keyboard.RIGHT, Keyboard.UP, Keyboard.DOWN, Keyboard.A, Keyboard.D, Keyboard.W, Keyboard.S, Keyboard.F]);
    this.tileAtlas = Loader.getImage('tiles');

    this.hero = new Hero(map, 1600, 1600);
    this.camera = new Camera(map, 512, 512);
    this.camera.follow(this.hero);
    map.loadMap('../../assets/map/map.json');
};