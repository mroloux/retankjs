var gameEngine = (function (battlegroundState, network) {

    function toRadians(angle) {
        return angle * (Math.PI / 180);
    }

    function calculateBarrelPositionOfTank(tank) {
        var leftOffset = Math.sin(toRadians(tank.direction)) * (battlegroundState.objects.tank.height / 2);
        var topOffset = -1 * Math.cos(toRadians(tank.direction)) * (battlegroundState.objects.tank.height / 2);
        return {
            left: tank.left + leftOffset,
            top: tank.top + topOffset
        };
    }

    function createBulletBasedOnTankPosition(tank) {
        var barrelPosition = calculateBarrelPositionOfTank(tank);
        return {
            id: Date.now(),
            left: barrelPosition.left,
            top: barrelPosition.top,
            direction: tank.direction,
            speed: 10
        };
    }

    function gameEngine(event) {
        if (typeof(event) !== 'undefined') {
            var myTank = battlegroundState.tanks[0];

            if (event.eventType === 'turning') {
                myTank.isTurning = event.isTurning;
                myTank.turningDirection = event.turningDirection;
            } else if (event.eventType === 'driving' && !battlegroundState.options.cruiseControl) {
                myTank.isDriving = event.isDriving;
                myTank.drivingDirection = event.drivingDirection;
            } else if (event.eventType === 'toggleCruiseControl') {
                cruiseControlCheckbox.onChange();
            } else if (event.eventType === 'bullet') {
                var bullet = createBulletBasedOnTankPosition(myTank);
                battlegroundState.bullets.push(bullet);
                bulletSound.play();
                network.shootBullet(bullet);
            }
        }
    }

    return gameEngine;
})(battlegroundState, network);