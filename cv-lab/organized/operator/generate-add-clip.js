var CvLab = (function (CvLab) {
	
	CvLab.operator.generateAddClip = function( amount ){
		return function(value){
			var val = Math.round(value + amount);
			if( val < 0 ){ return 0; }else
			if( val > 255 ){ return 255; }
			return val;
		};
	};

	return CvLab;
}(CvLab || {}));
