var CvLab = (function (CvLab) {
	
	CvLab.operator.invert = function( value ){
		/**
		 * Inverts the color value.
		 *
		 * @param value {int} the original color value between 0 and 255
		 * @returns value {int} the inverted color
		 */
		return 255-value;
	};

	return CvLab;
}(CvLab || {}));
