var canvas, ctx;

function init() {

	canvas = document.createElement('canvas');
	ctx = canvas.getContext('2d');
	document.body.appendChild(canvas);

	canvas.width = 640;
	canvas.height = 480;
	ctx.strokeStyle = '#888';

	var poly = new Polygon([
		new Point( 30, 30, 0 ),
		new Point( 50, 60, 0 ),
		new Point( 90, 30, 0 ),
		new Point( 70, 60, 0 ),
		new Point( 90, 90, 0 ),
		new Point( 30, 90, 0 )
	]);

	poly.ui_draw(ctx);

	for( var x=2.5; x<100; x+=7 ){
		for( var y=2.5; y<100; y+=7 ){
			if( is_point_in_poly( poly.points, new Point( x, y, 0 ) ) ){
				ctx.fillRect( x-1, y-1, 2, 2 );
			}
		}
	}

}

window.onload = function() {
	init();
};

