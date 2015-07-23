
function extractColorToLocationBin( src, color, Point, binSize ){

	var xSize = src.width;
	var ySize = src.height;
	var pixels = src.data;

	var nBinsX = Math.floor( xSize / binSize );
	var nBinsY = Math.floor( ySize / binSize );

	// Create empty bins for holding the points
	var points = [];
	var bins = [];
	for( var xBin=0; xBin<nBinsX; xBin+=1 ){
		bins.push([]);
		for( var yBin=0; yBin<nBinsY; yBin+=1 ){
			bins[xBin].push([]);
		}
	}

	for( var x=0; x<xSize; x+=1 ){
		var xBin = Math.floor( x/binSize );
		for( var y=0; y<ySize; y+=1 ){
			var yBin = Math.floor( y/binSize );
			var pos = (y*xSize+x)*4;
			var r = pixels[pos+0] >= color.r;
			var g = pixels[pos+1] >= color.g;
			var b = pixels[pos+2] >= color.b;
			var a = pixels[pos+3] >= color.a;
			if( r && g && b && a ){
				var point = new Point( x, y );
				point.bin = bins[xBin][yBin];
				point.binIndex = point.bin.length;
				point.index = points.length;
				points.push( point );
				bins[xBin][yBin].push( point );
			}
		}
	}

	return {
		points: points,
		bins: bins
	};
}

function buildPaths_not_done( points, bins, binSize, Path ){
	var paths = [];
	while( points.length !== 0 ){

		// Get a point, start a new path
		var point = points[0];
		var path = new Path();

		do {
			// Remove the starting point from the storage area
			// and add it to the current path
			// I CANNOT DO THIS BECAUSE INDECIES ARE CHANGING ON EACH SPLICE
			point.bin.splice( point.binIndex, 1 );
			points.splice( point.index, 1 );
			path.addPoint( point );

			// Get a list of all the bins to search through
			// these are the adjacent bins (up,down,left,right,+diagonals)
			var xBin = Math.floor( point.x / binSize );
			var yBin = Math.floor( point.y / binSize );
			var checkBins = [];
			if( yBin-1 >= 0 ){
				if( xBin-1 >= 0 ){ checkBins.push( bins[xBin-1][yBin-1] ); }
				if( xBin >= 0 ){ checkBins.push( bins[xBin][yBin-1] ); }
				if( xBin+1 < bins.length ){ checkBins.push( bins[xBin+1][yBin-1] ); }
			}
			if( yBin >= 0 ){
				if( xBin-1 >= 0 ){ checkBins.push( bins[xBin-1][yBin] ); }
				if( xBin >= 0 ){ checkBins.push( bins[xBin][yBin] ); }
				if( xBin+1 < bins.length ){ checkBins.push( bins[xBin+1][yBin] ); }
			}
			if( yBin+1 < bins[0].length ){
				if( xBin-1 >= 0 ){ checkBins.push( bins[xBin-1][yBin] ); }
				if( xBin >= 0 ){ checkBins.push( bins[xBin][yBin] ); }
				if( xBin+1 < bins.length ){ checkBins.push( bins[xBin+1][yBin] ); }
			}

			// Search for the nearest neighbor
			var nearest = null;
			var minDist = 9e99;
			for( var i=0, l=checkBins.length; i<l; i+=1 ){
				var bin = checkBins[i];
				for( var p=0, pl = bin.length; p<pl; p+=1 ){
					var dist = point.distanceTo( bin[p] );
					if( dist < minDist ){
						nearest = bin[p];
						minDist = dist;
					}
				}
			}

			point = nearest;
		} while( point !== null );

		paths.push( path );
	}

	return paths;
}

function extractColorToLocations( src, color, Point ){

	var xSize = src.width;
	var ySize = src.height;
	var pixels = src.data;

	var points = [];

	for( var x=0; x<xSize; x+=1 ){
		for( var y=0; y<ySize; y+=1 ){
			var pos = (y*xSize+x)*4;
			var r = pixels[pos+0] >= color.r;
			var g = pixels[pos+1] >= color.g;
			var b = pixels[pos+2] >= color.b;
			var a = pixels[pos+3] >= color.a;
			if( r && g && b && a ){
				var point = new Point( x, y );
				points.push( point );
			}
		}
	}

	return points;
}

function buildPaths( points, moveDistance, Path ){
	var paths = [];
	while( points.length !== 0 ){

		// Get a point, start a new path
		var point = points[0];
		var path = new Path();

		do {
			// Remove the starting point from the storage area
			// and add it to the current path
			points.splice( points.indexOf(point), 1 );
			path.addPoint( point );

			// Search for the nearest neighbor
			var nearest = null;
			var minDist = moveDistance;
			for( var i=0, l=points.length; i<l; i+=1 ){
				var dist = point.distanceTo( points[i] );
				if( dist < minDist ){
					nearest = points[i];
					minDist = dist;
				}
			}

			point = nearest;
		} while( point !== null );

		paths.push( path );
	}

	return paths;
}
