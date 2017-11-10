map.loadMap = function (src, camera, hero) {
    loadJSON(src, function (data) {
        console.log(data);
        map.cols = data.width;
        map.rows = data.height;
        map.tsize = data.tilewidth;
        map.twidth = data.tilesets[0].columns;
        map.layers = [];
        data.layers.forEach(function (layer) {
            map.layers.push(layer.data);
        }, this);
        
        camera.follow(hero);
        console.log('#layers:' + map.layers.length);
        console.log('#tiles horizontally in tileset:' + map.twidth);
    });
};

function loadJSON(src, callback) {
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