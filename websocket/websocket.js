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
      	timestamp: data["timestamp"],
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
      //console.log(data);
      socket.broadcast.emit('distance',data);
      
       var distanceValue  = {
        created_by: data["userid"],
        timestamp: data["timestamp"],
        distance: data["todayDistance"],
        created_at:moment().format('YYYY-MM-DD HH:mm:ss'),
        updated_at:moment().format('YYYY-MM-DD HH:mm:ss')
      };

      var query = connection.query('INSERT INTO distances SET ?', distanceValue, function(err, result) {
        if(err){
          console.log("not inserted into distance");  
        }
       });
       //console.log(query.sql);

    });


    socket.on('calorie',function(data){
      //console.log(data);
      socket.broadcast.emit('calorie',data);

      var calorieValue  = {
        created_by: data["userid"],
        timestamp: data["timestamp"],
        value: data["todayCalorie"],
        created_at:moment().format('YYYY-MM-DD HH:mm:ss'),
        updated_at:moment().format('YYYY-MM-DD HH:mm:ss')
      };

      var query = connection.query('INSERT INTO calories SET ?', calorieValue, function(err, result) {
        if(err){
          console.log("not inserted into calorie");  
        }
       });
       //console.log(query.sql);


    });



    socket.on('steps',function(data){
      //console.log(data);
      socket.broadcast.emit('steps',data);
      var stepValue  = {
        created_by: data["userid"],
        timestamp: data["timestamp"],
        value: data["totalSteps"],
        created_at:moment().format('YYYY-MM-DD HH:mm:ss'),
        updated_at:moment().format('YYYY-MM-DD HH:mm:ss')
      };
      //console.log(stepValue);
      var query = connection.query('INSERT INTO steps SET ?', stepValue, function(err, result) {
        if(err){
          console.log("not inserted into steps");  
        }
        //console.log(err);
      
       });
       //console.log(query.sql);

    });

    socket.on('temperature',function(data){
      //console.log(data);
      socket.broadcast.emit('temperature',data);

      //console.log(data);
      socket.broadcast.emit('steps',data);
      var temperatureValue  = {
        created_by: data["userid"],
        timestamp: data["timestamp"],
        temperature: data["temperature"],
        created_at:moment().format('YYYY-MM-DD HH:mm:ss'),
        updated_at:moment().format('YYYY-MM-DD HH:mm:ss')
      };

      var query = connection.query('INSERT INTO temperatures SET ?', temperatureValue, function(err, result) {
        if(err){
          console.log("not inserted into temperatures");  
        }
      
       });
       //console.log(query.sql);

    });

    socket.emit('text', 'wow. such event. very real time.');
});

server.listen(3000);