function BinaryTree( data, key ){
	this.key = key;
	this.data = data;
	this.more = null;
	this.less = null;
}
BinaryTree.prototype.insert = function( data ){
	// TODO: handle the case where the inserts are out of order, ie
	// inserting [10,15,12]
	if( data[this.key] < this.data[this.key] ){
		if( this.less === null ){
			this.less = new BinaryTree( data, this.key );
		}else{
			this.less.insert( data );
		}
	}else{
		if( this.more === null ){
			this.more = new BinaryTree( data, this.key );
		}else{
			this.more.insert( data );
		}
	}
};
BinaryTree.prototype.find = function( value ){
	if( this.data[this.key] === value ){
		return this;
	}
	if( value < this.data[this.key] ){
		if( this.less === null ){
			return null;
		}
		return this.less.find( value );
	}else{
		if( this.more === null ){
			return null;
		}
		return this.more.find( value );
	}
};
BinaryTree.prototype.findAll = function( value ){
	var results = [];
	var last = this.find( value );
	while( last !== null ){
		results.push( last );
		//if( last.more !== null ){
		//	last = last.more.find( value );
		//}
		if( last.less !== null ){
			last = last.less.find( value );
		}
	}
	return results;
};
BinaryTree.prototype.nearLess = function( data ){
	if( data[this.key] < this.data[this.key] ){
		return this;
	}else{
		return this.right
	}
};

function Point( x,y ){
	this.x = x;
	this.y = y;
}

var points = [
	new Point( 0, 10 ),
	new Point( -3, -3 ),
	new Point( -4, 12 ),
	new Point( 7, 13 ),
	new Point( 2, 23 ),
	new Point( 19, 2 ),
	new Point( -5, 8 ),
	new Point( -3, -3 )
];

var xTree = new BinaryTree( points[0], 'x' );
for( var i=1,l=points.length; i<l; i+=1 ){
	xTree.insert( points[i] );
}

var yTree = new BinaryTree( points[0], 'y' );
for( var i=1,l=points.length; i<l; i+=1 ){
	yTree.insert( points[i] );
}

console.info( xTree );
console.info( yTree );

console.info( xTree.find(19) );
console.info( yTree.find(2) );
console.info( xTree.findAll(-3) );
