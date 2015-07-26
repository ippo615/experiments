var Barcli = require("barcli");
var five = require("johnny-five");
var board = new five.Board({
  debug: false, repl: false
});
board.on("ready", function() {
  var range = [0, 100];
  var graph = new Barcli({
    label: "Potentiometer",
    range: range,
  });
  var rotary = new five.Sensor("A0");

  rotary.scale(range).on("change", function() {
    graph.update(this.value);
  });
});
