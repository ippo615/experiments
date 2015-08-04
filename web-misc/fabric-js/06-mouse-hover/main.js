
var canvas = new fabric.Canvas('canvas-main');

var colors = 'red yellow green blue'.split(' ');

var rects = [];

for( var x=0; x<10; x+=1 ){
	for( var y=0; y<10; y+=1 ){
		var rect = new fabric.Rect({
			left: x*32,
			top: y*24,
			originX: 'center',
			originY: 'center',
			fill: colors[(x+y) % colors.length],
			stroke: 'black',
			width: 16,
			height: 12,
			selectable: false,
			opacity: 0.7
			// I can dump any property I want here and
			// access it in the rect object
		});
		rects.push( rect );
		canvas.add(rect);
	}
}
canvas.renderAll();

canvas.on('mouse:over', function(e) {
	e.target.setOpacity(1.0);
	e.target.scale(1.5);
	canvas.renderAll();
});

canvas.on('mouse:out', function(e) {
	e.target.setOpacity(0.7);
	e.target.scale(1.0);
	canvas.renderAll();
});
