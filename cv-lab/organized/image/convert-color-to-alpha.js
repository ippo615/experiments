var CvLab = (function (CvLab) {
	
	CvLab.image.convertRgbToAlpha = function( src, r, g, b ){
		/**
		 * Converts an image so that a specific color becomes fully transparent.
		 * 
		 * @param src {ImageData} The image to be modified
		 * @param r {int} The amount of red that represent full transparancy
		 * @param g {int} The amount of green that represent full transparancy
		 * @param b {int} The amount of blue that represent full transparancy
		 * @returns dst {ImageData} The converted image
		 */
		return CvLab.image.convert( src, CvLab.converter.generateColorToAlpha([r,g,b]) );
	};

	return CvLab;
}(CvLab || {}));
