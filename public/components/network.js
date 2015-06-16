var network = (function () {
    var socket = io();
    var updateTankListeners = [];
    var createUnicornListeners = [];
    var bulletShotListeners = [];

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

    socket.on('bulletShot', function (bullet) {
        bulletShotListeners.forEach(function(listener) {
            listener(bullet);
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
        },
        shootBullet: function(bullet) {
            socket.emit('bulletShot', bullet);
        },
        onBulletShot: function(listener) {
            bulletShotListeners.push(listener);
        }
    }
})();