var CvLab = (function (CvLab) {
	
	CvLab.image.adjustContrast = function( src, contrast ){
		// contrast should be between +- 127
		return CvLab.image.applyOperators( src, [
			CvLab.operator.generateContrast(contrast),
			CvLab.operator.generateContrast(contrast),
			CvLab.operator.generateContrast(contrast),
			CvLab.operator.copy
		] );
	};

	return CvLab;
}(CvLab || {}));
