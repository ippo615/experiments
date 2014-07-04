var CvLab = (function (CvLab) {
	
	CvLab.image.applyOperators = function( src, operators ){

		var xSize = src.width;
		var ySize = src.height;
		var srcPixels = src.data;
		var dst = new ImageData( src.width, src.height );
		var dstPixels = dst.data;
		var x, y, pos;

		for(y=0; y<ySize; y++){
			for(x=0; x<xSize; x++){

				pos = (y*xSize+x)*4;

				dstPixels[pos+0] = operators[0]( srcPixels[pos+0] );
				dstPixels[pos+1] = operators[1]( srcPixels[pos+1] );
				dstPixels[pos+2] = operators[2]( srcPixels[pos+2] );
				dstPixels[pos+3] = operators[3]( srcPixels[pos+3] );

			}
		}

		return dst;
	};

	return CvLab;
}(CvLab || {}));
