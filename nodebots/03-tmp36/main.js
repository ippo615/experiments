var five = require("johnny-five");

five.Board().on("ready", function() {
  var temperature = new five.Temperature({
    controller: "TMP36",
    pin: "A0"
  });

  temperature.on("data", function(err, data) {
    console.log(
      data.celsius.toPrecision(2) + "°C "+
      data.fahrenheit.toPrecision(2) + "°F"
    );
  });
});
