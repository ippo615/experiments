var CvLab = (function (CvLab) {
	
	CvLab.merge.darkenOnly = function( lower, upper ){

		/**
		 * Returns the darker of the two.
		 * 
		 * Darken only mode compares each component of each pixel in the
		 * upper layer with the corresponding one in the lower layer and
		 * uses the smaller value in the resulting image. Completely white
		 * layers have no effect on the final image and completely black
		 * layers result in a black image. 
		 * 
		 * @param lower {int} The value of the lower image pixel
		 * @param upper {int} The value of the upper image pixel
		 * @returns merged {int} The value of the merged pixel
		 */

		return (lower<upper)?lower:upper;
	
	};

	CvLab.image.mergeDarkenOnly = function( srcLower, srcUpper ){
		return CvLab.image.merge( srcLower, srcUpper, [
			CvLab.merge.darkenOnly,
			CvLab.merge.darkenOnly,
			CvLab.merge.darkenOnly,
			CvLab.merge.keepLower
		] );
	};

	return CvLab;
}(CvLab || {}));
