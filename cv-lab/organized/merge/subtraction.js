var CvLab = (function (CvLab) {
	
	CvLab.merge.subtraction = function( lower, upper ){

		/**
		 * Returns `lower - upper`.
		 * 
		 * Subtracts the pixel values of the upper layer from the pixel
		 * values of the lower layer. The resulting image is normally darker.
		 * You might get a lot of black or near-black in the resulting image.
		 * The equation can result in negative color values, so some of the
		 * dark colors may be set to the minimum value of 0. 
		 * 
		 * @param lower {int} The value of the lower image pixel
		 * @param upper {int} The value of the upper image pixel
		 */

		var delta = lower - upper;
		return (delta<0)?0:delta;
	
	};

	return CvLab;
}(CvLab || {}));
