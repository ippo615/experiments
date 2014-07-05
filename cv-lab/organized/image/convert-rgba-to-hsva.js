var CvLab = (function (CvLab) {
	
	CvLab.image.convertRgbaToHsva = function( src ){
		/**
		 * Converts an image from r,g,b,a to h,s,v,a.
		 *
		 * By default images are stored with red as the 1st channel, green
		 * as the 2nd, blue as the 3rd, and alpha as the 4th. This changes
		 * the image so that the 1st channel is hue, 2nd is saturation, 3rd
		 * is value, and 4th is alpha. 
		 * 
		 * @param src {ImageData} The image to be modified
		 * @returns dst {ImageData} The converted image
		 */
		return CvLab.image.convert( src, CvLab.converter.rgbaToHsva );
	};

	return CvLab;
}(CvLab || {}));
