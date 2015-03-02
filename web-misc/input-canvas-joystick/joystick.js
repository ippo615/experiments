
var Joystick = (function(){

	function Joystick( canvas ){
		this.canvas = canvas;
		this.xSize = this.canvas.width;
		this.ySize = this.canvas.height;
		this.xCenter = this.xSize / 2.0;
		this.yCenter = this.ySize / 2.0;
		this.grabRadius = 0.05*(this.xSize+this.ySize);
		this.moveRadius = 0.20*(this.xSize+this.ySize);
		this.x = 0.0;
		this.y = 0.0;
		this.isDrag = false;
		this.xStart = 0.0;
		this.yStart = 0.0;
		this.xDragOffset = 0.0;
		this.yDragOffset = 0.0;

		this.caption = '';

		this.xLock = false;
		this.yLock = false;

		this.relaxationScale = 30;
		this.relaxationStep = this.grabRadius * 0.5;
		this._timeMoveHome = this._makeMoveHome();

		// Create handlers for all of the ui events
		this._domMouseDown = this._makeMouseDown();
		this._domMouseUp = this._makeMouseUp();
		this._domMouseMove = this._makeMouseMove();

		// Bind event handlers to the DOM
		this.canvas.addEventListener( 'mousedown', this._domMouseDown );
		this.canvas.addEventListener( 'mouseup', this._domMouseUp );
		this.canvas.addEventListener( 'mousemove', this._domMouseMove );
		this.canvas.addEventListener( 'mouseout', this._domMouseUp );

	}

	Joystick.prototype.read = function(){
		return {
			x: this.x / this.moveRadius,
			y: this.y / this.moveRadius
		};
	};

	Joystick.prototype.resize = function(w,h,grabRadius,moveRadius){
		this.xSize = w;
		this.ySize = h;
		this.canvas.width = this.xSize;
		this.canvas.height = this.ySize;
		this.xCenter = this.xSize / 2.0;
		this.yCenter = this.ySize / 2.0;
		this.grabRadius = grabRadius;
		this.moveRadius = moveRadius;

		this.relaxationStep = this.grabRadius * 0.5;
		this.draw();
		this.moveHome();
	};

	Joystick.prototype.draw = function(){
		var ctx = this.canvas.getContext('2d');
		ctx.clearRect( 0,0, this.xSize,this.ySize );

		// Draw the graby thing
		ctx.beginPath();
		ctx.moveTo( this.xCenter+this.grabRadius, this.yCenter );
		ctx.arc( this.xCenter+this.x, this.yCenter+this.y, this.grabRadius, 0, 2*Math.PI, true);
		ctx.fill();

		// Draw the move area
		ctx.beginPath();
		ctx.moveTo( this.xCenter+this.moveRadius, this.yCenter );
		ctx.arc( this.xCenter, this.yCenter, this.moveRadius, 0, 2*Math.PI, true);
		ctx.stroke();

		// Draw the caption
		ctx.save();
		ctx.textAlign = 'left';
		ctx.textBaseline = 'bottom';
		ctx.fillText(this.caption, 4, this.ySize-4 );
		ctx.restore();
	};

	Joystick.prototype.collisionCircle = function( x1,y1,r1, x2,y2,r2 ){
		var dx = x1 - x2;
		var dy = y1 - y2;
		var sr = r1 + r2;
		return dx*dx + dy*dy < sr*sr;
	};

	Joystick.prototype.collidesWith = function( x,y ){
		return this.collisionCircle( x,y,1, this.x, this.y, this.grabRadius );
	};

	Joystick.prototype.isInside = function( x,y ){
		return this.collisionCircle( x,y,1, 0.0,0.0,this.moveRadius );
	};

	Joystick.prototype.click = function(x,y){
		if( this.collidesWith(x,y) ){
			this.xStart = x;
			this.yStart = y;
			this.xDragOffset = this.x - x;
			this.yDragOffset = this.y - y;
			this.isDragging = true;
			this.onchange({target:this});
		}
	};

	Joystick.prototype.limit = function(){
		if( ! this.isInside( this.x, this.y ) ){
			var angle = Math.atan2(this.y,this.x);
			this.moveTo(
				this.moveRadius * Math.cos(angle),
				this.moveRadius * Math.sin(angle)
			);
		}
	};

	Joystick.prototype.drag = function(x,y){
		if( this.isDragging ){
			var xNew = x+this.xDragOffset;
			var yNew = y+this.yDragOffset;
			this.moveTo( xNew, yNew );
		}
	};

	Joystick.prototype.release = function(x,y){
		if( this.isDragging ){
			this.xEnd = x;
			this.yEnd = y;
			this.moveTo( x+this.xDragOffset, y+this.yDragOffset );
			this.isDragging = false;
			this.moveHome();
		}
	};

	Joystick.prototype.moveTo = function(x,y){
		if( ! this.xLock ){
			this.x = x;
		}
		if( ! this.yLock ){
			this.y = y;
		}
		this.onchange({target:this});
	};

	Joystick.prototype.moveHome = function(){
		this._timeMoveHome();
	};

	Joystick.prototype.onchange = function(evt){
		console.info( evt.target.read() );
	};

	Joystick.prototype._makeMoveHome = function(){
		var that = this;
		return function(){
			// we're moving to 0,0 which simplifies our calculations

			var xNew, yNew;

			if( that.x < -that.relaxationStep ){
				xNew = that.x + that.relaxationStep;
			}else if( that.x > that.relaxationStep ){
				xNew = that.x - that.relaxationStep;
			}else{
				xNew = 0.0;
			}

			if( that.y < -that.relaxationStep ){
				yNew = that.y + that.relaxationStep;
			}else if( that.y > that.relaxationStep ){
				yNew = that.y - that.relaxationStep;
			}else{
				yNew = 0.0;
			}

			that.moveTo( xNew, yNew );
			that.draw();

			if( that.x !== 0.0 || that.y !== 0.0 ){
				setTimeout( that._timeMoveHome, that.relaxationScale );
			}
		};
	};

	Joystick.prototype._makeMouseDown = function(){
		var that = this;
		return function(event){
			var x = event.clientX;
			var y = event.clientY;
			var canvasOrigin = getElementTopLeft(that.canvas);
			x -= canvasOrigin.x;
			y -= canvasOrigin.y;
			that.click( x-that.xCenter, y-that.yCenter );
			that.draw();
		};
	};

	Joystick.prototype._makeMouseUp = function(){
		var that = this;
		return function(event){
			var x = event.clientX;
			var y = event.clientY;
			var canvasOrigin = getElementTopLeft(that.canvas);
			x -= canvasOrigin.x;
			y -= canvasOrigin.y;
			that.release( x-that.xCenter, y-that.yCenter );
			that.draw();
		};
	};

	Joystick.prototype._makeMouseMove = function(){
		var that = this;
		return function(event){
			var x = event.clientX;
			var y = event.clientY;
			var canvasOrigin = getElementTopLeft(that.canvas);
			x -= canvasOrigin.x;
			y -= canvasOrigin.y;
			that.drag( x-that.xCenter, y-that.yCenter );
			that.draw();
		};
	};

	var getElementTopLeft = function( domNode ){
		// I don't care how this computes/handles borders/margin/padding
		// because all of my measurements are relative
		var box = domNode.getBoundingClientRect();
		return {
			x: box.left,
			y: box.top
		};
	};

	return Joystick;

})();
