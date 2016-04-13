function KdTree( value, nDimensions, dimension ){
	this.nDimensions = nDimensions;
	this.dimension = dimension;
	if( this.dimensions > this.nDimensions ){
		this.dimension = 0;
	}
	this.value = value;
	this.less = null;
	this.more = null;
}
KdTree.prototype.insert = function( value ){
	if( value[this.dimension] < this.value[this.dimension] ){
		if( this.less === null ){
			this.less = new KdTree( value, this.nDimensions, this.dimension+1 );
		}else{
			this.less.insert( value );
		}
	}else{
		if( this.more === null ){
			this.more = new KdTree( value, this.nDimensions, this.dimension+1 );
		}else{
			this.more.insert( value );
		}
	}
};
KdTree.prototype.search = function( value ){
};

var tree = new KdTree( [0,0,0], 3, 0 );
tree.insert( [0,1,2] );
tree.insert( [0,-1,-2] );
tree.insert( [0,3,5] );
tree.insert( [0,2,7] );
tree.insert( [5,3,-1] );

console.info( tree );
