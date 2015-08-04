
var canvas = new fabric.Canvas('canvas-main');
var group = new fabric.Group();

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
			opacity: 0.7
		});
		rect.on('mousedown',function(e){ console.info( e ); });
		rect.on('mouse:down',function(e){ console.info( e ); });
		rects.push( rect );
		//canvas.add(rect);
		group.add(rect);
	}
}
//group.selectable = false;
group.on('mousedown',function(e){console.info(e);});
group.on('mouse:down',function(e){console.info(e);});
canvas.on('mousedown',function(e){console.info(e);});
canvas.on('mouse:move',function(e){console.info(e);});
canvas.add( group );
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
