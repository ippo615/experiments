
function imageAdjustRgba( src, dst, r, g, b, a ){
	// r,g,b,a should be between +- 255
	return applyOperatorsToChannels( src, dst, [
		operatorGenerateAdjustClip(r),
		operatorGenerateAdjustClip(g),
		operatorGenerateAdjustClip(b),
		operatorGenerateAdjustClip(a)
	] );
}

function imageAdjustHsva( src, dst, h, s, v, a ){
	// h,s,v,a should be between +-255
	imageConvertRgbaToHsva( src, dst );
	applyOperatorsToChannels( dst, dst, [
		operatorGenerateAdjustWrap(h),
		operatorGenerateAdjustClip(s),
		operatorGenerateAdjustClip(v),
		operatorGenerateAdjustClip(a)
	] );
	imageConvertHsvaToRgba( dst, dst );
}

function imageAdjustContrast( src, dst, contrast ){
	// contrast should be between +- 127
	return applyOperatorsToChannels( src, dst, [
		operatorGenerateContrast(contrast),
		operatorGenerateContrast(contrast),
		operatorGenerateContrast(contrast),
		operatorChannelCopy
	] );
}

function imageAdjustBrightness( src, dst, brightness ){
	// contrast should be between +- 255
	return applyOperatorsToChannels( src, dst, [
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
function imageConvertToMinChannel( src, dst ){ return _convertImage( src, dst, _extractMinChannel ); }

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
function imageConvertToMaxChannel( src, dst ){ return _convertImage( src, dst, _extractMaxChannel ); }

function imageInvert( src, dst ){
	return applyOperatorsToChannels( src, dst, [
		operatorChannelInvert,
		operatorChannelInvert,
		operatorChannelInvert,
		operatorChannelCopy
	] );	
}
