var CvLab = (function (CvLab) {
	
	CvLab.operator.generateContrast = function( amount ){
		return function(value){
			var val;
			if( amount > 0 ){
				if( value < 127 ){
					val = value - amount;
				}else{
					val = value + amount;
				}
			}else{
				if( value < 127 ){
					val = value - amount;
					if( val > 127 ){ val = 127; }
				}else{
					val = value + amount;
					if( val < 127 ){ val = 127; }
				}
			}
			if( val < 0 ){ return 0; }else
			if( val > 255 ){ return 255; }
			return Math.round(val);
		};
	};

	return CvLab;
}(CvLab || {}));
