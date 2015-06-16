var gameEngine = (function (battlegroundState) {

    function gameEngine(event) {
        if (typeof(event) !== 'undefined') {
            var myTank = battlegroundState.tanks[0];

            if (event.eventType === 'turning') {
                myTank.isTurning = event.isTurning;
                myTank.turningDirection = event.turningDirection;

            } else if (event.eventType === 'bullet') {
                var bullet = {
                    id: Date.now(),
                    left: myTank.left,
                    top: myTank.top,
                    direction: myTank.direction,
                    speed: 10
                };
                battlegroundState.bullets.push(bullet);
            }
        }
    }

    return gameEngine;
})(battlegroundState);