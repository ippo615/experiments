
var canvas = new fabric.Canvas('canvas-main');

var colors = 'red yellow green blue'.split(' ');

var rects = [];

var animationHandle;
(function animate() {
	console.info( 'anim' );
	canvas.renderAll();
	animationHandle = fabric.util.requestAnimFrame(animate);
})();

for( var i=0; i<50; i+=1 ){
	var rect = new fabric.Rect({
		left: Math.random()*320,
		top: Math.random()*240,
		fill: colors[i % colors.length],
		stroke: 'black',
		width: 50,
		height: 50
	});
	rects.push( rect );
	canvas.add(rect);

	rect.animate('scaleY', '1', {
		from: 0,
		duration: 1000, // ms
		easing: fabric.util.ease.easeInOut,
		onComplete: function(){
			window.cancelAnimationFrame( animationHandle );
			console.info( this );
		},
		// No arguments are passes to onComplete; howevever, I can manually
		// add properties which are available through  `this` in onComplete
		target: rect 
	});
	rect.animate('scaleX', '1', {
		from: 0,
		duration: 1000, // ms
		easing: fabric.util.ease.easeInOut,
		onComplete: function(){
			console.info( this );
		},
		// No arguments are passes to onComplete; howevever, I can manually
		// add properties which are available through  `this` in onComplete
		target: rect 
	});

}
canvas.on('change',canvas.renderAll.bind(canvas));
