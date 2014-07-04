
function imageAdjustRgba( src, r, g, b, a ){
	// r,g,b,a should be between +- 255
	return applyOperatorsToChannels( src, [
		operatorGenerateAdjustClip(r),
		operatorGenerateAdjustClip(g),
		operatorGenerateAdjustClip(b),
		operatorGenerateAdjustClip(a)
	] );
}

function imageAdjustHsva( src, h, s, v, a ){
	// h,s,v,a should be between +-255
	var imgHsva = imageConvertRgbaToHsva( src );
	var imgAdj = applyOperatorsToChannels( imgHsva, [
		operatorGenerateAdjustWrap(h),
		operatorGenerateAdjustClip(s),
		operatorGenerateAdjustClip(v),
		operatorGenerateAdjustClip(a)
	] );
	return imageConvertHsvaToRgba( imgAdj );
}

function imageAdjustContrast( src, contrast ){
	// contrast should be between +- 127
	return applyOperatorsToChannels( src, [
		operatorGenerateContrast(contrast),
		operatorGenerateContrast(contrast),
		operatorGenerateContrast(contrast),
		operatorChannelCopy
	] );
}

function imageAdjustBrightness( src, brightness ){
	// contrast should be between +- 255
	return applyOperatorsToChannels( src, [
		operatorGenerateAdjustClip(brightness),
		operatorGenerateAdjustClip(brightness),
		operatorGenerateAdjustClip(brightness),
		operatorChannelCopy
	] );
}

function _extractMinChannel( pixel ){
	var r = pixel[0];
	var g = pixel[1];
	var b = pixel[2];
	var pxMin = Math.min( r,g,b );

	if( pxMin !== r ){ r = 0; }
	if( pxMin !== g ){ g = 0; }
	if( pxMin !== b ){ b = 0; }
	return [r,g,b,pixel[3]];
}
function imageConvertToMinChannel( src ){ return _convertImage( src, _extractMinChannel ); }

function _extractMaxChannel( pixel ){
	var r = pixel[0];
	var g = pixel[1];
	var b = pixel[2];
	var pxMax = Math.max( r,g,b );

	if( pxMax !== r ){ r = 0; }
	if( pxMax !== g ){ g = 0; }
	if( pxMax !== b ){ b = 0; }
	return [r,g,b,pixel[3]];
}
function imageConvertToMaxChannel( src ){ return _convertImage( src, _extractMaxChannel ); }

function imageInvert( src, dst ){
	return applyOperatorsToChannels( src, [
		operatorChannelInvert,
		operatorChannelInvert,
		operatorChannelInvert,
		operatorChannelCopy
	] );	
}
