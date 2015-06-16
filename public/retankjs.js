var gamestate = {
    name: 'tankular',
    tanks: [
        {
            direction: 0,
            speed: 2
        }
    ]
};

Rx.Observable
    .interval(100)
    .subscribe(renderEngine);

Rx.Observable
    .fromEvent(document, 'keyup')
    .map(function (e) {
        switch(e.which) {
            case 38: return { event: 'directionchange', direction: 0 };
            case 40: return { event: 'directionchange', direction: 180};
            case 37: return { event: 'directionchange', direction: 270};
            case 39: return { event: 'directionchange', direction: 90 };
        }
    })
    .subscribe(gameEngine);
