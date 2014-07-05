var CvLab = (function (CvLab) {
	
	CvLab.image.adjustRgba = function( src, r, g, b, a ){
		/**
		 * Shifts the red, green, blue and alpha of an image.
		 * 
		 * @param src {ImageData} The image to be adjusted
		 * @param r {int} The amount to shift the red.
		 *   Min: -255, Max: 255. Negative removes red, postive adds to it.
		 * @param g {int} The amount to shift the green.
		 *   Min: -255, Max: 255. Negative removes green, postive adds to it.
		 * @param b {int} The amount to shift the blue.
		 *   Min: -255, Max: 255. Negative removes blue, postive adds to it.
		 * @param a {int} The amount to shift the alpha.
		 *   Min: -255, Max: 255. A negative value makes the image more
		 *   transparent while a postive value makes the image more opaque.
		 * @returns dst {ImageData} The adjusted image
		 */
		return CvLab.image.applyOperators( src, [
			CvLab.operator.generateAddClip(r),
			CvLab.operator.generateAddClip(g),
			CvLab.operator.generateAddClip(b),
			CvLab.operator.generateAddClip(a)
		] );
	};

	return CvLab;
}(CvLab || {}));
