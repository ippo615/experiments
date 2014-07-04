var CvLab = (function (CvLab) {

	CvLab.converter.maxChannel = function( pixel ){
		var r = pixel[0];
		var g = pixel[1];
		var b = pixel[2];
		var pxMax = Math.max( r,g,b );

		if( pxMax !== r ){ r = 0; }
		if( pxMax !== g ){ g = 0; }
		if( pxMax !== b ){ b = 0; }
		return [r,g,b,pixel[3]];
	};

	return CvLab;
}(CvLab || {}));
