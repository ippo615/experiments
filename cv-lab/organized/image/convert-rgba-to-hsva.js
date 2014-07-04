var CvLab = (function (CvLab) {
	
	CvLab.image.convertRgbaToHsva = function( src ){
		return CvLab.image.convert( src, CvLab.converter.rgbaToHsva );
	};

	return CvLab;
}(CvLab || {}));
