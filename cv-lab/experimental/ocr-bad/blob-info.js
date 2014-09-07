function extractBlobInfo( blobMap, nBlobs ){

	// Create an array of blob objects
	var blobs = [];
	var i, l = nBlobs;
	for( i=0; i<l; i+=1 ){
		blobs.push( {
			index: i,
			xMin: 9e99,
			yMin: 9e99,
			xMax: -9e99,
			yMax: -9e99,
			xSize: 0,
			ySize: 0,
			xCenter: 0.0,
			yCenter: 0.0,
			nPixels: 0,
			allPoints: [],
			edgePoints: []
		} );
	}

	// For iterating
	var ySize = blobMap.length;
	var xSize = blobMap[0].length;
	var x,y, index, blob;

	// For bounds checking
	var xEnd = xSize-1;
	var yEnd = ySize-1;
	var xStart = 0;
	var yStart = 0;

	for( y=0; y<ySize; y+=1 ){
		for( x=0; x<xSize; x+=1 ){
			index = blobMap[y][x];
			blob = blobs[index];

			// axis-aligned bounding box
			if( x < blob.xMin ){ blob.xMin = x; }
			if( y < blob.yMin ){ blob.yMin = y; }
			if( x > blob.xMax ){ blob.xMax = x; }
			if( y > blob.yMax ){ blob.yMax = y; }

			// center of mass
			blob.xCenter += x;
			blob.yCenter += y;

			// mass aka area
			blob.nPixels += 1;

			// polygon/convex hull
			blob.allPoints.push( {x:x,y:y} );

			// perimeter
			var isPerimeter = false;
			if( yStart < y && y < yEnd && xStart < x && x < xEnd ){
				if( blobMap[y-1][x-1] !== index ){ isPerimeter = true; }
				if( blobMap[y-0][x-1] !== index ){ isPerimeter = true; }
				if( blobMap[y+1][x-1] !== index ){ isPerimeter = true; }
				if( blobMap[y-1][x-0] !== index ){ isPerimeter = true; }
				if( blobMap[y-0][x-0] !== index ){ isPerimeter = true; }
				if( blobMap[y+1][x-0] !== index ){ isPerimeter = true; }
				if( blobMap[y-1][x+1] !== index ){ isPerimeter = true; }
				if( blobMap[y-0][x+1] !== index ){ isPerimeter = true; }
				if( blobMap[y+1][x+1] !== index ){ isPerimeter = true; }
				if( isPerimeter ){ blob.edgePoints.push( (x,y) ); }
			}

		}
	}

	for( i=0; i<nBlobs; i+=1 ){
		blob = blobs[i];
		// scale the centers otherwise they are wrong
		blob.xCenter /= blob.nPixels;
		blob.yCenter /= blob.nPixels;
		// compute the width and height from the aabb
		blob.xSize = blob.xMax - blob.xMin;
		blob.ySize = blob.yMax - blob.yMin;
	}

	return blobs;
}
