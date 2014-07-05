var CvLab = (function (CvLab) {
	
	CvLab.util.colorDistanceRgb = function( px1, px2 ){
		/**
		 * Returns the distance between the colors of the pixels (alpha is ignored).
		 * 
		 * @param px1 {array} The [r,g,b,a] of the first pixel.
		 * @param px2 {array} The [r,g,b,a] of the other pixel.
		 * @returns distance {float} The Euclidian distance between the pixel colors.
		 */
		var delta = [
			px1[0] - px2[0],
			px1[1] - px2[1],
			px1[2] - px2[2]
		];

		return Math.sqrt( delta[0]*delta[0] + delta[1]*delta[1] + delta[2]*delta[2] );
	};

	return CvLab;
}(CvLab || {}));
