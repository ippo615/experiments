var CvLab = (function (CvLab) {
	
	CvLab.image.adjustBrightness = function( src, brightness ){
		/**
		 * Makes the image whiter or blacker
		 * 
		 * Negative brightness will make the image darker (blacker).
		 * Positive brightness will make the image brighter (whiter).
		 * Note that the alpha channel is not affected by this.
		 * 
		 * @param src {ImageData} The image to be modified
		 * @param brightness {int} The amount to increase the white level
		 *   Min: -255, Max: 255.
		 * @returns dst {ImageData} The converted image
		 */
		return CvLab.image.applyOperators( src, [
			CvLab.operator.generateAddClip(brightness),
			CvLab.operator.generateAddClip(brightness),
			CvLab.operator.generateAddClip(brightness),
			CvLab.operator.copy
		] );
	};

	return CvLab;
}(CvLab || {}));
