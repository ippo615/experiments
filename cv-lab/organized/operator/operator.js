CvLab.operator = function(){
	/**
	 * Contains methods for operating on single channels of color.
	 * 
	 * Operators are functions that work on a single channel's value in a
	 * single pixel. Operators are applied independently to all of the pixels
	 * in a channel using the `CvLab.image.applyOperators` function.
	 *
	 * Operator functions are very simple: they accept only 1 argument which
	 * is an integer between 0 and 255, and they return 1 value which is also
	 * an integer between 0 and 255.
	 * 
	 * Some methods here are actual operators while others are operator
	 * generators. Generators accept 1 or more configuration options and
	 * return a new operator function that can be used like any other
	 * operator. Operator generators are prefixed with `generate`, for
	 * example: `CvLab.operator.generateAddClip`.
	 */
};

