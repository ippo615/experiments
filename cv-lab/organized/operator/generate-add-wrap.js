var CvLab = (function (CvLab) {
	
	CvLab.operator.generateAddWrap = function( amount ){
		/**
		 * Creates an operator that adds amount and wraps the results on over/underflow.
		 * 
		 * Wrapping occurs at `255`. This means that if you set the amount to `120` and the
		 * pixel channel value is `200`. Then the result will be `(120+200) mod 255` or
		 * `65`. Note that you can also add negative values to subtract.
		 *
		 * @param amount {int} The amount to add to the value (can be positive or negative).
		 *   Min: -255, Max: 255.
		 * @returns addWrapOperator {function}
		 *   The operator which adds amount and wraps it about 255.
		 */
		return function(value){
			var val = Math.round(value + amount + 255) % 255;
			return val;
		};
	};

	return CvLab;
}(CvLab || {}));
