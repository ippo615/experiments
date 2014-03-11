var Symbol = (function(){
	var Symbol = function( symbol, operations ){
		this.symbol = symbol;
		this.operations = operations || [];
	};
	Symbol.prototype.copy = function(){
		// the operations array will look like: [ [operator, arg], [operator, arg] ]
		// for example: [
		//   [ 'add', SysNumber(2) ],
		//   [ 'sub', SysNumber(0) ]
		// ]
		var operation, operations = [];
		var i, l = this.operations.length;
		for( i=0; i<l; i+=1 ){
			operations.push( [ this.operations[i][0], this.operations[i][1].copy() ] );
		}
		return new Symbol( this.symbol, operations );
	};
	Symbol.prototype.add = function(other){
		this.operations.push( [ 'add', other.copy() ] );
		return this;
	};
	Symbol.prototype.sub = function(other){
		this.operations.push( [ 'sub', other.copy() ] );
		return this;
	};
	Symbol.prototype.mul = function(other){
		this.operations.push( [ 'mul', other.copy() ] );
		return this;
	};
	Symbol.prototype.div = function(other){
		this.operations.push( [ 'div', other.copy() ] );
		return this;
	};

	Symbol.prototype.dif = function(sym){
		var op, i, l = this.operations.length;
		for( i=0; i<l; i+=1 ){
			op = this.operations[i];
			if( op[0] === 'add' ){
				op[1].dif(sym);
			}
			if( op[0] === 'sub' ){
				op[1].dif(sym);
			}
			if( op[0] === 'mul' ){
				// 1*d2 + 2*d1
				// 1 = ?
				// d2 = op[1].dif()
				// 2 = op[1].copy()
				// d1 = ?
			}
		}
		return this;
	};

	var operators = {
		'add': '+',
		'sub': '-',
		'mul': '*',
		'div': '/'
	};

	Symbol.prototype.print = function(options){
		var options = options || {};
		var i, l=this.operations.length;
		var op, opName, opArg;
		var symbol = options.symbolSymbol || this.symbol;
		var lParen = '(';
		var rParen = ')';
		var str = symbol;
		for( i=0; i<l; i+=1 ){
			op = this.operations[i];
			opName = op[0];
			opArg = op[1];
			str = lParen + str + operators[opName] + opArg.print() + rParen;
		}
		return str;
	};

	Symbol.prototype.isSame = function(other){
		var a, al = this.operations.length;
		var b, bl = other.operations.length;
		if( al !== bl ){ return false; }
		for( a=0; a<al; a+=1 ){
			if( this.operations[a][0] !== other.operations[a][0]
			||  this.operations[a][1].isNot( other.operations[a][1] ) ){
				return false;
			}
		}
		return true;
	};
	Symbol.prototype.isNot = function(other){
		return !this.isSame(other);
	};
	Symbol.prototype.isDiff = Symbol.prototype.isNot;

	Symbol.prototype.eval = function(values){
		var values = values || {};
		var value = values[this.symbol].copy();
		var i, l = this.operations.length;
		var op, arg;
		for( i=0; i<l; i+=1 ){
			op = this.operations[i][0];
			arg = this.operations[i][1];
			if( arg.constructor === Symbol ){
				arg = arg.eval( values );
			}
			value[op]( arg );
		}
		return value;
	};

	Symbol.prototype.zero = function(){
		this.operations = [];
		this.symbol = "0";
		return this;
	};
	Symbol.prototype.one = function(){
		this.operations = [];
		this.symbol = "1";
		return this;
	};

	return Symbol;
})();
