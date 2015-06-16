var Tank = React.createClass({
    getInitialState: function () {
        return {left: 0, top: 0, direction: 0};
    },
    render: function () {
        return (
            <img src="images/tank.png"
            style={{
                position: 'absolute',
                top: this.state.top,
                left: this.state.left,
                transform: 'rotate(' + this.state.direction + 'deg)'
            }} />
            );
    }
});

var gamestate = {
    name: 'tankular',
    tanks: [
        {
            direction: 0,
            speed: 2
        }
    ]
};

function keypressHandler(e) {
    gamestate.tanks[0].direction = e.direction;
}

var tank = React.render(
    <Tank />,
    document.getElementById('tank')
);

Rx.Observable
    .interval(100)
    .startWith(gamestate)
    .subscribe(render);

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
    .subscribe(keypressHandler);

function render() {
    tank.setState({left: Math.random() * 950, top: Math.random() * 700, direction: gamestate.tanks[0].direction});
}