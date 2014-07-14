var CvLab = (function (CvLab) {
	
	CvLab.merge.grainMerge = function( lower, upper ){

		/**
		 * Returns the merged value.
		 * 
		 * Grain merge mode merges a grain layer into the current layer,
		 * leaving a grainy version of the original layer. It does just the
		 * opposite of "Grain extract". It adds the pixel values of the
		 * upper and lower layers together and subtracts 128.
		 * 
		 * @param lower {int} The value of the lower image pixel
		 * @param upper {int} The value of the upper image pixel
		 */

		return lower + upper - 128.0;
	
	};

	return CvLab;
}(CvLab || {}));
