var CvLab = (function (CvLab) {
	
	CvLab.image.applyOperators = function( src, operators ){
		/**
		 * Applies operators to each pixel of every channel.
		 * 
		 * The 1st operator is applied to the 1st channel of each pixel; the
		 * 2nd to the 2nd channel; the 3rd to the 3rd channel; the 4th to the
		 * 4th channel. Typically, the 1st channel is red, 2nd green, 3rd
		 * blue, and 4th alpha.
		 * 
		 * The operators can come from `CvLab.operator` or you can make your
		 * own as long as they match this signature:
		 * 
		 *     function myOperator( value ){
		 *         // value and return value must be integers between 0 and 255
		 *         return value;
		 *     }
		 * 
		 * @param src {ImageData} The image to be modified
		 * @param operators {array} A 4-element arrary of operators that
		 *   will be applied to each channel. 
		 * @returns dst {ImageData} The adjusted image
		 */
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
