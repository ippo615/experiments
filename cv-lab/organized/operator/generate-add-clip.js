var CvLab = (function (CvLab) {
	
	CvLab.operator.generateAddClip = function( amount ){
		/**
		 * Creates an operator which adds amount and clips the result at 0 or 255.
		 * 
		 * @param amount {int} The amount to add to the value (can be positive or negative).
		 *   Min: -255, Max: 255.
		 * @returns addWrapOperator {function}
		 *   The operator which adds amount and clips it at 0 or 255.
		 */
		return function(value){
			var val = Math.round(value + amount);
			if( val < 0 ){ return 0; }else
			if( val > 255 ){ return 255; }
			return val;
		};
	};

	return CvLab;
}(CvLab || {}));
