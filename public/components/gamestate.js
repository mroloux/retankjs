var gamestate = {
    name: 'tankular',
    tanks: [
        {
            id: Date.now(),
            isTurning: false,
            turningDirection: '',
            turningSpeed: 5,
            drivingSpeed: 2
        },
        {
            isTurning: false,
            turningDirection: '',
            turningSpeed: 5,
            drivingSpeed: 2
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