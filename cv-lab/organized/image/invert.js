var CvLab = (function (CvLab) {
	
	CvLab.image.invert = function( src ){
		/**
		 * Inverts an image's color.
		 * 
		 * This turns white areas of an image to black and makes black areas
		 * white. Note that this does NOT affect the alpha channel.
		 * 
		 * @param src {ImageData} The image to be modified
		 * @returns dst {ImageData} The converted image
		 */
		return CvLab.image.applyOperators( src, [
			CvLab.operator.invert,
			CvLab.operator.invert,
			CvLab.operator.invert,
			CvLab.operator.copy
		] );	
	};

	return CvLab;
}(CvLab || {}));
