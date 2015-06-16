var express = require('express');
var app = express();
var path = require('path');
var http = require('http').Server(app);
var io = require('socket.io')(http);

app.use('/', express.static(path.join(__dirname, 'public')));

io.on('connection', function (socket) {
    socket.on('disconnect', function () {
        console.log("disconnect :-(");
    });

    socket.on('updatetank', function (tank) {
        socket.broadcast.emit('updatetank', tank);
    });
});

function scheduleUnicorn() {
    setTimeout(function() {
        io.sockets.emit('unicornCreated', { x: Math.random() * 950, y: Math.random() * 700});
        scheduleUnicorn();
    }, Math.random() * 20000);
}

scheduleUnicorn();

http.listen(3000, function () {
    console.log('listening on *:3000');
});