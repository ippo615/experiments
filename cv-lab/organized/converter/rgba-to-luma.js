var CvLab = (function (CvLab) {

	// https://en.wikipedia.org/wiki/Luma_(video)
	CvLab.converter.rgbaToLuma = function( pixel ){
		var r = pixel[0];
		var g = pixel[1];
		var b = pixel[2];
		var a = pixel[3];

		var luma  = Math.floor( 0.30*r + 0.59*g + 0.11*b );

		return [ luma, luma, luma, a ];
	};

	return CvLab;
}(CvLab || {}));
