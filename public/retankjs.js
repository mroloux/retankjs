var KEY_LEFT = 37;
var KEY_RIGHT = 39;

network.onTankChange(function(tank) {
    battlegroundState.updateTank(tank);
});

network.onCreateUnicorn(function(unicorn) {
    document.getElementById('battleground').appendChild(createUnicorn(unicorn));
    gamestate.unicorns.push(unicorn);
});

function createTurningEvent(isTurning, turningDirection) {
    return {
        'eventType': 'turning',
        'isTurning': isTurning,
        'turningDirection': turningDirection
    };
}

Rx.Observable
    .interval(100/6)
    .subscribe(renderEngine);

Rx.Observable
    .fromEvent(document, 'keydown')
    .map(function (event) {
        switch(event.which) {
            case KEY_LEFT: return createTurningEvent(true, 'left');
            case KEY_RIGHT: return createTurningEvent(true, 'right');
        }
    })
    .subscribe(gameEngine);

Rx.Observable
    .fromEvent(document, 'keyup')
    .map(function (event) {
        switch(event.which) {
            case KEY_LEFT: return createTurningEvent(false, 'left');
            case KEY_RIGHT: return createTurningEvent(false, 'right');
        }
    })
    .subscribe(gameEngine);
