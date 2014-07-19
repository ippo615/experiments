var CvLab = (function (CvLab) {
	
	CvLab.merge.lightenOnly = function( lower, upper ){

		/**
		 * Returns the brighter of the two values.
		 * 
		 * Lighten only mode compares each component of each pixel in the
		 * upper layer with the corresponding one in the lower layer and uses
		 * the larger value in the resulting image. Completely black layers
		 * have no effect on the final image and completely white layers
		 * result in a white image. 
		 * 
		 * @param lower {int} The value of the lower image pixel
		 * @param upper {int} The value of the upper image pixel
		 */

		return (lower>upper)?lower:upper;
	
	};

	CvLab.image.mergeLightenOnly = function( srcLower, srcUpper ){
		return CvLab.image.merge( srcLower, srcUpper, [
			CvLab.merge.lightenOnly,
			CvLab.merge.lightenOnly,
			CvLab.merge.lightenOnly,
			CvLab.merge.keepLower
		] );
	};

	return CvLab;
}(CvLab || {}));
