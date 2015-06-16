var renderEngine = (function (container) {

    var maxX = container.offsetWidth;
    var maxY = container.offsetHeight;
    var tankWidth = 70;

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

    function capY(position) {
        if (position > maxY) {
            return 0;
        }
        if (position + tankWidth < 0) {
            return maxY;
        }
        return position;
    }

    function capX(position) {
        if (position > maxX) {
            return 0;
        }
        if (position + tankWidth < 0) {
            return maxX;
        }
        return position;
    }

    function calculateNewPosition(currentTankState, newDirection, newSpeed) {
        return {
            top: capY(currentTankState.top + getTopOffset(newDirection, newSpeed)),
            left: capX(currentTankState.left + getLeftOffset(newDirection, newSpeed))
        };
    }

    function renderEngine() {
        var newPosition = calculateNewPosition(tank.state, gamestate.tanks[0].direction, gamestate.tanks[0].speed);
        tank.setState({left: newPosition.left, top: newPosition.top, direction: gamestate.tanks[0].direction});
    }

    return renderEngine;
})(document.getElementById('tank'));

