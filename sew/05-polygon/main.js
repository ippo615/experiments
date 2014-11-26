
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
