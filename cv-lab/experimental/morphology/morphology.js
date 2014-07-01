function _extractPixels( srcPixels, x,y, xSize, ySize, locations, channel ){
	var pixels = [];
	var pos, iLoc, i, l = locations.length;
	for( i=0; i<l; i+=1 ){
		iLoc = locations[i];
		pos = (x+iLoc.x + (y+iLoc.y)*xSize)*4;
		pixels.push( srcPixels[pos+channel]*iLoc.scale );
	}

	return pixels;
}

function _imageDataToLocations( xOrigin, yOrigin, structure ){
	var xSize = structure.width;
	var ySize = structure.height;
	

	var locations = [ [], [], [], [] ];
	var x,y,pos,i;
	for( y=0; y<ySize; y+=1 ){
		for( x=0; x<xSize; x+=1 ){
			pos = (y*xSize+x)*4;
			for( i=0; i<4; i+=1 ){
				if( structure[pos+i] !== 0 ){
					locations[i].push( {
						y: y-yOrigin,
						x: x-xOrigin,
						scale: structure[pos+i]/255.0
					} );
				}
			}
		}
	}

	return locations;
}

function _structuringElementToLocations( xOrigin, yOrigin, structure ){
	var xSize = structure[0].length;
	var ySize = structure.length;

	var locations = [];
	var x,y;
	for( y=0; y<ySize; y+=1 ){
		for( x=0; x<xSize; x+=1 ){
			if( structure[y][x] !== 0 ){
				locations.push( {
					y: y-yOrigin,
					x: x-xOrigin,
					scale: structure[y][x]
				} );
			}
		}
	}

	return [ locations, locations, locations, locations ];
}

function imageErode( src, dst ){

	var xSize = src.width;
	var ySize = src.height;
	var srcPixels = src.data;
	var dstPixels = dst.data;
	var x, y, pos;

	var locations = _structuringElementToLocations( 1, 1, [
		[ 1, 1, 1 ],
		[ 1, 1, 1 ],
		[ 1, 1, 1 ]
	]);

	for(y=1; y<ySize-1; y++){
		for(x=1; x<xSize-1; x++){

			pos = (y*xSize+x)*4;

			// Save the new data
			dstPixels[pos+0] = Math.min.apply(null,_extractPixels( srcPixels, x,y, xSize, ySize, locations[0], 0) );
			dstPixels[pos+1] = Math.min.apply(null,_extractPixels( srcPixels, x,y, xSize, ySize, locations[1], 1) );
			dstPixels[pos+2] = Math.min.apply(null,_extractPixels( srcPixels, x,y, xSize, ySize, locations[2], 2) );
			dstPixels[pos+3] = Math.min.apply(null,_extractPixels( srcPixels, x,y, xSize, ySize, locations[3], 3) );

		}
	}

}

function imageDilate( src, dst ){

	var xSize = src.width;
	var ySize = src.height;
	var srcPixels = src.data;
	var dstPixels = dst.data;
	var x, y, pos;

	var locations = _structuringElementToLocations( 1, 1, [
		[ 1, 1, 1 ],
		[ 1, 1, 1 ],
		[ 1, 1, 1 ]
	]);

	for(y=1; y<ySize-1; y++){
		for(x=1; x<xSize-1; x++){

			pos = (y*xSize+x)*4;

			// Save the new data
			dstPixels[pos+0] = Math.max.apply(null,_extractPixels( srcPixels, x,y, xSize, ySize, locations[0], 0) );
			dstPixels[pos+1] = Math.max.apply(null,_extractPixels( srcPixels, x,y, xSize, ySize, locations[1], 1) );
			dstPixels[pos+2] = Math.max.apply(null,_extractPixels( srcPixels, x,y, xSize, ySize, locations[2], 2) );
			dstPixels[pos+3] = Math.max.apply(null,_extractPixels( srcPixels, x,y, xSize, ySize, locations[3], 3) );

		}
	}

}

function _copyImageData( src ){
	var dst = new ImageData(src.width, src.height);

	var dstPixels = dst.data;
	var srcPixels = src.data;
	var i, nPixels = src.width*src.height*4;
	for( i=0; i<nPixels; i+=4 ){
		dstPixels[i] = srcPixels[i];
		dstPixels[i+1] = srcPixels[i+1];
		dstPixels[i+2] = srcPixels[i+2];
		dstPixels[i+3] = srcPixels[i+3];
	}

	return dst;
}

function imageOpen( src, dst ){
	var tmp = _copyImageData(src);
	imageErode( src, tmp );
	imageDilate( tmp, dst );
}
function imageClose( src, dst ){
	var tmp = _copyImageData(src);
	imageDilate( src, tmp );
	imageErode( tmp, dst );
}