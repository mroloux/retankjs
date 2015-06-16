var renderEngine = (function (container) {

    var maxX = container.offsetWidth;
    var maxY = container.offsetHeight;
    var tankWidth = 70;

    function toRadians(angle) {
      return angle * (Math.PI / 180);
    }

    function getTopOffset(directionDegrees, speed) {
        return -1 * Math.cos(toRadians(directionDegrees)) * speed;
    }

    function getLeftOffset(directionDegrees, speed) {
        return Math.sin(toRadians(directionDegrees)) * speed;
    }

    function getDirectionOffset(turningDirection, turningSpeed, isTurning) {
        if (!isTurning) {
            return 0;
        }
        if (turningDirection === 'left') {
            return turningSpeed * -1;
        }
        return turningSpeed;
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

    function calculateNewState(currentTankState, newTankGameState) {
        var newDirection = currentTankState.direction + getDirectionOffset(newTankGameState.turningDirection, newTankGameState.turningSpeed, newTankGameState.isTurning);
        return {
            top: capY(currentTankState.top + getTopOffset(newDirection, newTankGameState.drivingSpeed)),
            left: capX(currentTankState.left + getLeftOffset(newDirection, newTankGameState.drivingSpeed)),
            direction: newDirection
        };
    }

    function renderEngine() {
        var newState = calculateNewState(tank.state, gamestate.tanks[0]);
        tank.setState({left: newState.left, top: newState.top, direction: newState.direction});

        var opponentNewState = calculateNewState(opponentTank.state, gamestate.tanks[1]);
        opponentTank.setState({left: opponentNewState.left, top: opponentNewState.top, direction: opponentNewState.direction});
    }

    return renderEngine;
})(document.getElementById('battleground'));

