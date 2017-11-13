import GameStateManager from "./GameState/GameStateManager";
import MainGameState from "./GameState/MainGameState";
import * as map from "./Map/Map";
import loadTiled from "./Map/LoadTiled";



(function() {
    let ctx = document.querySelector("#game").getContext('2d');

    let Socket = io();

    let gamestatemanager = new GameStateManager();
    let mainstate = new MainGameState(ctx,map,Socket);

})();