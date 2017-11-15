import GameStateManager from "./GameState/GameStateManager";
import MainGameState from "./GameState/MainGameState";
import Map from "./Map/Map.class";

(function () {
    let ctx = document.querySelector("#game").getContext('2d');

    let Socket = io();

    let gamestatemanager = new GameStateManager();
    let mainstate = new MainGameState(ctx, new Map(), Socket);
})();