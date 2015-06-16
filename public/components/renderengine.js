var renderEngine = (function() {

    function getTopOffset(direction, speed) {
        if (direction === 0) {
            return speed * -1;
        }
        if (direction === 180) {
            return speed;
        }
        return 0;
    }

    function getLeftOffset(direction, speed) {
        if (direction === 270) {
            return speed * -1;
        }
        if (direction === 90) {
            return speed;
        }
        return 0;
    }

    function calculateNewPosition(currentTankState, newDirection, newSpeed) {
        return {
            top: currentTankState.top + getTopOffset(newDirection, newSpeed),
            left: currentTankState.left + getLeftOffset(newDirection, newSpeed)
        };
    }

    function renderEngine() {
        var newPosition = calculateNewPosition(tank.state, gamestate.tanks[0].direction, gamestate.tanks[0].speed);
        tank.setState({left: newPosition.left, top: newPosition.top, direction: gamestate.tanks[0].direction});
    }

    return renderEngine;
})();

