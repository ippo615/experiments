var CvLab = (function (CvLab) {
	
	CvLab.operator.generateAddWrap = function( amount ){
		return function(value){
			var val = Math.round(value + amount + 255) % 255;
			return val;
		};
	};

	return CvLab;
}(CvLab || {}));
