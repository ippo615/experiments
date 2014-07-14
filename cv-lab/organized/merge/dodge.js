var CvLab = (function (CvLab) {
	
	CvLab.merge.dodge = function( lower, upper ){

		/**
		 * Returns the merged value.
		 * 
		 * Multiplies the pixel value of the lower layer by 256, then divides
		 * that by the inverse of the pixel value of the top layer. The
		 * resulting image is usually lighter, but some colors may be
		 * inverted.
		 *
		 * In photography, dodging is a technique used in a darkroom to
		 * decrease the exposure in particular areas of the image. This brings
		 * out details in the shadows.
		 * 
		 * @param lower {int} The value of the lower image pixel
		 * @param upper {int} The value of the upper image pixel
		 * @returns merged {int} The value of the merged pixel
		 */

		return (256.0*lower)/(255.0-upper+1.0);
	
	};

	return CvLab;
}(CvLab || {}));
