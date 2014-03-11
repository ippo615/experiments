var Matrix = (function(){
	var ERROR_STRICT = 'strict';
	var ERROR_HIDE = 'hide';
	var errorStyle = ERROR_HIDE;

	var Matrix = function(values){
		this.values = values;
		return this;
	};
	Matrix.prototype.copy = function(){
		var newValues = [];
		var newRow, rowValues;
		var i, nRows = this.values.length;
		var j, nCols = this.values[0].length;
		for( i=0; i<nRows; i+=1 ){
			rowValue = this.values[i];
			newRow = [];
			for( j=0; j<nCols; j+=1 ){
				newRow.push( rowValue[j].copy() );
			}		
			newValues.push( newRow );
		}
		return new Matrix( newValues );
	};

	Matrix.prototype.resize = function(options){
		var nRows = options.nRows || this.values.length;
		var nCols = options.nCols || this.values[0].length;
		var fill = options.fill || this.values[0][0].copy().zero();

		// Create a nRows by nCols matrix of fill
		var values = [];
		var row, r,c;
		for( r=0; r<nRows; r+=1 ){
			row = [];
			for( c=0; c<nCols; c+=1 ){
				row.push( fill.copy() );
			}
			values.push( row );
		}

		// Copy the old data over the fill
		var nCopyRows = Math.min( this.values.length, nRows );
		var nCopyCols = Math.min( this.values[0].length, nCols );
		for( r=0; r<nCopyRows; r+=1 ){
			for( c=0; c<nCopyCols; c+=1 ){
				values[r][c] = this.values[r][c];
			}
		}
		this.values = values;

		return this;
	};

	Matrix.prototype.add = function(other){
		var nRowsA = this.values.length, nColsA = this.values[0].length;
		var nRowsB = other.values.length, nColsB = other.values[0].length;

		if( errorStyle === ERROR_STRICT ){
			if( nRowsA !== nRowsB ){
				throw new Error('Trying to add matrices with different number of rows ('+nRowsA+','+nRowsB+')');
			}
			if( nColsA !== nColsB ){
				throw new Error('Trying to add matrices with different number of cols ('+nColsA+','+nColsB+')');
			}
		}

		// Make sure they are the same size
		var nRowsNew = (nRowsA > nRowsB)? nRowsA : nRowsB;
		var nColsNew = (nColsA > nColsB)? nColsA : nColsB;
		var copy = other.copy().resize({
			nRows: nRowsNew,
			nCols: nColsNew
		});
		this.resize({
			nRows: nRowsNew,
			nCols: nColsNew
		});
		
		// Do the actual addition
		var r,c;
		var aRow, bRow;
		for( r=0; r<nRowsNew; r+=1 ){
			aRow = this.values[r];
			bRow = copy.values[r];
			for( c=0; c<nColsNew; c+=1 ){
				aRow[c].add( bRow[c] );
			}
		}

		return this;
	};
	Matrix.prototype.sub = function(other){
		var nRowsA = this.values.length, nColsA = this.values[0].length;
		var nRowsB = other.values.length, nColsB = other.values[0].length;

		if( errorStyle === ERROR_STRICT ){
			if( nRowsA !== nRowsB ){
				throw new Error('Trying to subtract matrices with different number of rows ('+nRowsA+','+nRowsB+')');
			}
			if( nColsA !== nColsB ){
				throw new Error('Trying to subtract matrices with different number of cols ('+nColsA+','+nColsB+')');
			}
		}

		// Make sure they are the same size
		var nRowsNew = (nRowsA > nRowsB)? nRowsA : nRowsB;
		var nColsNew = (nColsA > nColsB)? nColsA : nColsB;
		var copy = other.copy().resize({
			nRows: nRowsNew,
			nCols: nColsNew
		});
		this.resize({
			nRows: nRowsNew,
			nCols: nColsNew
		});
		
		// Do the actual addition
		var r,c;
		var aRow, bRow;
		for( r=0; r<nRowsNew; r+=1 ){
			aRow = this.values[r];
			bRow = copy.values[r];
			for( c=0; c<nColsNew; c+=1 ){
				aRow[c].sub( bRow[c] );
			}
		}

		return this;
	};

	Matrix.prototype.print = function(options){
		var options = options || {};

		var elementSeparator = options.matrixElementSeparator || ',';
		var rowSep = options.matrixRowSeparator || '\n ';

		var bracket = options.matrixBracket || '[]';
		var lBracket = bracket.charAt(0);
		var rBracket = bracket.charAt(1) || '';
		var parts = [];

		var rowValue, rowString;
		var matrixStr = [];
		var i, nRows = this.values.length;
		var j, nCols = this.values[0].length;
		for( i=0; i<nRows; i+=1 ){
			rowValue = this.values[i];
			rowString = [];
			for( j=0; j<nCols; j+=1 ){
				rowString.push( rowValue[j].print() );
			}		
			matrixStr.push( lBracket+ rowString.join(elementSeparator) +rBracket );
		}

		return lBracket + matrixStr.join(rowSep) + rBracket;
	};
	Matrix.prototype.dif = function(){
		var i, l = this.values.length;
		for( i=0; i<l; i+=1 ){
			this.values[i].dif();
		}
		return this;
	};
	Matrix.prototype.dot = function(other){
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
				this.values[a].mul( this.values[a].copy().sub(this.values[a]) );
			}
		}else{
			for( a=0; a<al; a+=1 ){
				this.values[a].mul( other.values[a] );
			}
		}

		return this;
	};
	Matrix.prototype.sca = function(other){
		// element-wise "scalar" multiplication
		var i, l = this.values.length;
		for( i=0; i<l; i+=1 ){
			this.values[i].mul( other );
		}
		return this;
	};

	Matrix.prototype.isSame = function(other){

		var nRowsA = this.values.length, nColsA = this.values[0].length;
		var nRowsB = other.values.length, nColsB = other.values[0].length;

		if( errorStyle === ERROR_STRICT ){
			if( nRowsA !== nRowsB ){
				throw new Error('Trying to compare matrices with different number of rows ('+nRowsA+','+nRowsB+')');
			}
			if( nColsA !== nColsB ){
				throw new Error('Trying to compare matrices with different number of cols ('+nColsA+','+nColsB+')');
			}
		}else{
			if( nRowsA !== nRowsB ){
				return false;
			}
			if( nColsA !== nColsB ){
				return false
			}
		}

		var r,c;
		var aRow, bRow;
		for( r=0; r<nRowsA; r+=1 ){
			aRow = this.values[r];
			bRow = other.values[r];
			for( c=0; c<nRowsB; c+=1 ){
				if( aRow[c].isNot(bRow[c]) ){
					return false;
				}
			}
		}
		return true;
	};

	Matrix.prototype.isEqual = Matrix.prototype.isSame;

	Matrix.prototype.isNot = function(other){
		return (! this.isSame(other));
	};
	Matrix.prototype.isDiff = Matrix.prototype.isNot;
	Matrix.prototype.isNotEqual = Matrix.prototype.isNot;

	Matrix.prototype.eval = function(x){
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

	Matrix.prototype.zero = function(){
		var nRows = this.values.length;
		var nCols = this.values[0].length;
		var r,c, row;
		for( r=0; r<nRows; r+=1 ){
			row = this.values[r];
			for( c=0; c<nCols; c+=1 ){
				row[c].zero();
			}
		}
		return this;
	};
	Matrix.prototype.identity = function(){
		var nRows = this.values.length;
		var nCols = this.values[0].length;
		var r,c, row;
		for( r=0; r<nRows; r+=1 ){
			row = this.values[r];
			for( c=0; c<nCols; c+=1 ){
				if( r === c ){
					row[c].one();
				}else{
					row[c].zero();
				}
			}
		}
		return this;
	};
	Matrix.prototype.one = Matrix.prototype.identity;

	Matrix.prototype.transpose = function(){

		var nRows = this.values.length;
		var nCols = this.values[0].length;
		var copy = this.copy().resize({
			nRows: nCols,
			nCols: nRows
		});

		var r,c;
		for( r=0; r<nRows; r+=1 ){
			for( c=0; c<nCols; c+=1 ){
				copy.values[c][r] = this.values[r][c];
			}
		}
		this.values = copy.values;

		return this;
	};

	return Matrix;
})();
