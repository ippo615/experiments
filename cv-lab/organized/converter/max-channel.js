var CvLab = (function (CvLab) {

	CvLab.converter.maxChannel = function( pixel ){
		/**
		 * Converts pixel from red, green, blue, alpha to the maximum of those and the alpha channel.
		 *
		 * This technically sets the non-maximum channels to 0 and copies the
		 * alpha through. It is useful for thresholding or posterizing a color
		 * image. Some examples:
		 * 
		 *     [ 17, 68, 76, 255 ] -> [ 0, 0, 76, 255 ]
		 *     [ 88, 88, 12, 128 ] -> [ 88, 88, 0, 128 ]
		 * 
		 * @param pixel {array} The [r,g,b,a] array of the original pixel
		 * @returns pixel {array} The [r,g,b,a] resulting pixel
		 */
		var r = pixel[0];
		var g = pixel[1];
		var b = pixel[2];
		var pxMax = Math.max( r,g,b );

		if( pxMax !== r ){ r = 0; }
		if( pxMax !== g ){ g = 0; }
		if( pxMax !== b ){ b = 0; }
		return [r,g,b,pixel[3]];
	};

	return CvLab;
}(CvLab || {}));
