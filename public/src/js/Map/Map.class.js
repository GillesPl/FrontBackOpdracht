export default class Map {
    constructor() {
        this.tilesetSrc = "not implemented";
        this.cols = 150;
        this.rows = 150;
        this.tsize = 16;
        this.drawSize = 64;
        this.twidth = 2;
        this.layers = [
            [0, 0],
            [0, 0]
        ]; // Basic empty layers
    }

    loadMap(src, camera, hero) {
        let map = this;
        this.loadJSON(src, function (data) {
            console.log(data);
            map.cols = data.width;
            map.rows = data.height;
            map.tsize = data.tilewidth;
            map.twidth = data.tilesets[0].columns;
            map.layers = [];
            data.layers.forEach(function (layer) {
                map.layers.push(layer.data);
            }, map);

            camera.follow(hero);
            console.log('#layers:' + map.layers.length);
            console.log('#tiles horizontally in tileset:' + map.twidth);
        });
    }

    loadJSON(src, callback) {
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

    getTile(layer, col, row) {
        if (this.layers[layer] === undefined) {
            //console.error(layer + ' not in ' + this.layers);
            return null;
        } else
            return this.layers[layer][row * this.cols + col];
    }

    isSolidTileAtXY(x, y, level) {
        var collision = false;
        var col = Math.floor(x / this.drawSize);
        var row = Math.floor(y / this.drawSize);

        var solidLayers, unSolidLayers = [12]; // Layers/tiles that the player always is allowed on

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
        let map = this;
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

    getTileLevelAtXY(x, y) {
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

    getCol(x) {
        return Math.floor(x / this.tsize);
    }

    getRow(y) {
        return Math.floor(y / this.tsize);
    }

    getX(col) {
        return col * this.tsize;
    }

    getY(row) {
        return row * this.tsize;
    }
}

/*
var map = {
    loadMap: function (src) {},
    tilesetSrc: 'Not implemented',
    cols: 12,
    rows: 12,
    tsize: 64,
    drawSize: 64,
    twidth: 1,
    layers: [
        [
            3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3,
            3, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 3,
            3, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 3,
            3, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 3,
            3, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 3,
            3, 1, 1, 1, 1, 1, 2, 1, 1, 1, 1, 3,
            3, 1, 2, 2, 1, 1, 1, 1, 1, 1, 1, 3,
            3, 1, 2, 2, 1, 1, 1, 1, 1, 1, 1, 3,
            3, 1, 1, 1, 2, 1, 1, 1, 1, 1, 1, 3,
            3, 1, 1, 1, 1, 2, 1, 1, 1, 1, 1, 3,
            3, 1, 1, 1, 1, 2, 1, 1, 1, 1, 1, 3,
            3, 3, 3, 1, 1, 2, 3, 3, 3, 3, 3, 3
        ],
        [
            4, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 4,
            4, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 4,
            4, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 4,
            4, 0, 0, 5, 0, 0, 0, 0, 0, 5, 0, 4,
            4, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 4,
            4, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 4,
            4, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 4,
            4, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 4,
            4, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 4,
            4, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 4,
            4, 4, 4, 0, 5, 4, 4, 4, 4, 4, 4, 4,
            4, 4, 4, 0, 0, 3, 3, 3, 3, 3, 3, 3
        ]
    ],
    getTile: function (layer, col, row) {
        return this.layers[layer][row * map.cols + col];
    },
    isSolidTileAtXY: function (x, y, level) {
        var collision = false;
        var col = Math.floor(x / this.drawSize);
        var row = Math.floor(y / this.drawSize);

        var solidLayers, unSolidLayers = [12]; // Layers/tiles that the player always is allowed on

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
        solidLayers.forEach(function (layer) {
            if (this.getTile([layer], col, row) !== 0) {
                collision = true;
            }
        }, this);
        unSolidLayers.forEach(function (layer) {
            if (this.getTile([layer], col, row) !== 0) {
                collision = false;
            }
        }, this);
        return collision;
    },
    getTileLevelAtXY: function (x, y) {
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
    },
    getCol: function (x) {
        return Math.floor(x / this.tsize);
    },
    getRow: function (y) {
        return Math.floor(y / this.tsize);
    },
    getX: function (col) {
        return col * this.tsize;
    },
    getY: function (row) {
        return row * this.tsize;
    }
};*/