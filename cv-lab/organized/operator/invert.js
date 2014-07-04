var CvLab = (function (CvLab) {
	
	CvLab.operator.invert = function( value ){
		return 255-value;
	};

	return CvLab;
}(CvLab || {}));
