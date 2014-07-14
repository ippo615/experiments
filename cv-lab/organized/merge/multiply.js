var CvLab = (function (CvLab) {
	
	CvLab.merge.multiply = function( lower, upper ){

		/**
		 * Returns the merged value.
		 * 
		 * Multiply mode multiplies the pixel values of the upper layer with
		 * those of the layer below it and then divides the result by 255.
		 * The result is usually a darker image. If either layer is white,
		 * the resulting image is the same as the other layer (1 * I = I).
		 * If either layer is black, the resulting image is completely black
		 * (0 * I = 0).  
		 *
		 * @param lower {int} The value of the lower image pixel
		 * @param upper {int} The value of the upper image pixel
		 */

		return upper * lower / 255.0; 
	
	};

	return CvLab;
}(CvLab || {}));
