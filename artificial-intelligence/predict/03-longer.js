
function Predictor(){
	this.branches = {};
	this.nSamples = 0;
	this.options = {};
}
Predictor.prototype.trainSequence = function( sequence ){
	var a = sequence[0];
	var b = sequence.slice(1);
	if( ! this.branches.hasOwnProperty(a) ){
		this.branches[a] = new Predictor();
	}
	this.branches[a].addOption(b[0]);
	if( sequence.length > 1 ){
		this.branches[a].trainSequence(b);
	}else{
		this.branches[a].addOption( b[0] );
	}
};
Predictor.prototype.predictFirst = function( first ){
	if( this.branches.hasOwnProperty(first) ){
		return this.branches[first].getProbabilities();
	}
	return '';
};
Predictor.prototype.predict = function( sequence ){
	var first = sequence[0];
	if( ! this.branches.hasOwnProperty(first) ){
		return '';
	}
	if( sequence.length === 1 ){
		return this.branches[first].getProbabilities();
	}
	if( this.branches.hasOwnProperty(first) ){
		return this.branches[first].predict( sequence.slice(1) );
	}
};
Predictor.prototype.addOption = function( option ){
	if( ! this.options.hasOwnProperty( option ) ){
		this.options[option] = 0;
	}
	this.options[option] += 1;
	this.nSamples += 1;
};
Predictor.prototype.getProbabilities = function(){
	var probs = {};
	for( var opt in this.options ){
		if( this.options.hasOwnProperty( opt ) ){
			probs[ opt ] = this.options[opt]/this.nSamples;
		}
	}
	return probs;
};

var words = 'this is interesting how are you this is my name something is amiss hello world what is the meaning of life'.split(' ');
var p = new Predictor();
for( var i=0, l=words.length; i<l; i+=1 ){
	p.trainSequence( words[i].split('') );
}

console.info( '\na:' );
console.info( p.predict('a') );

console.info( '\nt:' );
console.info( p.predict('t') );

console.info( '\nhe:' );
console.info( p.predict('he') );

console.info( '\nth:' );
console.info( p.predict('th') );
