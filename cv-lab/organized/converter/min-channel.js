var CvLab = (function (CvLab) {

	CvLab.converter.minChannel = function( pixel ){
		/**
		 * Converts pixel from red, green, blue, alpha to the minimum of those and the alpha channel.
		 *
		 * This technically sets the non-minimum channels to 0 and copies the
		 * alpha through. It is useful for thresholding or posterizing a color
		 * image. Some examples:
		 * 
		 *     [ 17, 17, 76, 255 ] -> [ 17, 17, 0, 255 ]
		 *     [ 88, 88, 12, 128 ] -> [ 0, 0, 12, 128 ]
		 * 
		 * @param pixel {array} The [r,g,b,a] array of the original pixel
		 * @returns pixel {array} The [r,g,b,a] resulting pixel
		 */
		var r = pixel[0];
		var g = pixel[1];
		var b = pixel[2];
		var pxMin = Math.min( r,g,b );

		if( pxMin !== r ){ r = 0; }
		if( pxMin !== g ){ g = 0; }
		if( pxMin !== b ){ b = 0; }
		return [r,g,b,pixel[3]];
	};

	return CvLab;
}(CvLab || {}));
