var CvLab = (function (CvLab) {
	
	CvLab.merge.grainExtract = function( lower, upper ){

		/**
		 * Returns merged value.
		 * 
		 * Grain extract mode is supposed to extract the "film grain" from
		 * a layer to produce a new layer that is pure grain, but it can
		 * also be useful for giving images an embossed appearance. It
		 * subtracts the pixel value of the upper layer from that of the
		 * lower layer and adds 128. 
		 * 
		 * @param lower {int} The value of the lower image pixel
		 * @param upper {int} The value of the upper image pixel
		 */

		return lower - upper + 128.0;
	
	};

	return CvLab;
}(CvLab || {}));
