var CvLab = (function (CvLab) {
	
	CvLab.image.convertHsvaToRgba = function( src ){
		return CvLab.image.convert( src, CvLab.converter.hsvaToRgba );
	};

	return CvLab;
}(CvLab || {}));
