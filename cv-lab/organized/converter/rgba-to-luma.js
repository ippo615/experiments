var CvLab = (function (CvLab) {

	CvLab.converter.rgbaToLuma = function( pixel ){
		/**
		 * Converts pixel from red, green, blue, alpha to luma (greyscale).
		 *
		 * For more information about luma: https://en.wikipedia.org/wiki/Luma_(video)
		 * 
		 * @param pixel {array} The [r,g,b,a] array of the original pixel
		 * @returns pixel {array} The [l,l,l,a] resulting pixel
		 */
		var r = pixel[0];
		var g = pixel[1];
		var b = pixel[2];
		var a = pixel[3];

		var luma  = Math.floor( 0.30*r + 0.59*g + 0.11*b );

		return [ luma, luma, luma, a ];
	};

	return CvLab;
}(CvLab || {}));
