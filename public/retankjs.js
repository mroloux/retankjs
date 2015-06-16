var TankGame = React.createClass({
    render: function () {
        return (
            <img src="images/tank.png" style={{
                position: 'absolute'
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
        //if(e.which === keys.enter)
        console.log(e.which);
        return { event: 'turnleft' };
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

Rx.Observable
    .interval(1000)
    .map(tick)
    .startWith(gamestate)
    .merge(keypress)
    .scan(handlers.dispatch.bind(handlers))
    .subscribe(render);


function render() {
    React.render(
        <TankGame />,
        document.getElementById('tankGame')
    );
}
