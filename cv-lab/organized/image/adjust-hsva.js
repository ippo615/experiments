var CvLab = (function (CvLab) {
	
	CvLab.image.adjustHsva = function( src, h, s, v, a ){
		// h,s,v,a should be between +-255
		var imgHsva = CvLab.image.convertRgbaToHsva( src );
		var imgAdj = CvLab.image.applyOperators( imgHsva, [
			CvLab.operator.generateAddWrap(h),
			CvLab.operator.generateAddClip(s),
			CvLab.operator.generateAddClip(v),
			CvLab.operator.generateAddClip(a)
		] );
		return CvLab.image.convertHsvaToRgba( imgAdj );
	};

	return CvLab;
}(CvLab || {}));
