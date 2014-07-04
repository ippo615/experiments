var CvLab = (function (CvLab) {
	
	CvLab.image.adjustBrightness = function( src, brightness ){
		// contrast should be between +- 255
		return CvLab.image.applyOperators( src, [
			CvLab.operator.generateAddClip(brightness),
			CvLab.operator.generateAddClip(brightness),
			CvLab.operator.generateAddClip(brightness),
			CvLab.operator.copy
		] );
	};

	return CvLab;
}(CvLab || {}));
