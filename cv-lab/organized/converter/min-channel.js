var CvLab = (function (CvLab) {

	CvLab.converter.minChannel = function( pixel ){
		var r = pixel[0];
		var g = pixel[1];
		var b = pixel[2];
		var pxMin = Math.min( r,g,b );

		if( pxMin !== r ){ r = 0; }
		if( pxMin !== g ){ g = 0; }
		if( pxMin !== b ){ b = 0; }
		return [r,g,b,pixel[3]];
	};

	return CvLab;
}(CvLab || {}));
