var CvLab = (function (CvLab) {

	CvLab.converter.generateColorToAlpha = function( color ){
		/**
		 * Creates a converter function that turns color into transparent pixel regions.
		 *
		 * @param color {array} The [r,g,b] color to be fully transparent.
		 * @returns convertColorToAlpha {function} The function does the actual conversion.
		 */

		return function(pixel){
			dist = CvLab.util.colorDistanceRgb( color, pixel );
			if( dist > 255 ){
				dist = 255;
			}

			return [
				pixel[0],
				pixel[1],
				pixel[2],
				Math.floor(dist)
			];
		};
	};

	return CvLab;
}(CvLab || {}));
