
var five = require("johnny-five");
var board = new five.Board();

board.on("ready", function() {
	var knocker = new five.Sensor("A1");

	var knockThreshold = 10;

	knocker.on("change",function(){
		if( this.value > knockThreshold ){
			console.info( "Knock Found! ("+this.value+")" );
		}
	});

});
