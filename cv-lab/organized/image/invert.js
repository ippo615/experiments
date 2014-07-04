var CvLab = (function (CvLab) {
	
	CvLab.image.invert = function( src ){
		return CvLab.image.applyOperators( src, [
			CvLab.operator.invert,
			CvLab.operator.invert,
			CvLab.operator.invert,
			CvLab.operator.copy
		] );	
	};

	return CvLab;
}(CvLab || {}));
