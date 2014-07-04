var CvLab = (function (CvLab) {
	
	CvLab.util.remap = function(value,fromMin,fromMax,toMin,toMax){
		var dFrom = fromMax - fromMin;
		var dTo = toMax - toMin;
		return toMin + (value - fromMin)*dTo/dFrom;
	};

	return CvLab;
}(CvLab || {}));
