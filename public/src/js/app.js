import GameStateManager from "./GameState/GameStateManager";
import LoginState from "./GameState/LoginState"
import MainGameState from "./GameState/MainGameState";
import Map from "./Map/Map.class";

(function () {
    const socket = io();
    //const socket = io.connect("http://localhost:5000");

    let gamestatemanager = new GameStateManager();
    let mainstate = new MainGameState(new Map(), socket);
    let loginstate = new LoginState(socket);

    gamestatemanager.addState(loginstate);
    gamestatemanager.addState(mainstate);

    gamestatemanager.setState(loginstate);

    socket.on("requestLoginSuccess", function (res) {
        mainstate.setUser(res.user);
        gamestatemanager.setState(mainstate);
    });

})();