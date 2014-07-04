var CvLab = (function (CvLab) {
	
	CvLab.image.convertToMinChannel = function( src ){
		return CvLab.image.convert( src, CvLab.converter.minChannel );
	};

	return CvLab;
}(CvLab || {}));
