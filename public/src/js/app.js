import GameStateManager from "./GameState/GameStateManager";
import LoginState from "./GameState/LoginState"
import MainGameState from "./GameState/MainGameState";
import Map from "./Map/Map.class";

(function () {
    let ctx = document.querySelector("#game").getContext('2d');

    const socket = io();
    //const socket = io.connect("http://localhost:5000");
    
    let gamestatemanager = new GameStateManager();

    
    let mainstate = new MainGameState(ctx, new Map(), socket);
    let loginstate = new LoginState(socket);

    //loginstate.draw();

    gamestatemanager.addState(loginstate);
    gamestatemanager.addState(mainstate);


    gamestatemanager.setState(loginstate);

    console.log(gamestatemanager.getCurrentState());

    
})();