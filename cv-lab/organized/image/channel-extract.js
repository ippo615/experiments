var CvLab = (function (CvLab) {
	
	CvLab.image.channelExtract = function( src, channel ){
		/**
		 * Returns all of the pixel values of an image as a matrix.
		 * 
		 * @param src {ImageData} The image to extract the channel from
		 * @param channel {int} The channel to extract (0,1,2,3).
		 * @returns dst {Matrix} The pixel values of that channel as a 2d matrix
		 */
		var xSize = src.width,
			ySize = src.height,
			srcPixels = src.data,
			x, y, pos;

		var matrix = [];

		for(y=0; y<ySize; y++){
			matrix.push([]);
			for(x=0; x<xSize; x++){
				pos = (y*xSize+x)*4;
				matrix[y].push( srcPixels[pos+channel] );
			}
		}

		return matrix;
	};

	return CvLab;
}(CvLab || {}));
