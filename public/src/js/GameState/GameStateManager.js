export default class GameStateManager {

    constructor() {
        this.currentState;
        this.gameStates = [];
    }
    
    draw() {
        //start the tickevent
        this.currentState.draw();
    }

    setState(gameState) {
        this.currentState = state;
        this.draw();
    }

    getState(gameState) {
        gameStates.forEach(el => {
            if(el === gameState) return el;
            else throw new Error("Gamestate not found in GameStateManager");
        });
    }

    getCurrentState() {
        if(this.currentState != null) return this.currentState;
        else throw new Error("No current Gamestate is set");        
    }


    addState(gameState) {
        this.gameStates.push(gameState);
    }

    removeState(gameState) {
        let index = this.gameStates.indexOf(gameState);
        if(index != null) {
            this.gameStates.splice(index,1);
        }
        else throw new Error("Gamestate not found");
    }

    update() {

    }


}