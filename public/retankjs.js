var KEY_LEFT = 37;
var KEY_RIGHT = 39;

var gamestate = {
    name: 'tankular',
    tanks: [
        {
            id: Date.now(),
            isTurning: false,
            turningDirection: '',
            turningSpeed: 5,
            drivingSpeed: 2,
            initialState: {
                top: 0,
                left: 0,
                direction: 70
            }
        },
        {
            isTurning: false,
            turningDirection: '',
            turningSpeed: 5,
            drivingSpeed: 2,
            initialState: {
                top: 400,
                left: 400,
                direction: 250
            }
        }
    ],
    unicorns: [],
    updateTank: function(updatedTank) {
        var tankToUpdate = this.tanks.filter(function(tank) {
            return tank.id === updatedTank.id;
        });

        for (var prop in updatedTank) {
            tankToUpdate[prop] = updatedTank[prop];
        }
    }
};
network.onTankChange(function(tank) {
    gamestate.updateTank(tank);
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
