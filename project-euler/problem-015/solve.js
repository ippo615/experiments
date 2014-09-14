/** Lattice paths
 * Starting in the top left corner of a 2×2 grid, and only being
 * able to move to the right and down, there are exactly 6 routes to
 * the bottom right corner.
 * 
 * How many such routes are there through a 20×20 grid?
 */

function solve_recursive(xSize,ySize,x,y){
	x = x || 0;
	y = y || 0;
	var xArrived = (x===xSize);
	var yArrived = (y===ySize);
	if( xArrived && yArrived ){
		return 1;
	}else
	if( xArrived && ! yArrived ){
		return solve_recursive(xSize,ySize,x,y+1);
	}else
	if( ! xArrived && yArrived ){
		return solve_recursive(xSize,ySize,x+1,y);
	}else{
		var dx = solve_recursive(xSize,ySize,x+1,y);
		var dy = solve_recursive(xSize,ySize,x,y+1);
		return dx+dy;
	}
}

console.info( solve_recursive(2,2) );
console.info( solve_recursive(3,3) );
console.info( solve_recursive(4,4) );
//console.info( solve_recursive(20,20) ); // slow (hours)

var solve_recursive_memo = (function(){
	var cache = {};
	function solve_recursive_memo(xSize,ySize,x,y){
		// Reset the cache on the first call
		if( ! x && ! y ){
			cache = {};
			x = 0;
			y = 0;
		}
	
		var xArrived = (x===xSize);
		var yArrived = (y===ySize);
		if( xArrived && yArrived ){
			return 1;
		}

		var id = x+','+y;
		if( cache.hasOwnProperty(id) ){
			return cache[id];
		}

		if( xArrived && ! yArrived ){
			cache[id] = solve_recursive_memo(xSize,ySize,x,y+1);
			return cache[id];
		}else
		if( ! xArrived && yArrived ){
			cache[id] = solve_recursive(xSize,ySize,x+1,y);
			return cache[id];
		}else{
			var dx = solve_recursive_memo(xSize,ySize,x+1,y);
			var dy = solve_recursive_memo(xSize,ySize,x,y+1);
			cache[id] = dx+dy
			return cache[id];
		}
	}
	return solve_recursive_memo;
})();

console.info( solve_recursive_memo(2,2) );
console.info( solve_recursive_memo(3,3) );
console.info( solve_recursive_memo(4,4) );
console.info( solve_recursive_memo(10,10) );
console.info( solve_recursive_memo(20,20) ); // fast (ms)

function solve_iter( xSize, ySize, x, y ){
	var nPaths = 0;
	x = x || 0;
	y = y || 0;
	var stack = [];
	stack.push([x,y]);
	while( stack.length > 0 ){
		var pt = stack.pop();
		var x = pt[0];
		var y = pt[1];
		var xArrived = (x===xSize);
		var yArrived = (y===ySize);

		if( xArrived && yArrived ){
			nPaths+=1;
		}else
		if( xArrived && ! yArrived ){
			stack.push([x,y+1]);
		}else
		if( ! xArrived && yArrived ){
			stack.push([x+1,y]);
		}else{
			stack.push([x+1,y]);
			stack.push([x,y+1]);
		}
	}
	return nPaths;
}

console.info( solve_iter(2,2) );
console.info( solve_iter(3,3) );
console.info( solve_iter(4,4) );
console.info( solve_iter(10,10) );
//console.info( solve_iter(20,20) ); // slow (hours)

function solve_dynamic_programming( xSize, ySize ){
	// Create a grid (table) for holding all the scores
	var grid = [];
	var x,y;
	for( y=0; y<ySize+1; y+=1 ){
		grid.push([]);
		for( x=0; x<xSize+1; x+=1 ){
			grid[y].push(0);
		}
	}

	// The outer edges represent the cases that return 1
	// the middle has yet to be determined
	for( y=0; y<ySize; y+=1 ){
		grid[y][0] = 1;
	}
	for( x=0; x<xSize; x+=1 ){
		grid[0][x] = 1;
	}

	// Compute all the intermediate stuff
	for( y=1; y<ySize+1; y+=1 ){
		for( x=1; x<xSize+1; x+=1 ){
			grid[y][x] = grid[y-1][x] + grid[y][x-1];
		}
	}

	return grid[ySize][xSize];
}

console.info( solve_dynamic_programming(2,2) );
console.info( solve_dynamic_programming(3,3) );
console.info( solve_dynamic_programming(4,4) );
console.info( solve_dynamic_programming(10,10) );
console.info( solve_dynamic_programming(20,20) ); // fast (ms)

// recursive memoization vs dynamic programming

function time_it( action ){
	var start = +(new Date());
	action();
	var end = +(new Date());
	console.info( 'Duration: '+ (end-start) +'ms' );	
}

// Dynamic Programming 2-5ms
time_it( function(){
	console.info( solve_dynamic_programming(200,200) );
});
// Recursive Memoization 40-100ms
time_it( function(){
	console.info( solve_recursive_memo(200,200) );
});

/** 137846528820
 * Congratulations, the answer you gave to problem 15 is correct.
 *
 * You are the 92749th person to have solved this problem.
 */
