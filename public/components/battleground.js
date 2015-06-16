var battlegroundState = {
    tanks: [
        {
            left: 0,
            top: 0,
            direction: 0
        },
        {
            left: 0,
            top: 0,
            direction: 0
        }
    ]
};

var Battleground = React.createClass({
    getInitialState: function () {
        return battlegroundState;
    },
    render: function () {
        return (
            <div>
            {this.state.tanks.map(function (state) {
                return <Tank state={state} />
            })}
            </div>
            );
    }
});

var battleground = React.render(
    <Battleground />,
    document.getElementById('battleground')
);