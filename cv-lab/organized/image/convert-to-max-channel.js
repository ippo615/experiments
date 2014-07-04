var CvLab = (function (CvLab) {
	
	CvLab.image.convertToMaxChannel = function( src ){
		return CvLab.image.convert( src, CvLab.converter.maxChannel );
	};

	return CvLab;
}(CvLab || {}));
