var originalSize = {x:320,y:240};
var scale = 1;

var canvas = new fabric.Canvas('canvas-main');

var rect = new fabric.Rect({
  left: 10,
  top: 10,
  fill: 'red',
  width: 10,
  height: 10,
});

canvas.add(rect);

function resize(){
	scale = window.innerWidth / originalSize.x;
	canvas.setDimensions( {
		width: window.innerWidth,
		height: window.innerHeight
	} );
	canvas.setZoom( scale );
	canvas.renderAll();
}

resize();
window.onresize = resize;
