var CvLab = (function (CvLab) {
	
	CvLab.image.convertToMaxChannel = function( src ){
		/**
		 * Preserves an image's maximum channel.
		 * 
		 * This technically sets the non-maximum channels to 0 and copies the
		 * alpha through. It is useful for thresholding or posterizing a color
		 * image.
		 * 
		 * @param src {ImageData} The image to be modified
		 * @returns dst {ImageData} The converted image
		 */
		return CvLab.image.convert( src, CvLab.converter.maxChannel );
	};

	return CvLab;
}(CvLab || {}));
