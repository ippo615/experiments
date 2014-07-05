var CvLab = (function (CvLab) {
	
	CvLab.image.convertToMinChannel = function( src ){
		/**
		 * Preserves an image's minimum channel.
		 * 
		 * This technically sets the non-minimum channels to 0 and copies the
		 * alpha through. It is useful for thresholding or posterizing a color
		 * image.
		 * 
		 * @param src {ImageData} The image to be modified
		 * @returns dst {ImageData} The converted image
		 */
		return CvLab.image.convert( src, CvLab.converter.minChannel );
	};

	return CvLab;
}(CvLab || {}));
