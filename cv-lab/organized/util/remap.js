var CvLab = (function (CvLab) {
	
	CvLab.util.remap = function(value,fromMin,fromMax,toMin,toMax){
		/**
		 * Linearly maps a value from one range to another.
		 * 
		 * @param value {int|float} the original number
		 * @param fromMin {int|float} the minimum number in the original range
		 * @param fromMax {int|float} the maximum number in the original range
		 * @param toMin {int|float} the minimum number in the new range
		 * @param toMax {int|float} the maximum number in the new range
		 *
		 * @returns remapped {int|float} the remapped value
		 */
		var dFrom = fromMax - fromMin;
		var dTo = toMax - toMin;
		return toMin + (value - fromMin)*dTo/dFrom;
	};

	return CvLab;
}(CvLab || {}));
