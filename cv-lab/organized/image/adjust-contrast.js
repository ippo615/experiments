var CvLab = (function (CvLab) {
	
	CvLab.image.adjustContrast = function( src, contrast ){
		/**
		 * Increases or decreases the contrast of an image.
		 *
		 * It only applies to the first 3 channels of the image. The 4th
		 * channel is usually the alpha and is just copied through.
		 * 
		 * @param src {ImageData} The image to be adjusted
		 * @param contrast {int} The amount the change the contrast.
		 *   Min: -127, Max: 127. A negative contrast decreases the contrast
		 *   making the image more grey. A positive contrast increases the
		 *   contrast.
		 * @returns dst {ImageData} The adjusted image
		 */
		return CvLab.image.applyOperators( src, [
			CvLab.operator.generateContrast(contrast),
			CvLab.operator.generateContrast(contrast),
			CvLab.operator.generateContrast(contrast),
			CvLab.operator.copy
		] );
	};

	return CvLab;
}(CvLab || {}));
