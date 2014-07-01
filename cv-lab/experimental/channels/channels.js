function channelExtract(src,channel) {

  var xSize = src.width,
      ySize = src.height,
      srcPixels = src.data,
      x, y, pos;

  var map = [];
  
  for(y=0; y<ySize; y++){
    map.push([]);
    for(x=0; x<xSize; x++){
      pos = (y*xSize+x)*4;
      map[y].push( srcPixels[pos+channel] );
    }
  }

  return map;
}

function channelInject( map, dst, channel ) {

  var xSize = dst.width,
      ySize = dst.height,
      dstPixels = dst.data,
      x, y, pos;
 
  for(y=0; y<ySize; y++){
    for(x=0; x<xSize; x++){
      pos = (y*xSize+x)*4;
      dstPixels[ pos+channel ] = map[y][x];
    }
  }

}
