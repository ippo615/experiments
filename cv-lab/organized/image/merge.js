var CvLab = (function (CvLab) {
	
	CvLab.image.merge = function( srcLower, srcUpper, channelCombines ){

		/**
		 * Returns the lower and upper image combined by the array of combining functions.
		 * 
		 * @param lower {ImageData} The image to be modified
		 * @param upper {ImageData} The image to be merged
		 * @param channelCombines {array} 1 function per channel describing how
		 *   to merge each channel
		 * @returns dst {ImageData} The merged image
		 */

		var xSize = srcLower.width,
			ySize = srcLower.height,
			upperPixels = srcUpper.data,
			lowerPixels = srcLower.data,
			x, y, pos;

		var dst = new ImageData( xSize, ySize );
		var dstPixels = dst.data;

		var r,g,b,a;

		for(y=0; y<ySize; y++){
			for(x=0; x<xSize; x++){

				pos = (y*xSize+x)*4;

				r = channelCombines[0]( upperPixels[pos], lowerPixels[pos] );
				g = channelCombines[1]( upperPixels[pos+1], lowerPixels[pos+1] );
				b = channelCombines[2]( upperPixels[pos+2], lowerPixels[pos+2] );
				a = channelCombines[3]( upperPixels[pos+3], lowerPixels[pos+3] );

				// Save the new data
				dstPixels[pos+0] = r;
				dstPixels[pos+1] = g;
				dstPixels[pos+2] = b;
				dstPixels[pos+3] = a;

			}
		}

		return dst;
	};

	return CvLab;
}(CvLab || {}));
