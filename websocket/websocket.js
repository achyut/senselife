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
    });


    socket.on('distance',function(data){
      console.log("distance: "+data);
      socket.broadcast.emit('distance',data);
    });


    socket.on('calorie',function(data){
      console.log("calorie: "+data);
      socket.broadcast.emit('calorie',data);
    });



    socket.on('steps',function(data){
      console.log("steps: "+data);
      socket.broadcast.emit('steps',data);
    });

    socket.on('temperature',function(data){
      console.log("temperature: "+data);
      socket.broadcast.emit('temperature',data);
    });

    socket.emit('text', 'wow. such event. very real time.');
});

server.listen(3000);