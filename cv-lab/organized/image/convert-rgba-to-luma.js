var CvLab = (function (CvLab) {
	
	CvLab.image.convertRgbaToLuma = function( src ){
		return CvLab.image.convert( src, CvLab.converter.rgbaToLuma );
	};

	return CvLab;
}(CvLab || {}));
