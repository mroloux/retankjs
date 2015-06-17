var KEY_SPACE = 32;
var KEY_LEFT = 37;
var KEY_UP = 38;
var KEY_RIGHT = 39;
var KEY_DOWN = 40;
var KEY_C = 67;

network.onTankChange(function(tank) {
    battlegroundState.updateTank(tank);
});

network.onCreateUnicorn(function(unicorn) {
    battlegroundState.unicorns.push(unicorn);
    horsySound.play();
});

network.onBulletShot(function(bullet) {
    battlegroundState.bullets.push(bullet);
});

function createTurningEvent(isTurning, turningDirection) {
    return {
        'eventType': 'turning',
        'isTurning': isTurning,
        'turningDirection': turningDirection
    };
}

function createDrivingEvent(isDriving, drivingDirection) {
    return {
        'eventType': 'driving',
        'isDriving': isDriving,
        'drivingDirection': drivingDirection
    };
}

function createBulletEvent() {
    return {
        'eventType': 'bullet'
    };
}

function createToggleCruiseControlEvent() {
    return {
        'eventType': 'toggleCruiseControl'
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
            case KEY_UP: return createDrivingEvent(true, 'forward');
            case KEY_DOWN: return createDrivingEvent(true, 'backward');
            case KEY_C: return createToggleCruiseControlEvent();
            case KEY_SPACE: return createBulletEvent();
        }
    })
    .subscribe(gameEngine);

Rx.Observable
    .fromEvent(document, 'keyup')
    .map(function (event) {
        switch(event.which) {
            case KEY_LEFT: return createTurningEvent(false, 'left');
            case KEY_RIGHT: return createTurningEvent(false, 'right');
            case KEY_UP: return createDrivingEvent(false, 'forward');
            case KEY_DOWN: return createDrivingEvent(false, 'backward');
        }
    })
    .subscribe(gameEngine);
