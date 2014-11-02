function Trigger( options ){

	if( options instanceof Trigger ){
		return options.copy();
	}

	options = options || {};
	if( ! (this instanceof Trigger ) ){
		return new Trigger( options );
	}

	this.text = options.text;
	this.args = options.args;
	this.action = options.action;
	this.delimeter = options.hasOwnProperty('delimeter')?options.delimeter:' ';
	this.description = options.hasOwnProperty('description')?options.description:'';
}

Trigger.prototype.copy = function( ){
	return new Trigger( {
		text: this.text,
		args: this.args,
		action: this.action,
		delimeter: this.delimeter,
		description: this.description
	} );
};
Trigger.prototype.toString = function(){
	return this.text + this.delimeter + this.args.join( this.delimeter );
};
Trigger.prototype.toHtml = function(){
	var html = '<b>'+this.text+'</b>';
	html += this.delimeter;
	html += this.args.join( this.delimeter );
	html += '<span class="description-hint"> -- '
	html += this.description;
	html += '</span>';
	return html;
};

Trigger.prototype.test = function( text ){
	// Check if the smaller one can be part of the larger one
	// This is useful for autocompletion, consider 'move all'
	// we want to match when the user has typed any of these:
	// m, mo, mov, ..., move al, move all
	// Additionally we want to match when the user has added
	// agruments like: `move all 10`
	if( text.length > this.text.length ){
		if( text.indexOf( this.text ) === 0 ){
			return true;
		}
	}else{
		if( this.text.indexOf( text ) === 0 ){
			return true;
		}
	}

	return false;
};

Trigger.prototype.exec = function( text ){
	if( this.test(text) ){
		// Get the arguments and remove leading/trailing junk
		var argPart = text.replace( this.text, '' );
		argPart = argPart.replace(new RegExp('^'+this.delimeter+'+'), '');
		argPart = argPart.replace(new RegExp(this.delimeter+'+$'), '');

		// Get the arguments
		// Note: `.split` always returns an array with a least 1
		// value so we make sure that arrays which have no useful
		// data have length 0.
		var args = argPart.split( this.delimeter );
		if( args[0] === '' ){
			args = [];
		}

		// call the action with the supplied arguments
		if( args.length === this.args.length ){
			return this.action.apply( null, args );
		}else{
			var expected = this.text+this.delimeter+this.args.join(this.delimeter);
			throw new Error( 'Expecting: `'+expected+'` but saw `'+text+'`' );
		}
	}
};

var vh = new Trigger({
	text: 'vh',
	args: [],
	action: function(){return 'vh';}
});

console.info( vh.test( 'vhicle' ) );
//console.info( vh.exec( 'vhicle' ) );
console.info( vh.exec( 'vh' ) );

var move_all = new Trigger({
	text: 'move all',
	args: ['x','y','z'],
	action: function(x,y,z){return x+y+z;}
});

console.info( move_all.test('m') );
console.info( move_all.test('move that') );
console.info( move_all.test('move all') );
console.info( move_all.exec('move all 1 2 3 ') );

//var mv = Trigger( move_all );
//console.info( mv );

function Dispatcher( options ){
	if( options instanceof Dispatcher ){
		return options.copy();
	}

	options = options || {};
	if( ! (this instanceof Dispatcher ) ){
		return new Dispatcher( options );
	}

	this.triggers = [];
	if( options.hasOwnProperty( 'triggers' ) ){
		var triggers = options.triggers;
		for( var i=0, l=triggers.length; i<l; i+=1 ){
			this.triggers.push( triggers[i] );
		}
	}

}
Dispatcher.prototype.push = function( trigger ){
	this.triggers.push( trigger );
	return this;
};
Dispatcher.prototype.find_matches = function( text ){
	var matches = [];
	for( var i=0,l=this.triggers.length; i<l; i+=1 ){
		if( this.triggers[i].test( text ) ){
			matches.push( this.triggers[i] );
		}
	}
	return matches;
};
Dispatcher.prototype.exec_matches = function( text ){
	var matches = this.find_matches( text );
	var results = [];
	for( var i=0, l=matches.length; i<l; i+=1 ){
		results.push( matches[i].exec( text ) );
	}
	return results;
}
Dispatcher.prototype.exec = function( text ){
	var matches = this.find_matches( text );
	if( matches.length === 1 ){
		console.info( matches[0] );
		return matches[0].exec( text );
	}
	throw new Error( 'Failed to match "'+text+'" ('+matches.length+')' );
};
Dispatcher.prototype.toHtml = function(){
	var html = '';
	for( var i=0,l=this.triggers.length; i<l; i+=1 ){
		html += '<option value="';
		html += this.triggers[i].text;
		html += '">';
		html += this.triggers[i].toHtml();
		html += '</option>\n';
	}
	return html;
};

var d = new Dispatcher();
d.push( new Trigger({
	text: 'vh',
	args: [],
	action: function(){return 'vh';}
}) ).push( new Trigger({
	text: 'move all',
	args: ['x','y','z'],
	action: function(x,y,z){return x+y+z;}
}) ).push( new Trigger({
	text: 'move by',
	args: ['x','y','z'],
	action: function(x,y,z){return x+y+z;}
}) ).push( new Trigger({
	text: 'move to',
	args: ['x','y','z'],
	action: function(x,y,z){return x+y+z;}
}) ).push( new Trigger({
	text: 'move x',
	args: ['x'],
	action: function(x){return x;}
}) ).push( new Trigger({
	text: 'move y',
	args: ['y'],
	action: function(y){return y;}
}) ).push( new Trigger({
	text: 'move z',
	args: ['z'],
	action: function(z){return z;}
}) );

console.info( d.find_matches('move y') );
console.info( d.exec('move all 1 2 3') );
