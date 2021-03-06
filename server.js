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

    socket.on('bulletShot', function (bullet) {
        socket.broadcast.emit('bulletShot', bullet);
    });
});

function scheduleUnicorn() {
    setTimeout(function() {
        io.sockets.emit('unicornCreated', { left: Math.random() * 950, top: Math.random() * 700});
        scheduleUnicorn();
    }, Math.random() * 20000);
}

scheduleUnicorn();

http.listen(3000, function () {
    console.log('listening on *:3000');
});