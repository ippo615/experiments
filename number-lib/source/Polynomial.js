var Polynomial = (function(){
	var Polynomial = function(values){
		this.values = values;
		return this;
	};
	Polynomial.prototype.copy = function(){
		var values = [];
		var i, l = this.values.length;
		for( i=0; i<l; i+=1 ){
			values.push( this.values[i].copy() );
		}
		return new Polynomial( values );
	};
	Polynomial.prototype.add = function(other){
		var a, al = this.values.length;
		var b, bl = other.values.length;
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
	Polynomial.prototype.sub = function(other){
		var a, al = this.values.length;
		var b, bl = other.values.length;
		var zero;
		// if this is shorter than the other: start with all of the values
		// in this then apped the extra from the other
		if( al < bl ){
			for( a=0; a<al; a+=1 ){
				this.values[a].sub(other.values[a]);
			}
			// we need to make a "zero" of the same type as the numbers so we 
			// can subtract the number from "zero" to negate it
			zero = other.values[0].copy();
			zero.sub(zero);
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

	Polynomial.prototype.mul = function(other){
		var a, al = this.values.length;
		var b, bl = other.values.length;
		var n, nl = al+bl;
		// We need to create a new polynomial to hold the results
		// and initialize every spot in it to the proper type zero
		var newPoly = [];
		var zero = this.values[0].copy().sub(this.values[0]);
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

	Polynomial.prototype.print = function(options){
		var options = options || {};

		var symbol = options.polySymbol || 'x';
		var isExplicit = options.polyExplicit || false;
		var parenStr = options.polyParen || '()';
		var lParen = parenStr.charAt(0);
		var rParen = parenStr.charAt(1) || '';
		var parts = [];

		var i, l = this.values.length;
		if( isExplicit ){
			for( i=0; i<l; i+=1 ){
				parts.push(lParen+this.values[i].print(options)+rParen+'*'+lParen+symbol+'^'+i+rParen);
			}
		}else{
			if( !this.values[0].isZero() ){
				parts.push(lParen+this.values[0].print(options)+rParen);
			}
			if( !this.values[1].isZero() ){
				parts.push(lParen+this.values[1].print(options)+rParen+'*'+symbol);
			}
			for( i=2; i<l; i+=1 ){
				if( !this.values[i].isZero() ){
					parts.push(lParen+this.values[i].print(options)+rParen+'*'+lParen+symbol+'^'+i+rParen);
				}
			}
		}

		return parts.join('+');
	};

	Polynomial.prototype.dif = function(){
		// product rule: d(f(x)g(x))/dx = fg'+gf'
		// f is the coefficient, g is x^n
		// f' = f.dif(), g' = (n)*x^(n-1) :note: i call them df and dg in code
		var term, j,i, l = this.values.length;
		var newPoly = [];
		// First pass compute the derivatives of all of the coefficients
		// This takes care of all the gf' terms
		// If all the coefficients are constants then these are 0's
		for( i=0; i<l; i+=1 ){
			newPoly.push( this.values[i].copy().dif() );
		}
		// Then compute the derivatives of all of the x^n
		// We start at 1 because the d(x^0=1)/dx = 0
		for( i=1; i<l; i+=1 ){
			// I need to find a way to make .mul(i) use the SysNumber type
			// without using the SysNumber function...
			// newPoly[i].add( this.values[i].copy.mul(i) );
			for( j=0; j<i; j+=1 ){
				newPoly[i-1].add( this.values[i] );
			}
		}
		this.values = newPoly;
		return this;
	};

	Polynomial.prototype.sca = function(other){
		// element-wise "scalar" multiplication
		var i, l = this.values.length;
		for( i=0; i<l; i+=1 ){
			this.values[i].mul( other );
		}
		return this;
	};


	Polynomial.prototype.isSame = function(other){
		var a, al = this.values.length;
		var b, bl = other.values.length;

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
	Polynomial.prototype.isEqual = Polynomial.prototype.isSame;

	Polynomial.prototype.isNot = function(other){
		return (! this.isSame(other));
	};
	Polynomial.prototype.isDiff = Polynomial.prototype.isNot;
	Polynomial.prototype.isNotEqual = Polynomial.prototype.isNot;

	Polynomial.prototype.eval = function(x){
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

	return Polynomial;
})();
