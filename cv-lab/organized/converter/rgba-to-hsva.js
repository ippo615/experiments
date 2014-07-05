var CvLab = (function (CvLab) {


	// Conversions based on: http://www.cs.rit.edu/~ncs/color/t_convert.html
	
	CvLab.converter.rgbaToHsva = function( pixel ){
		/**
		 * Converts pixel from red, green, blue, alpha to hue, saturation, value, alpha.
		 *
		 * Note: the output pixel channels are beteen 0 and 255. You may expect
		 * hue between 0 and 360; but hue is between 0 and 255. Likewise, you
		 * may expect saturation, value and alpha to between 0 and 1 but they
		 * are between 0 and 1.
		 * 
		 * @param pixel {array} The [r,g,b,a] array of the original pixel
		 * @returns pixel {array} The [h,s,v,a] resulting pixel
		 */

		// r,g,b 0-255
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
