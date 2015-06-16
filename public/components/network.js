var network = (function () {
    var socket = io();

    socket.on('unicornCreated', function (unicorn) {
        gamestate.unicorns.push(unicorn);
    });
})();