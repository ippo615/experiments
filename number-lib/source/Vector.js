var Vector = (function(){
	var ERROR_STRICT = 'strict';
	var ERROR_HIDE = 'hide';
	var errorStyle = ERROR_HIDE;

	var Vector = function(values){
		this.values = values;
		return this;
	};
	Vector.prototype.copy = function(){
		var values = [];
		var i, l = this.values.length;
		for( i=0; i<l; i+=1 ){
			values.push( this.values[i].copy() );
		}
		return new Vector( values );
	};
	Vector.prototype.add = function(other){
		var a, al = this.values.length;
		var b, bl = other.values.length;

		if( errorStyle === ERROR_STRICT ){
			if( al !== bl ){
				throw new Error('Trying to add vectors of different lengths ('+al+','+bl+'): '+this.print()+' + '+other.print());
			}
		}

		// if this is shorter than the other: start with all of the values
		// in this then append the extra from the other
		if( al < bl ){
			for( a=0; a<al; a+=1 ){
				this.values[a].add(other.values[a]);
			}
			for( b=al; b<bl; b+=1 ){
				this.values.push( other.values[b].copy() );
			}
		}
		// if this is longer (or same) then just add all the values in other
		else{
			for (b = 0; b < bl; b += 1) {
				this.values[b].add(other.values[b]);
			}
		}
		return this;
	};
	Vector.prototype.sub = function(other){
		var a, al = this.values.length;
		var b, bl = other.values.length;
		var zero;

		if( errorStyle === ERROR_STRICT ){
			if( al !== bl ){
				throw new Error('Trying to subtract vectors of different lengths ('+al+','+bl+'): '+this.print()+' - '+other.print());
			}
		}

		// if this is shorter than the other: start with all of the values
		// in this then apped the extra from the other
		if( al < bl ){
			for( a=0; a<al; a+=1 ){
				this.values[a].sub(other.values[a]);
			}
			zero = other.values[0].copy().zero();
			for( b=al; b<bl; b+=1 ){
				this.values.push( zero.copy().sub(other.values[b]) );
			}
		}
		// if this is longer (or same) then just add all the values in other
		else{
			for (b = 0; b < bl; b += 1) {
				this.values[b].sub(other.values[b]);
			}
		}
		return this;
	};

	Vector.prototype.mul = function(other){
		var a, al = this.values.length;
		var b, bl = other.values.length;
		var n, nl = al+bl;
		// We need to create a new Vector to hold the results
		// and initialize every spot in it to the proper type zero
		var newPoly = [];
		var zero = this.values[0].copy().zero();
		for( n=0; n<nl; n+=1 ){
			newPoly.push( zero.copy() );
		}
		// Do the actual multiplication
		for (a = 0; a < al; a += 1) {
			for (b = 0; b < bl; b += 1) {
				newPoly[a + b].add( this.values[a].copy().mul( other.values[b] ) );
			}
		}
		this.values = newPoly;
		return this;
	};

	Vector.prototype.print = function(options){
		var options = options || {};

		var seperator = options.vectorSeparator || ', ';
		var bracket = options.vectorBracket || '[]';
		var lBracket = bracket.charAt(0);
		var rBracket = bracket.charAt(1) || '';
		var parts = [];

		var i, l = this.values.length;
		for( i=0; i<l; i+=1 ){
			parts.push(this.values[i].print(options));
		}

		return lBracket + parts.join(seperator) + rBracket;
	};
	Vector.prototype.dif = function(){
		var i, l = this.values.length;
		for( i=0; i<l; i+=1 ){
			this.values[i].dif();
		}
		return this;
	};
	Vector.prototype.dot = function(other){
		// dot product (inner product)
		var a, al = this.values.length;
		var b, bl = other.values.length;
		var zero;

		if( errorStyle === ERROR_STRICT ){
			if( al !== bl ){
				throw new Error('Trying to subtract vectors of different lengths ('+al+','+bl+'): '+this.print()+' - '+other.print());
			}
		}

		// Perform the multiplication for the stuff that is in both
		// If `this` has more elements multiply the extras by 0's
		if( al > bl ){
			for( b=0; b<bl; b+=1 ){
				this.values[b].mul( other.values[b] );
			}
			for( a=bl; a<al; a+=1 ){
				this.values[a].mul( this.values[a].copy().zero() );
			}
		}else{
			for( a=0; a<al; a+=1 ){
				this.values[a].mul( other.values[a] );
			}
		}

		return this;
	};
	Vector.prototype.sca = function(other){
		// element-wise "scalar" multiplication
		var i, l = this.values.length;
		for( i=0; i<l; i+=1 ){
			this.values[i].mul( other );
		}
		return this;
	};

	Vector.prototype.isSame = function(other){
		var a, al = this.values.length;
		var b, bl = other.values.length;

		if( errorStyle === ERROR_STRICT ){
			if( al !== bl ){
				throw new Error('Trying to compare vectors of different lengths ('+al+','+bl+'): '+this.print()+' - '+other.print());
			}
		}

		// If this has more values check all the values that exist in both
		// then check that the 'extras' are all zero
		if( al > bl ){
			for( b=0; b<bl; b+=1 ){
				if( this.values[b].isNot( other.values[b] ) ){
					return false;
				}
			}
			for( a=bl; a<al; a+=1 ){
				if( ! this.values[a].isZero() ){
					return false;
				}
			}
		}else{
			for( a=0; a<al; a+=1 ){
				if( this.values[a].isNot( other.values[a] ) ){
					return false;
				}
			}
			for( b=al; b<bl; b+=1 ){
				if( ! other.values[b].isZero() ){
					return false;
				}
			}
		}

		return true;
	};
	Vector.prototype.isEqual = Vector.prototype.isSame;

	Vector.prototype.isNot = function(other){
		return (! this.isSame(other));
	};
	Vector.prototype.isDiff = Vector.prototype.isNot;
	Vector.prototype.isNotEqual = Vector.prototype.isNot;

	Vector.prototype.eval = function(x){
		// start the result at the '0th' part of our poly
		var result = this.values[0].copy();
		var j,i,l = this.values.length;
		var term;
		for( i=1; i<l; i+=1 ){
			// apply the exponent
			term = x.copy();
			for( j=1; j<i; j+=1 ){
				term.mul(x);
			}
			// finally multiply by the coefficent and add to the result
			term.mul(this.values[i]);
			result.add( term );
		}
		return result;
	};

	Vector.prototype.zero = function(){
		var zero = this.values[0].copy().zero();
		var i,l=this.values.length;
		for( i=0; i<l; i+=1 ){
			this.values[i] = zero.copy();
		}
		return this;
	};
	Vector.prototype.one = function(){
		var one = this.values[0].copy().one();
		this.zero();
		this.values[0] = one;
		return this;
	};

	return Vector;
})();
