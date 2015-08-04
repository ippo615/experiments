
var canvas = new fabric.Canvas('canvas-main');

var colors = 'red yellow green blue'.split(' ');

var rects = [];

for( var i=0; i<50; i+=1 ){
	var rect = new fabric.Rect({
		left: Math.random()*320,
		top: Math.random()*240,
		fill: colors[i % colors.length],
		stroke: 'black',
		width: 50,
		height: 50,
		selectable: false
	});
	rects.push( rect );
	canvas.add(rect);
}
canvas.renderAll();
canvas.on('mouse:move', function(event){
	if( ! event.target ){
		console.info( 'No target in event' );
		return;
	}
	if( event.target._isAnimating ){ return; }
	event.target._isAnimating = true;
	event.target.animate('scaleY', '+=1', {
		duration: 500, // ms
		easing: fabric.util.ease.easeOutBounce,
		onChange: canvas.renderAll.bind(canvas),
		onComplete: (function(obj){
			return function(){
				obj.animate( 'scaleY', '-=1', {
					duration: 500, // ms
					easing: fabric.util.ease.easeOutBounce,
					onChange: canvas.renderAll.bind(canvas),
					onComplete: (function(o){
						return function(){
							o._isAnimating = false;
						};
					})(obj)
				} );
			}
		})(event.target),
		// No arguments are passes to onComplete; howevever, I can manually
		// add properties which are available through  `this` in onComplete
		target: rect 
	});
	event.target.animate();
});
