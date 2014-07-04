var CvLab = (function (CvLab) {
	
	CvLab.image.convert = function( src, convert ){
		var srcPixels = src.data;
		var dst = new ImageData( src.width, src.height );
		var dstPixels = dst.data;

		var pixel, i, nPixels = srcPixels.length;
		for( i=0; i<nPixels; i+=4 ){
			pixel = convert( [srcPixels[i],srcPixels[i+1],srcPixels[i+2],srcPixels[i+3]] );
			dstPixels[i+0] = pixel[0];
			dstPixels[i+1] = pixel[1];
			dstPixels[i+2] = pixel[2];
			dstPixels[i+3] = pixel[3];
		}

		return dst;
	}

	return CvLab;
}(CvLab || {}));
