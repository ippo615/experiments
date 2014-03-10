var SysNumber = (function(){
	var SysNumber = function(value){
		this.value = value;
	};
	SysNumber.prototype.getSysNumber = function(){
		return this.value;
	};
	SysNumber.prototype.copy = function(){
		return new SysNumber( this.value );
	};
	SysNumber.prototype.add = function(other){
		this.value += other.getSysNumber();
		return this;
	};
	SysNumber.prototype.sub = function(other){
		this.value -= other.getSysNumber();
		return this;
	};
	SysNumber.prototype.mul = function(other){
		this.value *= other.getSysNumber();
		return this;
	};
	SysNumber.prototype.div = function(other){
		this.value /= other.getSysNumber();
		return this;
	};
	SysNumber.prototype.pow = function(other){
		this.value = Math.pow(this.value,other.getSysNumber());
		return this;
	};
	SysNumber.prototype.abs = function(){
		if( this.value < 0 ){
			this.value = -this.value;
		}
		return this;
	};
	SysNumber.prototype.dif = function(){
		// differentiation 
		this.value = 0;
		return this;
	};
	SysNumber.prototype.sca = function(other){
		// element-wise "scalar" multiplication
		this.value.mul( other );
		return this;
	};
	SysNumber.prototype.pos = SysNumber.prototype.abs;
	SysNumber.prototype.neg = function(){
		if( this.value > 0 ){
			this.value = -this.value;
		}
		return this;
	};
	SysNumber.prototype.isZero = function(){
		return (this.value === 0);
	};
	SysNumber.prototype.isPos = function(){
		return (this.value > 0);
	};
	SysNumber.prototype.isNeg = function(){
		return (this.value < 0);
	};


	SysNumber.prototype.isSame = function(other){
		return this.value === other.getSysNumber();
	};
	SysNumber.prototype.isEqual = SysNumber.prototype.isSame;

	SysNumber.prototype.isDiff = function(other){
		return this.value !== other.getSysNumber();
	};
	SysNumber.prototype.isNot = SysNumber.prototype.isDiff;
	SysNumber.prototype.isNotEqual = SysNumber.prototype.isDiff;

	SysNumber.prototype.isMore = function(other){
		return this.value > other.getSysNumber();
	};
	SysNumber.prototype.isMoreThan = SysNumber.prototype.isMore;
	SysNumber.prototype.isMT = SysNumber.prototype.isMore;
	SysNumber.prototype.isGreater = SysNumber.prototype.isMore;
	SysNumber.prototype.isGreaterThan = SysNumber.prototype.isMore;
	SysNumber.prototype.isGT = SysNumber.prototype.isMore;

	SysNumber.prototype.isLess = function(other){
		return this.value < other.getSysNumber();
	};
	SysNumber.prototype.isLessThan = SysNumber.prototype.isLess;
	SysNumber.prototype.isLT = SysNumber.prototype.isLess;

	SysNumber.prototype.isMoreOrEqual = function(other){
		return this.value >= other.getSysNumber();
	};
	SysNumber.prototype.isME = SysNumber.prototype.isMoreOrEqual;
	SysNumber.prototype.isGE = SysNumber.prototype.isMoreOrEqual;

	SysNumber.prototype.isLessOrEqual = function(other){
		return this.value <= other.getSysNumber();
	};
	SysNumber.prototype.isLE = SysNumber.prototype.isLessOrEqual;

	SysNumber.prototype.print = function(){
		return ''+this.value+'';
	};

	return SysNumber;
})();
