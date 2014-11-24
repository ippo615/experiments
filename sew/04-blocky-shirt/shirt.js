var Shirt = (function(){

	// TODO Let shirt accpet a list of parameters so you can specify
	// them programatically
	function Shirt(){
		this.parameters = {
			width: 30,
			height: 60,

			neckWidth: 10,
			neckHeight: 5,

			sleeveWidth: 3,
			sleeveHeight: 10
		};
		this.uiHandles = {};
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

	Shirt.prototype.uiDraw = function(ctx){
		var xMid = this.parameters.width*0.5;
		ctx.beginPath();
		ctx.moveTo(0,0);
		ctx.lineTo(this.parameters.width,0);
		ctx.lineTo(this.parameters.width,this.parameters.height-this.parameters.sleeveHeight);
		ctx.lineTo(xMid+this.parameters.neckWidth*0.5+this.parameters.sleeveWidth,this.parameters.height-this.parameters.sleeveHeight);
		ctx.lineTo(xMid+this.parameters.neckWidth*0.5+this.parameters.sleeveWidth,this.parameters.height);
		ctx.lineTo(xMid+this.parameters.neckWidth*0.5,this.parameters.height);
		ctx.lineTo(xMid+this.parameters.neckWidth*0.5,this.parameters.height-this.parameters.neckHeight);
		ctx.lineTo(xMid-this.parameters.neckWidth*0.5,this.parameters.height-this.parameters.neckHeight);
		ctx.lineTo(xMid-this.parameters.neckWidth*0.5,this.parameters.height);
		ctx.lineTo(xMid-this.parameters.neckWidth*0.5-this.parameters.sleeveWidth,this.parameters.height);
		ctx.lineTo(xMid-this.parameters.neckWidth*0.5-this.parameters.sleeveWidth,this.parameters.height-this.parameters.sleeveHeight);
		ctx.lineTo(0,this.parameters.height-this.parameters.sleeveHeight);
		ctx.lineTo(0,0);
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
				setTimeout(function(){onChange()},1);
			} );

		this.uiHandles.height = folder.add(this.parameters,'height')
			.min(1).max(100).step(1);
		this.uiHandles.height.onChange( function(value){
				shirt.updateHeight(value);
				onChange();
			} );

		this.uiHandles.neckWidth = folder.add(this.parameters,'neckWidth')
			.min(1).max(100).step(1);
		this.uiHandles.neckWidth.onChange( onChange );

		this.uiHandles.neckHeight = folder.add(this.parameters,'neckHeight')
			.min(1).max(100).step(1);
		this.uiHandles.neckHeight.onChange( onChange );

		this.uiHandles.sleeveWidth = folder.add(this.parameters,'sleeveWidth')
			.min(1).max(100).step(1);
		this.uiHandles.sleeveWidth.onChange( onChange );

		this.uiHandles.sleeveHeight = folder.add(this.parameters,'sleeveHeight')
			.min(1).max(100).step(1);
		this.uiHandles.sleeveHeight.onChange( onChange );

		this.updateWidth();
		this.updateHeight();
	};

	return Shirt;
})();
