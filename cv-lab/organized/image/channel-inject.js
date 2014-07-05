var CvLab = (function (CvLab) {
	
	CvLab.image.channelInject = function( matrix, dst, channel ) {

		/**
		 * Inserts all of the pixels in matrix into the specified channel of dst.
		 * 
		 * @param matrix {Matrix} The 2d array of pixel values to be inserted.
		 * @param dst {ImageData} The image to put the channel data into
		 * @param channel {int} The channel to index (0,1,2,3).
		 * @returns dst {ImageData} The resulting image
		 */

		var xSize = dst.width,
			ySize = dst.height,
			dstPixels = dst.data,
			x, y, pos;

		for(y=0; y<ySize; y++){
			for(x=0; x<xSize; x++){
				pos = (y*xSize+x)*4;
				dstPixels[ pos+channel ] = matrix[y][x];
			}
		}

		return dst;
	};

	return CvLab;
}(CvLab || {}));
