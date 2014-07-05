var CvLab = (function (CvLab) {
	
	CvLab.operator.generateContrast = function( amount ){
		/**
		 * Creates an operator that will adjust the contrast by the specified amount.
		 * 
		 * @param amount {int} How much to increase or decrease the contrast.
		 *   min: -127, max: 127
		 * @returns contrastOperator {function} the resulting contrast operator.
		 */
		return function(value){
			var val;
			if( amount > 0 ){
				if( value < 127 ){
					val = value - amount;
				}else{
					val = value + amount;
				}
			}else{
				if( value < 127 ){
					val = value - amount;
					if( val > 127 ){ val = 127; }
				}else{
					val = value + amount;
					if( val < 127 ){ val = 127; }
				}
			}
			if( val < 0 ){ return 0; }else
			if( val > 255 ){ return 255; }
			return Math.round(val);
		};
	};

	return CvLab;
}(CvLab || {}));
