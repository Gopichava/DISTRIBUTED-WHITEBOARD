var exp = require('express')
var application = require('express')();
var runningAppHttp = require('http').Server(application);
var input_output = require('socket.io')(runningAppHttp);
var urlPath = require('path');

console.log('Starting application!!!!');
application.get('/', function(req, res){
  res.sendFile( urlPath.join(__dirname,'/whiteboardApp','/index.html') );
});

application.use( exp.static('whiteboardApp') );

input_output.on('connection', function(socket){
  socket.on("canvas data from client-mousedown",function(data){
    socket.broadcast.emit("canvas data from server-mousedown",data);
  });

    socket.on("canvas data from client-mousemove",function(data){
    socket.broadcast.emit("canvas data from server-mousemove",data);
  });

  console.log('Running application!!!!');

  socket.on("canvas data from client-mouseup",function(data){
    socket.broadcast.emit("canvas data from server-mouseup",{});
  });
});

console.log('Listening application!!!!');

runningAppHttp.listen(3000, function(){
    console.log('open localhost on port 3000 on web');
  });