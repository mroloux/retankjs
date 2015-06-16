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

var tick = function () {
    return { event: 'tick' };
};

var gamestate = {};

var keypress = Rx.Observable
    .fromEvent(document, 'keyup')
    .map(function (e) {
        switch(e.which) {
            case 38: return { event: 'directionchange', data: { direction: 0} };
            case 40: return { event: 'directionchange', data: { direction: 180 }};
            case 37: return { event: 'directionchange', data: { direction: 270 }};
            case 39: return { event: 'directionchange', data: { direction: 90  }};
        }
    });

var handlers = {
    dispatch: function (gs, e) {
        if (e) {
            return this['_' + e.event](gs, e.data);
        }
    },

    _tick: function (gs) {
        return gs;
    },

    _directionchange: function (gs, eventData) {
        console.log(eventData.direction);
        return gs;
    }
};

var tank = React.render(
    <Tank />,
    document.getElementById('tank')
);

Rx.Observable
    .interval(100)
    .map(tick)
    .startWith(gamestate)
    .merge(keypress)
    .scan(handlers.dispatch.bind(handlers))
    .subscribe(render);

function render() {
    tank.setState({left: Math.random() * 950, top: Math.random() * 700, direction: Math.random() * 360});
}