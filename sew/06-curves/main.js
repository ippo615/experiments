/*
var gui = new dat.GUI();
var canvas = document.createElement('canvas');
var ctx = canvas.getContext('2d');
document.body.appendChild(canvas);

var shirt = new Shirt();
function uiDraw(){
	ctx.clearRect(0,0,999,999);
	shirt.uiDraw(ctx);
}

shirt.extendGui(gui,uiDraw);
uiDraw();
*/

var canvas = document.createElement('canvas');
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;
var ctx = canvas.getContext('2d');
document.body.appendChild(canvas);

function testLine( line, ctx ){
	console.info( line.length() );
	console.info( JSON.stringify(line.point(0)) +' :: '+ JSON.stringify(line.start) );
	console.info( JSON.stringify(line.point(0.5)) );
	console.info( JSON.stringify(line.point(1)) +' :: '+ JSON.stringify(line.end) );
	console.info( line.tangent(0) );
	console.info( line.tangent(1) );

	if( ctx ){
		ctx.beginPath();
		line.uiDraw(ctx);
		ctx.stroke();
	}
}

var l1 = new Line(
	new Vector(0,0),
	new Vector(20,0)
);
var l2 = new Line(
	new Vector(0,0),
	new Vector(0,20)
);
var l3 = new Line(
	new Vector(0,0),
	new Vector(-20,0)
);
var l4 = new Line(
	new Vector(0,0),
	new Vector(0,-20)
);
var l5 = new Line(
	new Vector(0,0),
	new Vector(20,20)
);

l1.translate( new Vector( 20, 20 ) );
l2.translate( new Vector( 40, 20 ) );
l3.translate( new Vector( 60, 20 ) );
l4.translate( new Vector( 80, 20 ) );
l5.translate( new Vector(100, 20 ) );

console.info( 'Line' );
testLine( l1, ctx );
testLine( l2, ctx );
testLine( l3, ctx );
testLine( l4, ctx );
testLine( l5, ctx );

var qb1 = new QuadraticBezier(
	new Vector(0,0),
	new Vector(20,0),
	new Vector(10,10)
);
var qb2 = new QuadraticBezier(
	new Vector(0,0),
	new Vector(0,20),
	new Vector(10,10)
);
var qb3 = new QuadraticBezier(
	new Vector(0,0),
	new Vector(-20,0),
	new Vector(-10,10)
);
var qb4 = new QuadraticBezier(
	new Vector(0,0),
	new Vector(0,-20),
	new Vector(10,-10)
);
var qb5 = new QuadraticBezier(
	new Vector(0,0),
	new Vector(20,20),
	new Vector(10,10)
);

qb1.translate( new Vector( 20, 50 ) );
qb2.translate( new Vector( 40, 50 ) );
qb3.translate( new Vector( 60, 50 ) );
qb4.translate( new Vector( 80, 50 ) );
qb5.translate( new Vector(100, 50 ) );

console.info( 'Quadratic Bezier' );
testLine( qb1, ctx );
testLine( qb2, ctx );
testLine( qb3, ctx );
testLine( qb4, ctx );
testLine( qb5, ctx );

var cb1 = new CubicBezier(
	new Vector(0,0),
	new Vector(20,0),
	new Vector(0,10),
	new Vector(20,10)
);
var cb2 = new CubicBezier(
	new Vector(0,0),
	new Vector(0,20),
	new Vector(10,0),
	new Vector(10,20)
);
var cb3 = new CubicBezier(
	new Vector(0,0),
	new Vector(-20,0),
	new Vector(0,10),
	new Vector(-20,10)
);
var cb4 = new CubicBezier(
	new Vector(0,0),
	new Vector(0,-20),
	new Vector(10,0),
	new Vector(10,-20)
);
var cb5 = new CubicBezier(
	new Vector(0,0),
	new Vector(20,20),
	new Vector(0,0),
	new Vector(20,20)
);

cb1.translate( new Vector( 20, 90 ) );
cb2.translate( new Vector( 40, 90 ) );
cb3.translate( new Vector( 60, 90 ) );
cb4.translate( new Vector( 80, 90 ) );
cb5.translate( new Vector(100, 90 ) );

console.info( 'Cubic Bezier' );
testLine( cb1, ctx );
testLine( cb2, ctx );
testLine( cb3, ctx );
testLine( cb4, ctx );
testLine( cb5, ctx );


var e1 = new Ellipse(
	new Vector(0,0),
	new Vector(10,10),
	0, Math.PI,
	true
);

e1.translate( new Vector( 20, 120 ) );

console.info( 'Ellipse' );
testLine( e1, ctx );
