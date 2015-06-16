var express = require('express');
var app = express();
var path = require('path');
var http = require('http').Server(app);
var io = require('socket.io')(http);

app.use('/', express.static(path.join(__dirname, 'public')));

io.on('connection', function (socket) {
    socket
        .on('disconnect', function () {
            console.log("disconnect :-(");
        });
});

setInterval(function() {
    io.sockets.emit('unicornCreated', { x: Math.random() * 950, y: Math.random() * 700});
}, 1000);

http.listen(3000, function () {
    console.log('listening on *:3000');
});