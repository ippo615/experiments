
var canvas = new fabric.Canvas('canvas-main');

var rect = new fabric.Rect({
  left: 10,
  top: 10,
  fill: 'red',
  width: 50,
  height: 50,
});

canvas.add(rect);

rect.animate('angle', '-=360', {
	duration: 2000, // ms
	easing: fabric.util.ease.easeInCubic,
	onChange: canvas.renderAll.bind(canvas),
	onComplete: function(){
		console.info( this );
	},
	// No arguments are passes to onComplete; howevever, I can manually
	// add properties which are available through  `this` in onComplete
	target: rect 
});
