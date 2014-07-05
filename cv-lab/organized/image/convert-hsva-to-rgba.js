var CvLab = (function (CvLab) {
	
	CvLab.image.convertHsvaToRgba = function( src ){
		/**
		 * Converts an image from h,s,v,a to r,g,b,a.
		 *
		 * This function assumes that the 1st channel is hue, 2nd is
		 * saturation, 3rd is value, and 4th is alpha. It then changes
		 * every pixel so that the 1st channel is red, the 2nd channel
		 * is green, the 3rd is blue, and the 4th is alpha.
		 * 
		 * @param src {ImageData} The image to be modified
		 * @returns dst {ImageData} The converted image
		 */
		return CvLab.image.convert( src, CvLab.converter.hsvaToRgba );
	};

	return CvLab;
}(CvLab || {}));
