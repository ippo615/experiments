function Parameter( config ){
	this.name = config.name;
	this.default = config.default;
	this.value = config.default;
	this.description = config.description;
	this.prompt = '';// a question ie (Please enter x). Auto generate?
}
Parameter.prototype.isValid = function( value ){
	return true;
};

Parameter.prototype.uiBindToInput = function( domNode ){
	var that = this;
	domNode.addEventListener( 'change', function(e){
		var newVal = e.target.value;
		if( that.isValid( newVal ) ){
			that.value = newVal;
		}else{
			// alert error
			e.target.value = that.value;
		}
		console.info( that.value );
	});
};
Parameter.prototype.uiMakeDomNode = function(){
	var parent = document.createElement('div');
	var label = document.createElement('label');
	label.id = 'label-'+this.name;
	label.innerHTML = this.name+': ';
	var input = document.createElement('input');
	input.id = 'input-'+this.name;
	parent.appendChild( label );
	parent.appendChild( input );
	this.uiBindToInput( input );
	return parent;
};
Parameter.prototype.uiDraw = function(ctx){
	// draw it (on a canvas)
};
