function colorDist( px1, px2 ){
	var delta = [
		px1[0] - px2[0],
		px1[1] - px2[1],
		px1[2] - px2[2]
	];

	return Math.sqrt( delta[0]*delta[0] + delta[1]*delta[1] + delta[2]*delta[2] );
}

function colorToAlpha( src, dst, color ) {

  var xSize = src.width,
      ySize = src.height,
      srcPixels = src.data,
      dstPixels = dst.data,
      x, y, pos, dist;

  
  for(y=0; y<ySize; y++){
    for(x=0; x<xSize; x++){
      pos = (y*xSize+x)*4;
      dist = colorDist( color, [ srcPixels[pos+0], srcPixels[pos+1], srcPixels[pos+2] ] );
      if( dist > 255 ){ 
        dist = 255;
      }
      dstPixels[pos+0] = srcPixels[pos+0];
      dstPixels[pos+1] = srcPixels[pos+1];
      dstPixels[pos+2] = srcPixels[pos+2];
      dstPixels[pos+3] = Math.floor(dist);

    }
  }

}
