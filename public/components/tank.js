
var Tank = React.createClass({
    getInitialState: function () {
        var tankInitialState = gamestate.tanks[this.props.tankindex].initialState;
        return {left: tankInitialState.left, top: tankInitialState.top, direction: tankInitialState.direction};
    },
    render: function () {
        return (
            <img src="images/tank.png"
                 style={{
                position: 'relative',
                top: this.state.top,
                left: this.state.left,
                transform: 'rotate(' + this.state.direction + 'deg)'
            }} />
        );
    }
});

var tank = React.render(
    <Tank tankindex="0" />,
    document.getElementById('playerTank')
);

var opponentTank = React.render(
    <Tank tankindex="1" />,
    document.getElementById('opponentTank')
);