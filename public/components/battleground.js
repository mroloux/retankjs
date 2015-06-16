var battlegroundState = {
    tanks: [
        {
            id: Date.now(),
            isTurning: false,
            turningDirection: '',
            turningSpeed: 5,
            drivingSpeed: 2,
            left: 0,
            top: 0,
            direction: 0
        }
    ],
    unicorns: [],
    updateTank: function(updatedTank) {
        var tankToUpdate = this.tanks.filter(function(tank) {
            return tank.id === updatedTank.id;
        })[0];
        if (!tankToUpdate) {
            tankToUpdate = updatedTank;
            this.tanks.push(tankToUpdate);
        } else {
            for (var prop in updatedTank) {
                tankToUpdate[prop] = updatedTank[prop];
            }
        }
    }
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