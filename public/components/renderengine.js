var renderEngine = (function (container, network, battlegroundState) {

    var maxX = container.offsetWidth;
    var maxY = container.offsetHeight;
    var tankWidth = 70;
    var tankHeight = 100;

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
        if (position + tankHeight < 0) {
            return maxY;
        }
        return position;
    }

    function capX(position) {
        if (position > maxX) {
            return 0;
        }
        if (position + tankHeight < 0) {
            return maxX;
        }
        return position;
    }

    function isOutsideGround(x, y) {
        if (x > maxX) {
            return true;
        }
        if (y > maxY) {
            return true;
        }
        return false;
    }

    function recalculateTankState(tank, battlegroundState) {
        var newDirection = tank.direction + getDirectionOffset(tank.turningDirection, tank.turningSpeed, tank.isTurning);
        var newTop = capY(tank.top + getTopOffset(newDirection, tank.drivingSpeed));
        var newLeft = capX(tank.left + getLeftOffset(newDirection, tank.drivingSpeed));

        battlegroundState.collides(newTop, newLeft - 15, tankHeight, tankHeight);

        tank.top = newTop;
        tank.left = newLeft;
        tank.direction = newDirection;
    }

    function recalculateBulletState(bullet) {
        bullet.top = bullet.top + getTopOffset(bullet.direction, bullet.speed);
        bullet.left = bullet.left + getLeftOffset(bullet.direction, bullet.speed);
        return isOutsideGround(bullet.left, bullet.top);
    }

    function renderEngine() {
        for(var i = 0; i < battlegroundState.tanks.length; ++i) {
            recalculateTankState(battlegroundState.tanks[i], battlegroundState);
        }
        for (var j = 0; j < battlegroundState.bullets.length; ++j) {
            var isOutsideGround = recalculateBulletState(battlegroundState.bullets[j]);
            if (isOutsideGround) {
                battlegroundState.bullets.splice(j, 1);
            }
        }
        // TODO nog niet alle kogels verdwijnen (als je er veel schiet)
        console.log('#bullets: ' + battlegroundState.bullets.length);

        battleground.setState(battlegroundState);
        network.tankChange(battlegroundState.tanks[0]);
    }

    return renderEngine;
})(document.getElementById('battleground'), network, battlegroundState);

