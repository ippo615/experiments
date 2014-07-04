
function _convertImage( src, convert ){
	var srcPixels = src.data;
	var dst = new ImageData( src.width, src.height );
	var dstPixels = dst.data;

	var pixel, i, nPixels = srcPixels.length;
	for( i=0; i<nPixels; i+=4 ){
		pixel = convert( [srcPixels[i],srcPixels[i+1],srcPixels[i+2],srcPixels[i+3]] );
		dstPixels[i+0] = pixel[0];
		dstPixels[i+1] = pixel[1];
		dstPixels[i+2] = pixel[2];
		dstPixels[i+3] = pixel[3];
	}

	return dst;
}

function _remap(value,fromMin,fromMax,toMin,toMax){
	var dFrom = fromMax - fromMin;
	var dTo = toMax - toMin;
	return toMin + (value - fromMin)*dTo/dFrom;
}
// 0.5ish === _remap(128, 0, 255, 0, 1) );
// 127.5 === _remap(180, 0, 360, 0, 255) 
// 0.0 === _remap(180, 0, 360, -1, 1) ;

function applyOperatorsToChannels( src, operators ){

	var xSize = src.width;
	var ySize = src.height;
	var srcPixels = src.data;
	var dst = new ImageData( src.width, src.height );
	var dstPixels = dst.data;
	var x, y, pos;

	for(y=0; y<ySize; y++){
		for(x=0; x<xSize; x++){

			pos = (y*xSize+x)*4;

			// Save the new data
			dstPixels[pos+0] = operators[0]( srcPixels[pos+0] );
			dstPixels[pos+1] = operators[1]( srcPixels[pos+1] );
			dstPixels[pos+2] = operators[2]( srcPixels[pos+2] );
			dstPixels[pos+3] = operators[3]( srcPixels[pos+3] );

		}
	}

	return dst;
}

var operatorChannelCopy = function( value ){
	return value;
};
var operatorChannelInvert = function( value ){
	return 255 - value;
};
function operatorGenerateAdjustClip( amount ){
	return function(value){
		var val = Math.round(value + amount);
		if( val < 0 ){ return 0; }else
		if( val > 255 ){ return 255; }
		return val;
	};
}
function operatorGenerateAdjustWrap( amount ){
	return function(value){
		var val = Math.round(value + amount + 255) % 255;
		return val;
	};
}
function operatorGenerateContrast( amount ){
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
}
