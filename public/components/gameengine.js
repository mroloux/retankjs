var gameEngine = (function () {

    function gameEngine(e) {
        if (e) {
            gamestate.tanks[0].direction = e.direction;
        }
    }

    return gameEngine;
})();