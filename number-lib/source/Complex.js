var Complex = (function(){
	var Complex = function(real,imag){
		this.real = real;
		this.imag = imag;
		return this;
	};
	Complex.prototype.copy = function(){
		return new Complex( this.real.copy(), this.imag.copy() );
	};
	Complex.prototype.add = function(other){
		this.real.add( other.real );
		this.imag.add( other.imag );
		return this;
	};
	Complex.prototype.sub = function(other){
		this.real.sub( other.real );
		this.imag.sub( other.imag );
		return this;
	};
	Complex.prototype.mul = function(other){
		// we need to work on copies
		// real: c1.real*c2.real - c1.imag*c2.imag,
		// imag: c1.real*c2.imag + c2.real*c1.imag
		var aReal = this.real.copy();
		var aImag = this.imag.copy();
		aImag.mul(other.imag);
		aReal.mul(other.real).sub( aImag );
		var bReal = this.real.copy();
		var bImag = this.imag.copy();
		bReal.mul(other.imag);
		bImag.mul(other.real).add(bReal);
		this.real = aReal;
		this.imag = bImag;
		return this;
	};
	Complex.prototype.div = function(other){
		// we need to work on copies
		// var denom = c2.real*c2.real + c2.imag*c2.imag;
		// real: ( c1.real*c2.real + c1.imag*c2.imag)/denom
		// imag: (-c1.real*c2.imag + c2.real*c1.imag)/denom
		var dReal = other.real.copy();
		var dImag = other.imag.copy();
		var denom = dReal.mul(dReal).add(dImag.mul(dImag));
		var nReal = this.real.copy();
		nReal.mul( other.real ).add( this.imag.copy().mul(other.imag) );
		var nImag = this.imag.copy();
		nImag.mul( other.real ).sub( this.real.copy().mul(other.imag) );
		this.real = nReal.div( denom );
		this.imag = nImag.div( denom );
		return this;
	};
	Complex.prototype.print = function(options){
		options = options || {};
		var j = options.imaginarySymbol || 'j';
		var print = 'failed to print';
		if( this.imag.isPos() ){
			print = this.real.print() + '+'+j+ this.imag.print();
		}else if( this.imag.isNeg() ){
			this.imag.pos();
			print = this.real.print() + '-'+j+ this.imag.print();
			this.imag.neg();
		}else{
			print = this.real.print();
		}
		return print;
	};

	Complex.prototype.dif = function(){
		this.real.dif();
		this.imag.dif();
	};
	Complex.prototype.sca = function(other){
		this.real.mul( other );
		this.imag.mul( other );
		return this;
	};

	Complex.prototype.isZero = function(other){
		return this.real.isZero() && this.imag.isZero();
	};

	Complex.prototype.isSame = function(other){
		return this.real.isSame(other.real) && this.imag.isSame(other.imag);
	};
	Complex.prototype.isEqual = Complex.prototype.isSame;

	Complex.prototype.isNot = function(other){
		return this.real.isNot(other.real) || this.imag.isNot(other.imag);
	};
	Complex.prototype.isDiff = Complex.prototype.isNot;
	Complex.prototype.isNotEqual = Complex.prototype.isNot;

	return Complex;
})();
