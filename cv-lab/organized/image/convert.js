var CvLab = (function (CvLab) {
	
	CvLab.image.convert = function( src, convert ){

		/**
		 * Applies convert to each pixel of the input image.
		 * 
		 * The convert function can come from `CvLab.operator` or you can
		 * make your own as long as they match this signature:
		 * 
		 * 	function myConvertCopy( pixel ){
		 * 		// pixel is an array of 4 ints between 0 and 255
		 * 		return [
		 * 			pixel[0],
		 * 			pixel[1],
		 * 			pixel[2],
		 * 			pixel[3]
		 * 		];
		 * 	}
		 * 
		 * @param src {ImageData} The image to be modified
		 * @param convert {function} The function to apply to each pixel
		 * @returns dst {ImageData} The converted image
		 */

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
	};

	return CvLab;
}(CvLab || {}));
