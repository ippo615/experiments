
var QuadTree = function(config){
	/**
	 * QuadTree class
	 */

	if( config.min && config.max ){

		this.min = {
			x: config.min.x,
			y: config.min.y
		};
		this.max = {
			x: config.max.x,
			y: config.max.y
		};

		this.x = (this.max.x + this.min.x)/2;
		this.y = (this.max.y + this.min.y)/2;

		this.xSize = this.max.x - this.min.x;
		this.ySize = this.max.y - this.min.y;

	}else{
		this.xSize = config.xSize || 160;
		this.ySize = config.ySize || 160;

		this.x = config.x || 0;
		this.y = config.y || 0;

		this.xHalf = this.xSize / 2;
		this.yHalf = this.ySize / 2;

		this.min = {
			x: this.x - this.xHalf,
			y: this.y - this.yHalf
		};
		this.max = {
			x: this.x + this.xHalf,
			y: this.y + this.yHalf
		};

	}

	this.maxPts = config.maxPts || 16;

	this.xHalf = this.xSize / 2;
	this.yHalf = this.ySize / 2;

	this.points = [];

	this.children = null;

};

QuadTree.prototype.subdivide = function(){
	this.children = [
		new QuadTree({
			min: {
				x: this.min.x,
				y: this.min.y
			},
			max: {
				x: this.x,
				y: this.y
			},
			maxPts: this.maxPts
		}),
		new QuadTree({
			min: {
				x: this.x,
				y: this.min.y
			},
			max: {
				x: this.max.x,
				y: this.y
			},
			maxPts: this.maxPts
		}),
		new QuadTree({
			min: {
				x: this.x,
				y: this.y
			},
			max: {
				x: this.max.x,
				y: this.max.y
			},
			maxPts: this.maxPts
		}),
		new QuadTree({
			min: {
				x: this.min.x,
				y: this.y
			},
			max: {
				x: this.x,
				y: this.max.y
			},
			maxPts: this.maxPts
		})
	];

	var i, x,y, nPts = this.points.length;
	for( i=0; i<nPts; i+=1 ){
		if( this.children[0].insert( this.points[i] ) ){ continue }
		if( this.children[1].insert( this.points[i] ) ){ continue }
		if( this.children[2].insert( this.points[i] ) ){ continue }
		if( this.children[3].insert( this.points[i] ) ){ continue }
	}

	this.points = [];

};

QuadTree.prototype.isInAabb = function( pt ){
	var isInX = (this.min.x <= pt.x && pt.x <= this.max.x);
	var isInY = (this.min.y <= pt.y && pt.y <= this.max.y);
	return isInX && isInY;
};

QuadTree.prototype.insert = function( pt ){

	// If the point is outside the AABB don't insert it
	if( ! this.isInAabb(pt) ){
		return false;
		//throw new Error( "pt {"+pt.x+","+pt.y+"} does not fit between {"+this.min.x+","+this.min.y+"} and {"+this.max.x+","+this.max.y+"}" );
	}

	// If there is space in this quad tree, add the object here
    if( this.children === null && this.points.length < this.maxPts ){
		this.points.push(pt);
		return true;
	}

	// Otherwise, if we haven't been subdivided subdivide 
	// and insert it into one of the children
	if( this.children === null ){
		this.subdivide();
	}
	if( this.children[0].insert( pt ) ){ return true; }
	if( this.children[1].insert( pt ) ){ return true; }
	if( this.children[2].insert( pt ) ){ return true; }
	if( this.children[3].insert( pt ) ){ return true; }

	// WTF?
	return false;
	//throw new Error( "pt {"+pt.x+","+pt.y+"} does not fit between {"+this.min.x+","+this.min.y+"} and {"+this.max.x+","+this.max.y+"}" );
};

function isInAabb( pt, aabb ){
	var isInX = (aabb.min.x <= pt.x && pt.x <= aabb.max.x);
	var isInY = (aabb.min.y <= pt.y && pt.y <= aabb.max.y);
	return isInX && isInY;
};

QuadTree.prototype.getPointsInAabb = function(aabb){
	var foundPoints = [];
	var i, nPts = this.points.length;
	if( this.children === null ){
		for( i=0; i<nPts; i+=1 ){
			if( isInAabb( this.points[i], aabb ) ){
				foundPoints.push( this.points[i] );
			}
		}
		return foundPoints;
	}

	// We have children, check them
	foundPoints.push.apply( foundPoints, this.children[0].getPointsInAabb(aabb) );
	foundPoints.push.apply( foundPoints, this.children[1].getPointsInAabb(aabb) );
	foundPoints.push.apply( foundPoints, this.children[2].getPointsInAabb(aabb) );
	foundPoints.push.apply( foundPoints, this.children[3].getPointsInAabb(aabb) );

	return foundPoints;
};

var world = new QuadTree({
	xSize: 100,
	ySize: 100,
	maxPts: 5
});

world.insert({x:-10,y:10});
world.insert({x:10,y:-10});
world.insert({x:20,y:20});
world.insert({x:-10,y:-10});
world.insert({x:10,y:10});
world.insert({x:12,y:30});

console.info( world );

// This point will not get inserted
world.insert({x:88,y:88});

console.info( world.getPointsInAabb( {
	min: {
		x:-20,
		y:-20
	},
	max: {
		x: 20,
		y: 20
	}
} ) );
