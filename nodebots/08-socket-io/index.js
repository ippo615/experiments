
// npm install socket.io
// npm install express

var app = require('express')();
var http = require('http').Server(app);
var io = require('socket.io')(http);

app.get( '/jquery-1.11.1.js', function(req, res){
  res.sendFile(__dirname + '/jquery-1.11.1.js');
});
app.get( '/socket.io-1.2.0.js', function(req, res){
  res.sendFile(__dirname + '/socket.io-1.2.0.js');
});
app.get('/', function(req, res){
  res.sendFile(__dirname + '/index.html');
});

io.on('connection', function(socket){
  socket.on('chat message', function(msg){
    io.emit('chat message', msg);
  });
});

http.listen(3000, function(){
  console.log('listening on *:3000');
});

// Temp measure stuff
var five = require("johnny-five");

five.Board().on("ready", function() {
  var temperature = new five.Temperature({
    controller: "TMP36",
    pin: "A0"
  });

  temperature.on("data", function(err, data) {
    io.emit(
      'temperature',
      data.celsius.toPrecision(2) + "°C "+
      data.fahrenheit.toPrecision(2) + "°F"
    );
  });
});
