
function Predictor(){
	this.branches = {};
	this.nSamples = 0;
	this.options = {};
}
Predictor.prototype.trainSequence = function( sequence ){
	var a = sequence[0];
	var b = sequence.slice(1);
	this.addOption( a );
	if( ! this.branches.hasOwnProperty(a) ){
		this.branches[a] = new Predictor();
	}
	if( sequence.length > 1 ){
		this.branches[a].trainSequence(b);
	}else{
		this.branches[a].addOption( b[0] );
	}
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
Predictor.prototype.printTree = function( indent, sequence ){
	var result = '';
	for( var key in this.branches ){
		if( this.branches.hasOwnProperty(key) ){
			if( this.options.hasOwnProperty(key) ){
				result += indent+key+': ('+this.options[key]+')\n';
			}else{
				result += indent+key+':\n';
			}
			result += this.branches[key].printTree( '  '+indent, sequence+key );
		}
	}
	return result;
};
Predictor.prototype.getProbabilityFor = function( sequence, value ){
	var first = sequence[0];
	if( this.branches.hasOwnProperty(first) ){
		if( this.options.hasOwnProperty(first) ){
			var part = (this.options[first] / this.nSamples) * value;
			if( sequence.length === 1 ){
				return part;
			}else{
				return this.branches[first].getProbabilityFor(sequence.slice(1),part);
			}
		}
	}
	return 0;
};
Predictor.prototype.getAllSequences = function( base ){
	var results = [];
	var hasOne = false;
	for( var key in this.branches ){
		if( this.branches.hasOwnProperty(key) ){
			var newBase = base + key;
			var subs = this.branches[key].getAllSequences( newBase );
			for( var i=0, l=subs.length; i<l; i+=1 ){
				results.push( subs[i] );
			}
			hasOne = true;
		}
	}
	if( hasOne ){
		return results;
	}
	return [base];
};
Predictor.prototype.getFlattenedProbabilities = function(){
	var allSequences = this.getAllSequences('');
	var probabilities = {};
	for( var i=0, l=allSequences.length; i<l; i+=1 ){
		var sequence = allSequences[i];
		probabilities[ sequence ] = this.getProbabilityFor( sequence, 1 );
	}
	return probabilities;
};
Predictor.prototype.analyze = function( sequences ){
	var results = [];
	for( var i=0, l=sequences.length; i<l; i+=1 ){
		results.push( this.getProbabilityFor( sequences[i], 1.0 ) );
	}
	return results;
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

console.info( p );
console.info( p.printTree('','') );

console.info( 'p("hello"): '+p.getProbabilityFor('hello',1.0) );
console.info( 'p("goodbye"): '+p.getProbabilityFor('goodbye',1.0) );
console.info( 'p("is"): '+p.getProbabilityFor('is',1.0) );

console.info( '\n'+p.getAllSequences('').join('\n') );
console.info( p.getFlattenedProbabilities() );

console.info( '' );
var testInput = 'this is a test message how are you'.split(' ');
var results = p.analyze(testInput);
for( var i=0, l=testInput.length; i<l; i+=1 ){
	console.info( testInput[i]+': '+results[i] );
}
