var id = Date.now()
var battlegroundState = {
    options: {
        cruiseControl: true
    },
    tanks: [
        {
            id: id,
            name: 'Player' + id,
            isTurning: false,
            isDriving: true,
            drivingDirection: 'forward',
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
    },
    collides: function(object, top, left, width, height) {

    },
    bullets: []
};

var Battleground = React.createClass({
    getInitialState: function () {
        return battlegroundState;
    },
    render: function () {
        return (
            <div className="battlegroundContainer">
            {this.state.tanks.map(function (state) {
                return <TankComponent state={state} />
            })}
            {this.state.unicorns.map(function (state) {
                return <UnicornComponent state={state} />
            })}
            {this.state.bullets.map(function (state) {
                return <BulletComponent state={state} />
            })}
            </div>
            );
    }
});

var Player = React.createClass({
    getInitialState: function () {
        return battlegroundState.tanks[0];
    },
    handleChange: function(event) {
        this.state.name = event.target.value;
    },
    render: function() {
        return <div class="playername">
            <label for="playerName">Player name</label>
            <input type="text" onChange={this.handleChange} />
        </div>;
    }
});

var CruiseControlCheckbox = React.createClass({
  getInitialState: function() {
    return { isChecked: battlegroundState.options.cruiseControl };
  },
  onChange: function() {
    this.setState({isChecked: !this.state.isChecked});
    battlegroundState.options.cruiseControl = !battlegroundState.options.cruiseControl;
    battlegroundState.tanks[0].isDriving = battlegroundState.options.cruiseControl;
  },
  render: function() {
    return (
      <label>
        <input
          type="checkbox"
          checked={this.state.isChecked}
          onChange={this.onChange}
        />
        Cruise control: {this.state.isChecked ? 'ON' : 'OFF'}
      </label>
    );
  }
});

var battleground = React.render(
    <Battleground />,
    document.getElementById('battleground')
);

var player = React.render(
    <Player />,
    document.getElementById('player')
);

var cruiseControlCheckbox = React.render(
    <CruiseControlCheckbox />,
    document.getElementById('cruiseControl')
);