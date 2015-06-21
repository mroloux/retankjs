var renderEngine = (function (container, network, battlegroundState) {

    var maxX = container.offsetWidth;
    var maxY = container.offsetHeight;
    var tankHeight = battlegroundState.objects.tank.height;
    var tankWidth = battlegroundState.objects.tank.width;

    function toRadians(angle) {
        return angle * (Math.PI / 180);
    }

    function getYOffset(directionDegrees, speed) {
        return -1 * Math.cos(toRadians(directionDegrees)) * speed;
    }

    function getXOffset(directionDegrees, speed) {
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

    function capX(objCenterX, objWidth) {
        var halfWidth = objWidth / 2;
        if (objCenterX - halfWidth > maxX) {
            return 0 - halfWidth;
        }
        if (objCenterX + halfWidth < 0) {
            return maxX + halfWidth;
        }
        return objCenterX;
    }

    function capY(objCenterY, objHeight) {
        var halfHeight = objHeight / 2;
        if (objCenterY - halfHeight > maxY) {
            return 0 - halfHeight;
        }
        if (objCenterY + halfHeight < 0) {
            return maxY + halfHeight;
        }
        return objCenterY;
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
        var newX = tank.isDriving ? capX(tank.centerPnt.x + getXOffset(newDirection, drivingSpeed), tankHeight) : tank.centerPnt.x;
        var newY = tank.isDriving ? capY(tank.centerPnt.y + getYOffset(newDirection, drivingSpeed), tankHeight) : tank.centerPnt.y;

        battlegroundState.collides(newY, newX - 15, tankWidth, tankHeight);

        tank.centerPnt.x = newX;
        tank.centerPnt.y = newY;
        tank.direction = newDirection;
    }

    function recalculateBulletState(bullet) {
        bullet.centerPnt.x = bullet.centerPnt.x + getXOffset(bullet.direction, bullet.speed);
        bullet.centerPnt.y = bullet.centerPnt.y + getYOffset(bullet.direction, bullet.speed);
        return isOutsideGround(bullet.centerPnt.x, bullet.centerPnt.y);
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

