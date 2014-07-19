var CvLab = (function (CvLab) {
	
	CvLab.merge.addition = function( lower, upper ){

		/**
		 * Returns the sum limitted to 255.
		 * 
		 * Addition mode is very simple. The pixel values of the
		 * upper and lower layers are added to each other. The resulting
		 * image is usually lighter. The equation can result in color
		 * values greater than 255, so some of the light colors may be
		 * set to the maximum value of 255. 
		 * 
		 * @param lower {int} The value of the lower image pixel
		 * @param upper {int} The value of the upper image pixel
		 */

		var sum = lower + upper;
		return (sum>255)?255:sum;
	
	};

	CvLab.image.mergeAdd = function( srcLower, srcUpper ){
		return CvLab.image.merge( srcLower, srcUpper, [
			CvLab.merge.addition,
			CvLab.merge.addition,
			CvLab.merge.addition,
			CvLab.merge.keepLower
		] );
	};

	return CvLab;
}(CvLab || {}));
