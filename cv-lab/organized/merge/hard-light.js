var CvLab = (function (CvLab) {
	
	CvLab.merge.hardLight = function( lower, upper ){

		/**
		 * Returns the merged value.
		 * 
		 * Hard light mode is rather complicated because the equation
		 * consists of two parts, one for darker colors and one for brighter
		 * colors. If the pixel color of the upper layer is greater than 128,
		 * the layers are combined one way. Otherwise, the pixel values of
		 * the upper and lower layers are multiplied together and multiplied
		 * by two, then divided by 256. You might use this mode to combine
		 * two photographs and obtain bright colors and sharp edges.
		 *
		 * @param lower {int} The value of the lower image pixel
		 * @param upper {int} The value of the upper image pixel
		 */

		if( upper > 128 ){
			return (255.0 - (255.0 - 2.0*(upper - 128.0))*(255.0-lower))/256.0;
		}else{
			return 2.0*upper*lower/256.0;
		}
	
	};

	CvLab.image.mergeHardLight = function( srcLower, srcUpper ){
		return CvLab.image.merge( srcLower, srcUpper, [
			CvLab.merge.hardLight,
			CvLab.merge.hardLight,
			CvLab.merge.hardLight,
			CvLab.merge.keepLower
		] );
	};

	return CvLab;
}(CvLab || {}));
