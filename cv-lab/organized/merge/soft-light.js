var CvLab = (function (CvLab) {
	
	CvLab.merge.softLight = function( lower, upper ){

		/**
		 * Returns the merged value.
		 * 
		 * Soft light is not related to "Hard light" in anything but the
		 * name, but it does tend to make the edges softer and the colors
		 * not so bright. 
		 * 
		 * @param lower {int} The value of the lower image pixel
		 * @param upper {int} The value of the upper image pixel
		 */

		var screen = 255.0 - (255.0 - upper)*(255.0 - lower)/255.0;
		return ((255.0 - lower)*upper + screen)/255.0 + lower;
	
	};

	CvLab.image.mergeSoftLight = function( srcLower, srcUpper ){
		return CvLab.image.merge( srcLower, srcUpper, [
			CvLab.merge.softLight,
			CvLab.merge.softLight,
			CvLab.merge.softLight,
			CvLab.merge.keepLower
		] );
	};

	return CvLab;
}(CvLab || {}));
