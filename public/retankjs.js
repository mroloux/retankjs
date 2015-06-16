var TankGame = React.createClass({
    getInitialState: function () {
        return {left: 0, top: 0};
    },
    render: function () {
        return (
            <img src="images/tank.png"
            style={{
                position: 'absolute',
                top: this.state.top,
                left: this.state.left
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
            case 38: return { event: 'directionup' };
            case 40: return { event: 'directiondown' };
            case 37: return { event: 'directionleft' };
            case 39: return { event: 'directionright' };
        }
    });

var handlers = {
    dispatch: function (gs, e) {
        return this['_' + e.event](gs, e.data);
    },

    _tick: function (gs) {
        return gs;
    },

    _turnleft: function (gs) {
        return gs;
    }
};

var tankGame = React.render(
    <TankGame />,
    document.getElementById('tankGame')
);

Rx.Observable
    .interval(100)
    .map(tick)
    .startWith(gamestate)
    .merge(keypress)
    .scan(handlers.dispatch.bind(handlers))
    .subscribe(render);

function render() {
    tankGame.setState({left: Math.random() * 1000, top: Math.random() * 300});
}