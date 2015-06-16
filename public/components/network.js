var network = (function () {
    var socket = io();
    var listeners = [];

    socket.on('unicornCreated', function (unicorn) {
        gamestate.unicorns.push(unicorn);
    });

    socket.on('updatetank', function (tank) {
        listeners.forEach(function(listener) {
            listener(tank);
        });
    });

    return {
        tankChange: function(tank) {
            socket.emit('updatetank', tank);
        },
        onTankChange: function(listener) {
            listeners.push(listener);
        }
    }
})();