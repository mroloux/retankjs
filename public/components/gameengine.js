var gameEngine = (function (battlegroundState) {

    function gameEngine(event) {
        if (typeof(event) != 'undefined') {
            battlegroundState.tanks[0].isTurning = event.isTurning;
            battlegroundState.tanks[0].turningDirection = event.turningDirection;
        }
    }

    return gameEngine;
})(battlegroundState);