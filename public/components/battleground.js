var battlegroundState = {
    tanks: [
        new Tank()
    ],
    unicorns: [],
    updateTank: function (updatedTank) {
        updatedTank.boundingBox = Tank.prototype.boundingBox;
        var tankToUpdate = this.tanks.filter(function (tank) {
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
    },
    collides: function (object, newBoundingBox) {
        for (var i = 0; i < this.tanks.length; ++i) {
            var currentTank = this.tanks[i];
            if (currentTank != object) {
                if (currentTank.boundingBox().getCollisionBox().intersectsWith(newBoundingBox.getCollisionBox())) {
                    return currentTank;
                }
            }
        }
        return false;
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
                return <TankComponent state={state} />
            })}
            {this.state.unicorns.map(function (state) {
                return <UnicornComponent state={state} />
            })}
            </div>
            );
    }
});

var battleground = React.render(
    <Battleground />,
    document.getElementById('battleground')
);