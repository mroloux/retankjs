var gamestate = {
    name: 'tankular',
    tanks: [
        {
            id: Date.now(),
            isTurning: false,
            turningDirection: '',
            turningSpeed: 5,
            drivingSpeed: 2,
            initialState: {
                top: 0,
                left: 0,
                direction: 70
            }
        },
        {
            isTurning: false,
            turningDirection: '',
            turningSpeed: 5,
            drivingSpeed: 2,
            initialState: {
                top: 400,
                left: 400,
                direction: 250
            }
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