var renderEngine = (function (container, network, battlegroundState) {

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

    function recalculateState(tank) {
        var newDirection = tank.direction + getDirectionOffset(tank.turningDirection, tank.turningSpeed, tank.isTurning);
        tank.top = capY(tank.top + getTopOffset(newDirection, tank.drivingSpeed));
        tank.left = capX(tank.left + getLeftOffset(newDirection, tank.drivingSpeed));
        tank.direction = newDirection;
    }

    function renderEngine() {
        for(var i = 0; i < battlegroundState.tanks.length; ++i) {
            recalculateState(battlegroundState.tanks[i]);
        }
        battleground.setState(battlegroundState);
        network.tankChange(battlegroundState.tanks[0]);
    }

    return renderEngine;
})(document.getElementById('battleground'), network, battlegroundState);

