function rgbaToLuma( rgba ){
    // https://en.wikipedia.org/wiki/Luma_(video)
	var r = rgba[0];
	var g = rgba[1];
	var b = rgba[2];
	var a = rgba[3];

	var luma  = Math.floor( 0.30*r + 0.59*g + 0.11*b );

	return [ luma, luma, luma, a ];
}

function lumaToRgba( luma ){
	// There is no color information in luma so you actually cannot get
	// separate r,g,b channels.
	return luma;
}

function imageConvertRgbaToLuma( src, dst ){
	_convertImage( src, dst, rgbaToLuma );
}
