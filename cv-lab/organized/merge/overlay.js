var CvLab = (function (CvLab) {
	
	CvLab.merge.overlay = function( lower, upper ){

		/**
		 * Returns the merged value.
		 * 
		 * Overlay mode inverts the pixel value of the lower layer,
		 * multiplies it by two times the pixel value of the upper layer,
		 * adds that to the original pixel value of the lower layer,
		 * divides by 255, and then multiplies by the pixel value of the
		 * original lower layer and divides by 255 again. It darkens the
		 * image, but not as much as with "Multiply" mode. 
		 * 
		 * @param lower {int} The value of the lower image pixel
		 * @param upper {int} The value of the upper image pixel
		 */

		return (lower/255.0) * (lower + (2.0*upper/255.0)*(255.0-lower));
	
	};

	return CvLab;
}(CvLab || {}));
