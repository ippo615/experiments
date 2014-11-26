var Shirt = (function(){

	// Should be moved to a shared library
	function drawPolygon( ctx, poly ){
		var nPoints = poly.length;
		ctx.moveTo( poly[0].x, poly[0].y );
		for( var i=1; i<nPoints; i+=1 ){
			ctx.lineTo( poly[i].x, poly[i].y );
		}
	}

	function polygonOffset( poly, amount, direction ){
		// This looks (draws) weird because the offsets intersect each
		// other (ie go past each other). I should find the intersection
		// of the 2 lines and draw to there.
		var offsetPoly = [];
		var l = poly.length;
		for( var i=0; i<l; i+=1 ){
			var edge = new Edge( poly[i], poly[(i+1)%l] );
			edge.offset( amount, direction );
			//offsetPoly.push( poly[i] );
			offsetPoly.push( edge.start.clone() );
			offsetPoly.push( edge.end.clone() );
			//offsetPoly.push( poly[(i+1)%l] );
		}
		return offsetPoly;
	}

	// The default properties (or parameters) for a shirt
	var defaults = {
		width: 30,
		height: 60,

		neckWidth: 10,
		neckHeight: 5,

		sleeveWidth: 3,
		sleeveHeight: 10,

		seamAllowance: 5
	};

	function Shirt(parameters){

		// Use default parameters if none are specified
		parameters = parameters || {};
		this.parameters = {};
		for( var prop in defaults ){
			if( defaults.hasOwnProperty(prop) ){
				this.parameters[prop] = defaults[prop];
				if( parameters.hasOwnProperty(prop) ){
					this.parameters[prop] = parameters[prop];
				}
			}
		}

		// Defind other properties
		this.uiHandles = {};
		this.polygon = [];

		// Initialize everything
		this.update();
	}

	// -------------------------------------------- [ Custom Methods ] -
	//  Only Shirts are guarentee to have these
	// -----------------------------------------------------------------
	Shirt.prototype.updateWidth = function(value){
		this.uiHandles.neckWidth.max( this.parameters.width * 0.4 );
		this.uiHandles.sleeveWidth.max( this.parameters.width * 0.5 );
	};
	Shirt.prototype.updateHeight = function(value){
		this.uiHandles.neckHeight.max( this.parameters.height * 0.4 );
		this.uiHandles.sleeveHeight.max( this.parameters.height * 0.5 );
	};

	// ------------------------------------------- [ General Methods ] -
	//  ALL 'clothing templates' should have these
	// -----------------------------------------------------------------

	Shirt.prototype.update = function(){
		var xMid = this.parameters.width*0.5;
		var poly = [];
		poly.push(new Vector(0,0));
		poly.push(new Vector(this.parameters.width,0));
		poly.push(new Vector(this.parameters.width,this.parameters.height-this.parameters.sleeveHeight));
		poly.push(new Vector(xMid+this.parameters.neckWidth*0.5+this.parameters.sleeveWidth,this.parameters.height-this.parameters.sleeveHeight));
		poly.push(new Vector(xMid+this.parameters.neckWidth*0.5+this.parameters.sleeveWidth,this.parameters.height));
		poly.push(new Vector(xMid+this.parameters.neckWidth*0.5,this.parameters.height));
		poly.push(new Vector(xMid+this.parameters.neckWidth*0.5,this.parameters.height-this.parameters.neckHeight));
		poly.push(new Vector(xMid-this.parameters.neckWidth*0.5,this.parameters.height-this.parameters.neckHeight));
		poly.push(new Vector(xMid-this.parameters.neckWidth*0.5,this.parameters.height));
		poly.push(new Vector(xMid-this.parameters.neckWidth*0.5-this.parameters.sleeveWidth,this.parameters.height));
		poly.push(new Vector(xMid-this.parameters.neckWidth*0.5-this.parameters.sleeveWidth,this.parameters.height-this.parameters.sleeveHeight));
		poly.push(new Vector(0,this.parameters.height-this.parameters.sleeveHeight));
		poly.push(new Vector(0,0));
		this.polygon = poly;
	};

	Shirt.prototype.uiDraw = function(ctx){
		ctx.beginPath();
		drawPolygon(ctx, this.polygon);
		ctx.stroke();

		var seams = polygonOffset( this.polygon, this.parameters.seamAllowance, -1 );
		ctx.beginPath();
		drawPolygon(ctx, seams);
		ctx.stroke();
	};

	Shirt.prototype.extendGui = function( gui, onChange ){
		var folder = gui.addFolder('Shirt');
		//var folder = gui;
		var shirt = this;

		// WARNING: You must store/set the parameters as shown below.
		// For some reason there is a `Node Not Found` error when trying
		// to update parameters later after initializing with:
		//     this.uiHandles.width = folder.add(this.parameters,'width');
		//     this.uiHandles.width.min(1).max(100).step(1);
		//     this.uiHandles.onChange( onChange );
		// Use the uncommented format below:

		this.uiHandles.width = folder.add(this.parameters,'width')
			.min(1).max(100).step(1);
		this.uiHandles.width.onChange( function(value){
				shirt.updateWidth(value);
				shirt.update();
				onChange();
			} );

		this.uiHandles.height = folder.add(this.parameters,'height')
			.min(1).max(100).step(1);
		this.uiHandles.height.onChange( function(value){
				shirt.updateHeight(value);
				shirt.update();
				onChange();
			} );

		this.uiHandles.neckWidth = folder.add(this.parameters,'neckWidth')
			.min(1).max(100).step(1);
		this.uiHandles.neckWidth.onChange(function(){
			shirt.update();
			onChange();
		});

		this.uiHandles.neckHeight = folder.add(this.parameters,'neckHeight')
			.min(1).max(100).step(1);
		this.uiHandles.neckHeight.onChange( function(){
			shirt.update();
			onChange();
		} );

		this.uiHandles.sleeveWidth = folder.add(this.parameters,'sleeveWidth')
			.min(1).max(100).step(1);
		this.uiHandles.sleeveWidth.onChange( function(){
			shirt.update();
			onChange();
		} );

		this.uiHandles.sleeveHeight = folder.add(this.parameters,'sleeveHeight')
			.min(1).max(100).step(1);
		this.uiHandles.sleeveHeight.onChange( function(){
			shirt.update();
			onChange();
		} );

		this.uiHandles.seamAllowance = folder.add(this.parameters,'seamAllowance')
			.min(-10).max(20).step(1);
		this.uiHandles.seamAllowance.onChange( function(){
			shirt.update();
			onChange();
		} );

		this.updateWidth();
		this.updateHeight();
	};

	return Shirt;
})();
