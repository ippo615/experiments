var CvLab = (function (CvLab) {
	
	CvLab.image.adjustRgba = function( src, r, g, b, a ){
		// r,g,b,a should be between +- 255
		return CvLab.image.applyOperators( src, [
			CvLab.operator.generateAddClip(r),
			CvLab.operator.generateAddClip(g),
			CvLab.operator.generateAddClip(b),
			CvLab.operator.generateAddClip(a)
		] );
	};

	return CvLab;
}(CvLab || {}));
