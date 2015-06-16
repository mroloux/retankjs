var network = (function () {
    var socket = io();
    var updateTankListeners = [];
    var createUnicornListeners = [];

    socket.on('unicornCreated', function (unicorn) {
        createUnicornListeners.forEach(function(listener) {
            listener(unicorn);
        });
    });

    socket.on('updatetank', function (tank) {
        updateTankListeners.forEach(function(listener) {
            listener(tank);
        });
    });

    return {
        tankChange: function(tank) {
            socket.emit('updatetank', tank);
        },
        onTankChange: function(listener) {
            updateTankListeners.push(listener);
        },
        onCreateUnicorn: function(listener) {
            createUnicornListeners.push(listener);
        }
    }
})();