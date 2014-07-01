
function convexHull( points ){
	// This is an implementation of Andrew's Monotone Chain.

	// We only want to work with unique points and we want them to be sorted
	// These functions help with sorting and filtering
	var byIncreasingXY = function(a,b){
		if( a.x === b.x ){
			return a.y - b.y;
		}else{
			return a.x - b.x;
		}
	};
	var toUniqueOnly = function( element, index, array ){
		return index === array.indexOf(element);
	};

	var uniquePts = points.sort(byIncreasingXY).filter(toUniqueOnly);
	var nPts = uniquePts.length;

	// We cannot make a hull of 1 point
	if( nPts <= 1 ){
		return uniquePts;
	}

	// We need to know how a triangle formed by O, A, B is oriented.
	// To do that we compute the z component of the cross product between the
	// vectors (from O to A) and (from O to B). The result is positive when
	// OAB is counter-clockwise, negative when clockwise and 0 when colinear.
	function crossProd( o, a, b ){
		return (a.x-o.x)*(b.y-o.y) - (a.y-o.y)*(b.x-o.x);
	}

	// Start with the lower hull
	var i, lower = [];
	for( i=0; i<nPts; i+=1 ){
		while( lower.length >= 2 && crossProd(lower[lower.length-2], lower[lower.length-1], uniquePts[i] ) <= 0){
			lower.pop();
		}
		lower.push( uniquePts[i] );
	}

	// Now build the upper hull (same as lower but points are reversed)
	var upper = [];
	uniquePts.reverse();
	for( i=0; i<nPts; i+=1 ){
		while( upper.length >= 2 && crossProd(upper[upper.length-2], upper[upper.length-1], uniquePts[i] ) <= 0 ){
			upper.pop();
		}
		upper.push( uniquePts[i] );
	}

	// The upper+lower parts give the entire hull. The last point is removed
	// because it is repeated at the beginning of the other list. 
	return lower.slice(0,-1).concat( upper.slice(0,-1) );
}
