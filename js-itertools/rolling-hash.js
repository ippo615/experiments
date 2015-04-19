
var RollingHashBad = (function(){
	
	// This is not the best implementation because the shifting and 
	// extending functions can be computed faster than this.
	
	function RollingHash( options ){
		this.sequence = options.hasOwnProperty('sequence') ? this._convertSequence( options.sequence ) : [];
		this.modulus = 65539 || options.modulus;
		this.multiplier = 65539 || options.multiplier;
		this.position = options.hasOwnProperty('position') ? options.position : 0;
		this.length = options.hasOwnProperty('length') ? options.length : 1;
		this.hash = this.computeHash();
	}
	RollingHash.prototype._convertSequence = function(sequence){
		var newSequence = [];
		if (typeof sequence == 'string' || sequence instanceof String){
			for( var i=0, l=sequence.length; i<l; i+=1 ){
				newSequence.push( sequence.charCodeAt(i) );
			}
		}else{
			for( var i=0, l=sequence.length; i<l; i+=1 ){
				newSequence.push( sequence[i] );
			}
		}
		return newSequence;
	};
	RollingHash.prototype.computeHash = function(){
		var hash = 0;
		for( var i=0, l=this.length; i<l; i+=1 ){
			var delta = (this.sequence[ this.position + i ] * Math.pow(this.multiplier,i));
			hash += (this.sequence[ this.position + i ] * Math.pow(this.multiplier,i)) ;
		}
		return hash;
	};
	
	RollingHash.prototype.shift = function( amount ){
		this.position += amount;
		
		// If we've gone past the left edge, shrink the length
		if( this.position < 0 ){
			this.length += this.position;
			this.position = 0;
		}
		
		// If we've gone past the right edge, shrink the length
		if( this.position+this.length > this.sequence.length ){
			this.length = this.sequence.length - this.position;
		}
		
		// If the position is past the right edge, you're fucked
		if( this.postion > this.sequence.length ){
			this.position = this.sequence.length;
			this.length = 0;
		}
		
		// Make sure the length is not messed up
		if( this.length < 0 ){
			this.length = 0;
		}
		
		this.hash = this.computeHash();
	};
	
	RollingHash.prototype.extend = function( amount ){
		this.length += amount;
		
		if( this.length < 0 ){
			this.length = 0;
		}
		
		if( this.length + this.position >= this.sequence.length ){
			this.length = this.sequence.length - this.position;
		}
		
		this.hash = this.computeHash();
	};
	
	
	return RollingHash;
})();

var RollingHash = (function(){
	
	// This is not the best implementation because the shifting and 
	// extending functions can be computed faster than this.
	
	function RollingHash( options ){
		this.sequence = options.hasOwnProperty('sequence') ? this._convertSequence( options.sequence ) : [];
		this.modulus = 65539 || options.modulus;
		this.multiplier = 65539 || options.multiplier;
		this.position = options.hasOwnProperty('position') ? options.position : 0;
		this.length = options.hasOwnProperty('length') ? options.length : 1;
		this.hash = this.computeHash();
	}
	RollingHash.prototype._convertSequence = function(sequence){
		var newSequence = [];
		if (typeof sequence == 'string' || sequence instanceof String){
			for( var i=0, l=sequence.length; i<l; i+=1 ){
				newSequence.push( sequence.charCodeAt(i) );
			}
		}else{
			for( var i=0, l=sequence.length; i<l; i+=1 ){
				newSequence.push( sequence[i] );
			}
		}
		return newSequence;
	};
	RollingHash.prototype.computeHash = function(){
		var hash = 0;
		for( var i=0, l=this.length; i<l; i+=1 ){
			hash += (this.sequence[ this.position + i ] * Math.pow(this.multiplier,i));
		}
		return hash;
	};
	RollingHash.prototype._shiftLeft = function(){
		this.hash -= (this.sequence[ this.position+this.length-1 ] * Math.pow(this.multiplier,this.length-1));
		this.hash *= this.multiplier;
		this.position -= 1;
		if( this.position < 0 ){
			this.position = 0;
			this.length -= 1;
			if( this.length < 0 ){
				this.length = 0;
			}
		}
		this.hash += (this.sequence[ this.position ] * Math.pow(this.multiplier,0));
	};
	RollingHash.prototype._shiftRight = function(){
		this.hash -= (this.sequence[ this.position ] * Math.pow(this.multiplier,0));
		this.hash /= this.multiplier;
		this.position += 1;
		
		if( this.position + this.length > this.sequence.length ){
			this.length -= 1;
			if( this.length < 0 ){
				this.length = 0;
			}
		}
		if( this.position > this.sequence.length ){
			this.position = this.sequence.length;
		}
		this.hash += (this.sequence[ this.position+this.length-1 ] * Math.pow(this.multiplier,this.length-1));
	};
	RollingHash.prototype.shift = function( amount ){
		if( amount > 0 ){
			for( var i=0; i<amount; i+=1 ){
				this._shiftRight();
			}
		}
		if( amount < 0 ){
			for( var i=0; i>amount; i-=1 ){
				this._leftShift();
			}
		}
		
	};
	RollingHash.prototype._extendRight = function(){
		this.length += 1;
		if( this.length + this.position >= this.sequence.length ){
			this._shiftRight();
		}else{
			this.hash += (this.sequence[ this.position+this.length-1 ] * Math.pow(this.multiplier,this.length-1));
		}
	};
	RollingHash.prototype.extend = function( amount ){
		if( amount > 0 ){
			for( var i=0; i<amount; i+=1 ){
				this._extendRight();
			}
		}
		
		/*
		if( this.length < 0 ){
			this.length = 0;
		}
		
		this.hash = this.computeHash();
		*/
	};
	
	
	return RollingHash;
})();

var a = new RollingHash( {
	sequence: 'hello hello hello hello world',//[1,1,1,1,1,1,1,1,1,1,1,1],
	multiplier: 3,
	position: 0,
	length: 9
} );

for( var i=0; i<10; i+=1 ){
	a.shift(1);
	//console.info( a );
	console.info( a.hash );
}

function findSubsequenceRepitions( sequence ){
	var aHash = new RollingHash( {
		sequence: sequence,
		multiplier: 3,
		position: 0
	} );
	var bHash = new RollingHash( {
		sequence: sequence,
		multiplier: 3,
		position: 1
	} );
	
	var matches = [];
	for( var i=0, l=sequence.length; i<l; i+=1 ){
		if( aHash.hash === bHash.hash ){
			matches.push( {
				hash: aHash.hash,
				length: aHash.length,
				positions: [
					aHash.position,
					bHash.position
				],
				data: sequence.slice( aHash.position, aHash.position+aHash.length )
			} );
		}
		aHash.extend( 1 );
		bHash.extend( 1 );
		bHash.shift( 1 );
	}
	
	return matches;
}

function findLongestPeriod( sequence ){
	var matches = findSubsequenceRepitions( sequence );
	if( matches === [] ){
		return null;
	}
	
	var longest = matches[0], maxLength = matches[0].length;
	for( var i=1, l=matches.length; i<l; i+=1 ){
		if( matches[i].length > maxLength ){
			longest = matches[i];
			maxLength = matches[i].length;
		}
	}
	
	return longest;
}

function findShortestPeriod( sequence ){
	var matches = findSubsequenceRepitions( sequence );
	if( matches === [] ){
		return null;
	}
	
	var shortest = matches[0], minLength = matches[0].length;
	for( var i=1, l=matches.length; i<l; i+=1 ){
		if( matches[i].length < minLength ){
			shortest = matches[i];
			minLength = matches[i].length;
		}
	}
	
	return shortest;
}

console.info( "Longest: '"+findLongestPeriod( 'hello hello hello hello hello hello ' ).data+"'" );
console.info( "Shortest: '"+findShortestPeriod( 'hello hello hello hello hello hello ' ).data+"'" );

var base = [1,2,3,4,5];
var areYouCrazy = [0,0,0,0,0,1,2,4,5,1,2,5,4,3,2];
for( var i=0; i<1000; i+=1 ){
	areYouCrazy.push.apply( areYouCrazy, base );
}

var start = (new Date()).getTime();
console.info( "Longest Length: '"+findLongestPeriod( areYouCrazy ).data.length+"'" );
var end = (new Date()).getTime();
console.info( 'Duration: '+ (end - start) +'ms');

// note this does not work when there are prefixes in the data or when
// there is stuff in the middle: '1234567890123';
