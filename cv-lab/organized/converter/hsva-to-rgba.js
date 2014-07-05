var CvLab = (function (CvLab) {

	// Conversions based on: http://www.cs.rit.edu/~ncs/color/t_convert.html
	
	CvLab.converter.hsvaToRgba = function( pixel ){
		/**
		 * Converts pixel from hue, saturation, value, alpha to red, green, blue, alpha.
		 *
		 * Note: the input pixel channels must be between 0 and 255. You may
		 * want hue between 0 and 360; but hue must be between 0 and 255.
		 * Likewise, you may want saturation, value and alpha to between 0
		 * and 1 but they must be between 0 and 1.
		 * 
		 * @param pixel {array} The [h,s,v,a] array of the original pixel
		 * @returns pixel {array} The [r,g,b,a] resulting pixel
		 */

		// hue 0-360, s 0-1, v 0-1
		var h = Math.floor( CvLab.util.remap( pixel[0], 0, 255, 0, 360 ) );
		var s = CvLab.util.remap( pixel[1], 0, 255, 0.0, 1.0 );
		var v = CvLab.util.remap( pixel[2], 0, 255, 0.0, 1.0 );
		var a = pixel[3];


		// If the color is not saturated then it is a shade of
		// grey equal to the value
		if( s === 0 ) {
			return [ v, v, v, a ];
		}

		// The HSL colorspace is a rotated cube. It can be projected
		// onto the "chromaticity" plane where it looks like a hexagon.
		// We determine which edge of the hexagon this color is on and
		// assign the computed values to the appropriate r,g,b channels.
		var edge, frac;
		h /= 60;
		edge = Math.floor( h );
		frac = h - edge;

		// These are the RGB values.
		var r, g ,b;
		var p, q, t;
		p = v * ( 1 - s );
		q = v * ( 1 - s * frac );
		t = v * ( 1 - s * ( 1 - frac ) );

		switch( edge ) {
			case 0:
				r = v;
				g = t;
				b = p;
				break;
			case 1:
				r = q;
				g = v;
				b = p;
				break;
			case 2:
				r = p;
				g = v;
				b = t;
				break;
			case 3:
				r = p;
				g = q;
				b = v;
				break;
			case 4:
				r = t;
				g = p;
				b = v;
				break;
			case 5:
				/* falls through */
			default:
				r = v;
				g = p;
				b = q;
				break;
		}

		// Make sure the results range from 0 to 255
		return [
			Math.round(r*255.0),
			Math.round(g*255.0),
			Math.round(b*255.0),
			a
		];

	};

	return CvLab;
}(CvLab || {}));
