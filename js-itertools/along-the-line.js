function alongTheLine( x0, y0, x1, y1, action, state ){
	// This is based on Bresenham's line algorithm

	// The algorithm only works with integers
	x0 = Math.round(x0);
	y0 = Math.round(y0);
	x1 = Math.round(x1);
	y1 = Math.round(y1);

	// Create an action if none is supplied
	if( ! action ){
		action = function(x,y,state){ return state; }
	}

	// Create a blank state if none is supplied
	if( ! state ){
		state = {};
	}

	// Deltas, how far we have to go in each dimension
	var dx = Math.abs(x1 - x0);
	var dy = Math.abs(y1 - y0);

	// The current coordinate
	var x = x0;
	var y = y0;

	// Signs, should we be moving the pos/neg x,y direction
	var sx = (x0 > x1)?-1:1;
	var sy = (y0 > y1)?-1:1;

	// The amount of error (from an ideal line) accumulated
	var err;

	// Horizontalish line
	if( dx > dy ){
		err = dx / 2.0;
		while( x != x1 ){
			action( x,y,state );
			err -= dy;
			if( err < 0 ){
				y += sy;
				err += dx;
			}
			x += sx;
		}

	// Verticalish line
	}else{
		err = dy / 2.0;
		while( y != y1 ){
			action( x,y,state );
			err -= dx;
			if( err < 0 ){
				x += sx;
				err += dy;
			}
			y += sy; 
		}
	}

	action( x, y, state );
	return state;
}

// Testing
var lines = []
var i;
for( i=0; i<360; i+=15 ){
	lines.push( [
		0,
		0,
		Math.round(10*Math.cos(i*Math.PI/180)),
		Math.round(10*Math.sin(i*Math.PI/180))
	] );
}

// Testing no action, no state
var line, l = lines.length;
for( i=0; i<l; i+=1 ){
	line = lines[i];
	console.info( i );
	alongTheLine( line[0], line[1], line[2], line[3] );
}

// Testing stateless action
function printCoord( x,y, state ){
	console.info( '{'+[x,y].join(', ')+'}' );
	return state;
}
for( i=0; i<l; i+=1 ){
	line = lines[i];
	alongTheLine( line[0], line[1], line[2], line[3], printCoord );
}

// Testing state and action
function computeLength( x,y, state ){
	var dx = x - state.last_x;
	var dy = y - state.last_y;
	state.dist += Math.sqrt(dx*dx + dy*dy);
	state.last_x = x;
	state.last_y = y;
	return state;
}
var result, state = {};
for( i=0; i<l; i+=1 ){
	line = lines[i];
	state = {
		last_x: line[0],
		last_y: line[1],
		dist: 0
	};
	result = alongTheLine( line[0], line[1], line[2], line[3], computeLength, state );
	console.info( state );
	console.info( result );
	console.info( ' ------------------- ' );
}
