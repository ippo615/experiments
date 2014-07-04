var CvLab = (function (CvLab) {

	/// Unstandardizing puts numbers into a range that is intuitive and easy to
	/// work with. Standardizing puts numbers into the 0-255 integer range.
	/// AutoStandardizing puts numbers from either form into the standard range.

	function hsvUnstandardize( hsva ){
	/// Maps [h,s,v,a] from 0-255 to [0-360,0-1,0-1,0-1]
		return [
			Math.floor( CvLab.util.remap( hsva[0], 0, 255, 0, 360 ) ),
			CvLab.util.remap( hsva[1], 0, 255, 0.0, 1.0 ),
			CvLab.util.remap( hsva[2], 0, 255, 0.0, 1.0 ),
			CvLab.util.remap( hsva[3], 0, 255, 0.0, 1.0 )
		];
	}
	function hsvStandardize( hsva ){
	// Maps all values in unstandardized [h,s,v,a] to 0-255
		return [
			Math.floor( CvLab.util.remap( hsva[0], 0, 360, 0, 255 ) ),
			Math.floor( CvLab.util.remap( hsva[1], 0.0, 1.0, 0, 255 ) ),
			Math.floor( CvLab.util.remap( hsva[2], 0.0, 1.0, 0, 255 ) ),
			Math.floor( CvLab.util.remap( hsva[3], 0.0, 1.0, 0, 255 ) )
		];
	}

	//console.info( hsvStandardize( hsvUnstandardize( [0,0,0,0] ) ) == [0,0,0,0] );
	//console.info( hsvStandardize( hsvUnstandardize( [255,255,255,255] ) ) == [255,255,255,255] );
	//console.info( hsvStandardize( [360,1,1,1] ) );//== [255,255,255,255] );
	//console.info( hsvStandardize( [180,0,0,0] ) );// == [127,255,255,255] );
	//console.info( hsvStandardize( [180,0.5,0.5,0.5] ) );// == [127,127,127,127] );

	function hsvAutoStandardize( hsva ){
		if( hsva[0] > 255 ||
			(hsva[1] < 1.0) ||
			(hsva[2] < 1.0) ||
			(hsva[3] < 1.0)){
			return hsvStandardize( hsva );
		}else{
			return hsva;
		}
	}
	//console.info( hsvAutoStandardize( [0,0,0,0] ) ); // 0,0,0,0
	//console.info( hsvAutoStandardize( [360,0,0,0] ) ); // [255,0,0,0]
	//console.info( hsvAutoStandardize( [128,128,128,128] ) ); // [128,128,128,128]
	//console.info( hsvAutoStandardize( [128,0.5,0,0] ) ); // [90,127,0,0]

	// Conversions based on: http://www.cs.rit.edu/~ncs/color/t_convert.html
	
	CvLab.converter.hsvaToRgba = function( pixel ){
		var newColor = hsvUnstandardize( hsvAutoStandardize(pixel) );
		// hue 0-360, s 0-1, v 0-1
		var h = newColor[0];
		var s = newColor[1];
		var v = newColor[2];
		var a = newColor[3];

		// If the color is not saturated then it is a shade of
		// grey equal to the value
		if( s === 0 ) {
			return {
				r: v,
				g: v,
				b: v
			};
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

		return [
			Math.round(r*255.0),
			Math.round(g*255.0),
			Math.round(b*255.0),
			Math.round(a*255.0)
		];

	};

	return CvLab;
}(CvLab || {}));
