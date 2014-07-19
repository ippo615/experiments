var CvLab = (function (CvLab) {
	
	CvLab.merge.burn = function( lower, upper ){

		/**
		 * Returns the merged value.
		 * 
		 * Burn mode inverts the pixel value of the lower layer, multiplies
		 * it by 256, divides that by one plus the pixel value of the upper
		 * layer, then inverts the result. It tends to make the image darker,
		 * somewhat similar to “Multiply” mode.
		 *
		 * In photography, burning is a technique used in a darkroom to
		 * increase the exposure in particular areas of the image. This brings
		 * out details in the highlights. 
		 * 
		 * @param lower {int} The value of the lower image pixel
		 * @param upper {int} The value of the upper image pixel
		 * @returns merged {int} The value of the merged pixel
		 */

		return 255.0 - (256.0 * (255.0-lower))/(upper + 1.0);
	
	};

	CvLab.image.mergeBurn = function( srcLower, srcUpper ){
		return CvLab.image.merge( srcLower, srcUpper, [
			CvLab.merge.burn,
			CvLab.merge.burn,
			CvLab.merge.burn,
			CvLab.merge.keepLower
		] );
	};

	return CvLab;
}(CvLab || {}));
