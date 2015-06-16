var gameEngine = (function (network) {

    function gameEngine(event) {
        if (typeof(event) != 'undefined') {
            gamestate.tanks[0].isTurning = event.isTurning;
            gamestate.tanks[0].turningDirection = event.turningDirection;
            network.tankChange(gamestate.tanks[0]);
        }
    }

    return gameEngine;
})(network);