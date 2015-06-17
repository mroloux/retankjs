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
        if (x < 0 || x > maxX) {
            return true;
        }
        if (y < 0 || y > maxY) {
            return true;
        }
        return false;
    }

    function recalculateTankState(tank, battlegroundState) {
        if (!tank.isDriving) {
            console.log('Tank not driving: ' + tank.isDriving);
        }

        var drivingSpeed = tank.drivingDirection === 'backward' ? -1 * tank.drivingSpeed : tank.drivingSpeed;

        var newDirection = tank.direction + getDirectionOffset(tank.turningDirection, tank.turningSpeed, tank.isTurning);
        var newTop = tank.isDriving ? capY(tank.top + getTopOffset(newDirection, drivingSpeed)) : tank.top;
        var newLeft = tank.isDriving ? capX(tank.left + getLeftOffset(newDirection, drivingSpeed)) : tank.left;

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
        for (var i = battlegroundState.bullets.length -1; i >= 0; i--) {
            var isOutsideGround = recalculateBulletState(battlegroundState.bullets[i]);
            if (isOutsideGround) {
                battlegroundState.bullets.splice(i, 1);
            }
        }

        battleground.setState(battlegroundState);
        network.tankChange(battlegroundState.tanks[0]);
    }

    return renderEngine;
})(document.getElementById('battleground'), network, battlegroundState);

