var CvLab = (function (CvLab) {


	// Conversions based on: http://www.cs.rit.edu/~ncs/color/t_convert.html
	
	CvLab.converter.rgbaToHsva = function( pixel ){
		// r,g,b 0-255
		// output is [h,s,v,a] [0-360,0-1,0-1,0-1]
		var r = pixel[0];
		var g = pixel[1];
		var b = pixel[2];
		var a = pixel[3];

		// Convert r,g,b between 0-1
		r = r/255.0;
		g = g/255.0;
		b = b/255.0;

		// Is the black/grey/white (ie no color)?
		var rgbMin = Math.min(r,g,b);
		var rgbMax = Math.max(r,g,b);
		if( rgbMin === rgbMax ){
			return [ 0, 0, rgbMin, a ];
		}

		// Its got color
		var d = (r===rgbMin) ? g-b : ((b===rgbMin) ? r-g : b-r);
		var h = (r===rgbMin) ? 3 : ((b===rgbMin) ? 1 : 5);
		var hue = 60*(h - d/(rgbMax - rgbMin));
		var sat = (rgbMax - rgbMin)/rgbMax;
		var val = rgbMax;
		return [
			Math.floor(255*hue/360.0),
			Math.floor(255*sat),
			Math.floor(255*val),
			a
		];
	};

	return CvLab;
}(CvLab || {}));
