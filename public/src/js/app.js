import GameStateManager from "./GameState/GameStateManager";
import MainGameState from "./GameState/MainGameState";
import Map from "./Map/Map.class";

(function () {
    let ctx = document.querySelector("#game").getContext('2d');

    //const socket = io();
    const socket = io.connect("http://localhost:5000");
    
    let gamestatemanager = new GameStateManager();
    let mainstate = new MainGameState(ctx, new Map(), socket);
})();