var CvLab = (function (CvLab) {
	
	CvLab.merge.difference = function( lower, upper ){

		/**
		 * Returns the absolute value of the difference between the two.
		 * 
		 * Difference mode subtracts the pixel value of the upper
		 * layer from that of the lower layer and then takes the absolute
		 * value of the result.
		 * 
		 * @param lower {int} The value of the lower image pixel
		 * @param upper {int} The value of the upper image pixel
		 * @returns merged {int} The value of the merged pixel
		 */

		var diff = lower - upper;
		return (diff<0)?-diff:diff;
	
	};

	CvLab.image.mergeDifference = function( srcLower, srcUpper ){
		return CvLab.image.merge( srcLower, srcUpper, [
			CvLab.merge.difference,
			CvLab.merge.difference,
			CvLab.merge.difference,
			CvLab.merge.keepLower
		] );
	};

	return CvLab;
}(CvLab || {}));
