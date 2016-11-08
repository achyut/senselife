var server = require('http').createServer();
var io = require('socket.io')(server);

io.sockets.on('connection', function (socket) {
    console.log('socket connected');

    socket.on('disconnect', function () {
        console.log('socket disconnected');
    });

    socket.on('heartrate',function(data){
      console.log(data);
      socket.broadcast.emit('heartrate',data);
      //socket.emit('heartratereceiver',data);  
    });


    socket.emit('text', 'wow. such event. very real time.');
});

server.listen(3000);