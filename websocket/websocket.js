var server = require('http').createServer();
var io = require('socket.io')(server);
var moment = require('moment');
var mysql      = require('mysql');
var connection = mysql.createConnection({
  host     : 'localhost',
  user     : 'root',
  password : 'pass',
  database : 'ilife'
});

connection.connect(function(err){
if(!err) {
    console.log("Database is connected ... ");    
} else {
    console.log("Error connecting database ...");    
}
});


io.sockets.on('connection', function (socket) {
    console.log('socket connected');

    socket.on('disconnect', function () {
        console.log('socket disconnected');
    });

    socket.on('heartrate',function(data){
      //console.log(data);
      
      socket.broadcast.emit('heartrate',data);
      var heartvalue  = {
      	created_by: data["userid"],
      	heartimestamp: data["timestamp"],
      	value: data["heartRate"],
      	created_at:moment().format('YYYY-MM-DD HH:mm:ss'),
      	updated_at:moment().format('YYYY-MM-DD HH:mm:ss')
      };

	  var query = connection.query('INSERT INTO heartrates SET ?', heartvalue, function(err, result) {
		  if(err){
        console.log("not inserted into heartrate");  
      }
      
	  });
	  //console.log(query.sql);

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