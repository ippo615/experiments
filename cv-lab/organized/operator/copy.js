var CvLab = (function (CvLab) {
	
	CvLab.operator.copy = function( value ){
		/**
		 * Returns the exact same color value.
		 *
		 * @param value {int} the original color value between 0 and 255
		 * @returns value {int} the copied color
		 */
		return value;
	};

	return CvLab;
}(CvLab || {}));
