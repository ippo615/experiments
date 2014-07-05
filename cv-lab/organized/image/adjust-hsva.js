var CvLab = (function (CvLab) {
	
	CvLab.image.adjustHsva = function( src, h, s, v, a ){
		/**
		 * Shifts the hue, saturation, value and alpha of an image.
		 *
		 * Please note that the hue, saturation, value and alpha amounts
		 * should be between -255 and +255. The hue will wrap when it
		 * reaches the minimum/maximum and the other values will clip at
		 * the min/max.
		 * 
		 * @param src {ImageData} The image to be adjusted
		 * @param h {int} The amount to shift the hue.
		 *   Min: -255, Max: 255.
		 * @param s {int} The amount to shift the saturation.
		 *   Min: -255, Max: 255. A negative value removes color from the
		 *   image while a positive value adds color to the image.
		 * @param v {int} The amount to shift the value.
		 *   Min: -255, Max: 255. A negative value makes the image darker
		 *   while a positive values makes the image whiter.
		 * @param a {int} The amount to shift the alpha.
		 *   Min: -255, Max: 255. A negative value makes the image more
		 *   transparent while a postive value makes the image more opaque.
		 * @returns dst {ImageData} The adjusted image
		 */
		var imgHsva = CvLab.image.convertRgbaToHsva( src );
		var imgAdj = CvLab.image.applyOperators( imgHsva, [
			CvLab.operator.generateAddWrap(h),
			CvLab.operator.generateAddClip(s),
			CvLab.operator.generateAddClip(v),
			CvLab.operator.generateAddClip(a)
		] );
		return CvLab.image.convertHsvaToRgba( imgAdj );
	};

	return CvLab;
}(CvLab || {}));
