
var parameters = {
	width: 30,
	height: 60,

	neckWidth: 10,
	neckHeight: 5,

	sleeveWidth: 3,
	sleeveHeight: 10
};

var uiParameterHandles = {};

function updateWidth(){
	console.info( uiParameterHandles );
	uiParameterHandles.neckWidth.max( parameters.width * 0.4 );
	uiParameterHandles.sleeveWidth.max( parameters.width * 0.5 );
	uiDraw();
}
function updateHeight(){
	uiParameterHandles.neckHeight.max( parameters.height * 0.4 );
	uiParameterHandles.sleeveHeight.max( parameters.height * 0.4 );
	uiDraw();
}

function extendGui( gui ){
	for( var parm in parameters ){
		if( parameters.hasOwnProperty(parm) ){
			uiParameterHandles[parm] = gui.add(parameters,parm).min(1).max(100).step(1);
		}
	}
	uiParameterHandles.neckWidth.onChange( uiDraw );
	uiParameterHandles.neckHeight.onChange( uiDraw );
	uiParameterHandles.sleeveWidth.onChange( uiDraw );
	uiParameterHandles.sleeveHeight.onChange( uiDraw );
	uiParameterHandles.width.onChange( updateWidth );
	uiParameterHandles.height.onChange( updateHeight );
	updateWidth();
	updateHeight();
}

function draw(ctx){
	ctx.clearRect(0,0,999,999);
	var xMid = parameters.width*0.5;
	ctx.beginPath();
	ctx.moveTo(0,0);
	ctx.lineTo(parameters.width,0);
	ctx.lineTo(parameters.width,parameters.height-parameters.sleeveHeight);
	ctx.lineTo(xMid+parameters.neckWidth*0.5+parameters.sleeveWidth,parameters.height-parameters.sleeveHeight);
	ctx.lineTo(xMid+parameters.neckWidth*0.5+parameters.sleeveWidth,parameters.height);
	ctx.lineTo(xMid+parameters.neckWidth*0.5,parameters.height);
	ctx.lineTo(xMid+parameters.neckWidth*0.5,parameters.height-parameters.neckHeight);
	ctx.lineTo(xMid-parameters.neckWidth*0.5,parameters.height-parameters.neckHeight);
	ctx.lineTo(xMid-parameters.neckWidth*0.5,parameters.height);
	ctx.lineTo(xMid-parameters.neckWidth*0.5-parameters.sleeveWidth,parameters.height);
	ctx.lineTo(xMid-parameters.neckWidth*0.5-parameters.sleeveWidth,parameters.height-parameters.sleeveHeight);
	ctx.lineTo(0,parameters.height-parameters.sleeveHeight);
	ctx.lineTo(0,0);
	ctx.stroke();
}

var canvas, ctx;
canvas = document.createElement('canvas');
ctx = canvas.getContext('2d');
document.body.appendChild(canvas);
function resize(w,h){
	canvas.width = w;
	canvas.height = h;
	draw(ctx);
}

function uiDraw(){
	draw(ctx);
}

