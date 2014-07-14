var CvLab = (function (CvLab) {
	
	CvLab.merge.divide = function( lower, upper ){

		/**
		 * Returns the two values divided.
		 * 
		 * Divide mode multiplies each pixel value in the lower layer by
		 * 256 and then divides that by the corresponding pixel value of
		 * the upper layer plus one. (Adding one to the denominator avoids
		 * dividing by zero.) The resulting image is often lighter, and
		 * sometimes looks "burned out". 
		 *
		 * @param lower {int} The value of the lower image pixel
		 * @param upper {int} The value of the upper image pixel
		 * @returns merged {int} The value of the merged pixel
		 */

		return (256.0 * lower)/(upper + 1.0);
	
	};

	return CvLab;
}(CvLab || {}));
