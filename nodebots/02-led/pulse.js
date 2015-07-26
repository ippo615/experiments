
var five = require("johnny-five");
var board = new five.Board();

board.on("ready", function() {

  // Create a standard `led` component
  // on a valid pwm pin
  var led = new five.Led(11);

  led.pulse();

  // Stop and turn off the led pulse loop after
  // 1 minute (shown in ms)
  console.info( 'Starting pulse' );
  this.wait(10000, function() {

    // stop() terminates the interval
    // off() shuts the led off
    led.stop().off();
    console.info( 'Stopping pulse' );
  });
});
