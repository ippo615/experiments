var CvLab = (function (CvLab) {
	
	CvLab.image.convertRgbaToLuma = function( src ){
		/**
		 * Converts an image from r,g,b,a to l,l,l,a.
		 *
		 * The alpha channel is preserved in this conversion. Luma is a
		 * type of greyscale image. You can read more about it:
		 * https://en.wikipedia.org/wiki/Luma_(video)
		 * 
		 * @param src {ImageData} The image to be modified
		 * @returns dst {ImageData} The converted image
		 */
		return CvLab.image.convert( src, CvLab.converter.rgbaToLuma );
	};

	return CvLab;
}(CvLab || {}));
