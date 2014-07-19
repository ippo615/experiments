var CvLab = (function (CvLab) {
	
	CvLab.merge.screen = function( lower, upper ){

		/**
		 * Returns the merged value.
		 * 
		 * Screen mode inverts the values of each of the visible pixels in
		 * the two layers of the image. (That is, it subtracts each of them
		 * from 255.) Then it multiplies them together, divides by 255 and
		 * inverts this value again. The resulting image is usually brighter,
		 * and sometimes "washed out" in appearance. The exceptions to this
		 * are a black layer, which does not change the other layer, and a
		 * white layer, which results in a white image. Darker colors in the
		 * image appear to be more transparent. 
		 * 
		 * @param lower {int} The value of the lower image pixel
		 * @param upper {int} The value of the upper image pixel
		 */

		return 255.0 - (255.0 - upper)*(255.0 - lower)/255.0;
	
	};

	CvLab.image.mergeScreen = function( srcLower, srcUpper ){
		return CvLab.image.merge( srcLower, srcUpper, [
			CvLab.merge.screen,
			CvLab.merge.screen,
			CvLab.merge.screen,
			CvLab.merge.keepLower
		] );
	};

	return CvLab;
}(CvLab || {}));
