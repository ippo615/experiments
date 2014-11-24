
var gui = new dat.GUI();

var parameters = {
	width: 200,
	height: 50,
	name: "andrew",
	isTrue: false,
	color: "#ff0000",
	update: function() { alert("Hello!") },
	numberIndex: 1,   // dummy value, only type is important
	textIndex: "...", // because these will come from a list
	x: 0, y: 0, z: 0
};
// gui.add( parameters )
gui.add( parameters, 'width' );
gui.add( parameters, 'height' ).min(0).max(100).step(10);
gui.add( parameters, 'name' );
gui.add( parameters, 'isTrue' ).name('Boolean');

gui.addColor( parameters, 'color' );

var numberList = [1, 2, 3];
gui.add( parameters, 'numberIndex', numberList ).name('Index');

var stringList = ["One", "Two", "Three"];
gui.add( parameters, 'textIndex', stringList ).name('Index');

gui.add( parameters, 'update' ).name("Update");

var folder1 = gui.addFolder('Coordinates');
folder1.add( parameters, 'x' ).onFinishChange(function(v){alert(v);});
folder1.add( parameters, 'y' ).onFinishChange(function(v){
	// copy y to z for the sake of an example
	parameters.z = parameters.y;
	updateGui(gui);
});
folder1.add( parameters, 'z' );
folder1.close();

function updateGui( gui ){
	for (var i in gui.__controllers) {
		gui.__controllers[i].updateDisplay();
	}
	for (var i in gui.__folders) {
		updateGui( gui.__folders[i] );
	}
}


// Each paramter can have it's on onChange and onFinishChange event.
// parm.onChange(function(value) {
//	  // Fires on every change, drag, keypress, etc.
// });
// parm.onFinishChange(function(value) {
//  // Fires when a controller loses focus.
//  alert("The new value is " + value);
// });

gui.open();