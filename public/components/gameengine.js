var gameEngine = (function() {

    function gameEngine(event) {
        if (typeof event !== 'undefined' ) {
            gamestate.tanks[0].isTurning = event.isTurning;
            gamestate.tanks[0].turningDirection = event.turningDirection;
        }
    }

    return gameEngine;
})();