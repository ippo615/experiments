
function _distanceMap(src,weights) {

  var xSize = src.width,
      ySize = src.height,
      xStart = 1,
      xEnd = xSize-1,
      yStart = 1,
      yEnd = ySize-1,
      srcPixels = src.data,
      maxDist = xSize*ySize+1,
      x, y, pos,
      r,g,b,a;

  // This will hold the indecies of the regions we find
  var distanceMap = [];

  // Start by setting every invisible point 0 and visible stuff to a
  // really big number (because we're looking for minimums)
  for(y=0; y<ySize; y++){
    distanceMap.push([]);
    for(x=0; x<xSize; x++){

      pos = (y*xSize+x)*4;
      isVisible = (srcPixels[pos+3] < 127);

      if( isVisible ){
        distanceMap[y].push(0);
      }else{
        distanceMap[y].push(maxDist);
      }

    }
  }

  // Temporary distance value
  var d1, d2, d3, d4, dmin;

  // Left-to-right pass
  for(y=yStart; y<yEnd; y++){
    for(x=xStart; x<xEnd; x++){
      pos = (y*xSize+x)*4;
      if( distanceMap[y][x] > 0 ){
        d1 = weights[0] + distanceMap[y-0][x-1];
        d2 = weights[1] + distanceMap[y-1][x-1];
        d3 = weights[2] + distanceMap[y-1][x-0];
        d4 = weights[3] + distanceMap[y-1][x+1];
        dmin = Math.min(d1, d2, d3, d4);
        distanceMap[y][x] = dmin;
      }
    }
  }

  // Right-to-left pass
  for( y = yEnd-1; y > yStart; y-- ){
    for( x = xEnd-1; x > xStart; x-- ){
      if( distanceMap[y][x] > 0 ){
        d1 = weights[0] + distanceMap[y-0][x+1];
        d2 = weights[1] + distanceMap[y+1][x+1];
        d3 = weights[2] + distanceMap[y+1][x-0];
        d4 = weights[3] + distanceMap[y+1][x-1];
        dmin = Math.min(d1, d2, d3, d4);
        if( distanceMap[y][x] > dmin ){
          distanceMap[y][x] = dmin;
        }
      }
    }
  }

  // Remove those inifinity markers and make everything else integers
  for(y=0; y<ySize; y++){
    for(x=0; x<xSize; x++){
      d1 = distanceMap[y][x]; 
      if( d1 === maxDist ){
        d1 = 0;
      }else{
        d1 = Math.round(d1);
      }
      distanceMap[y][x] = d1;
    }
  }

  return distanceMap;
}

function distanceMapEuclidian(src){
	return _distanceMap(src,[1.0,Math.sqrt(2.0),1.0,Math.sqrt(2.0)]);
}
function distanceMapManhattan(src){
	return _distanceMap(src,[1.0,2.0,1.0,2.0]);
}
function distanceMapChess(src){
	return _distanceMap(src,[1.0,1.0,1.0,1.0]);
}


function localMaxima4( map ){
	// This will hold the indecies of the regions we find
	var maxima = [];
	var ySize = map.length;
	var xSize = map[0].length;

	var x,y;

	for(y=0; y<ySize; y++){
		maxima.push([]);
		for(x=0; x<xSize; x++){
			maxima[y].push(0);
		}
	}

	var n,s,e,w,o;
	for(y=1; y<ySize-1; y++){
		for(x=1; x<xSize-1; x++){
			n = map[y-1][x];
			s = map[y+1][x];
			e = map[y][x+1];
			w = map[y][x-1];
			o = map[y][x];

			if( o !== 0 && n <= o && s <= o && e <= o && w <= o ){
				maxima[y][x] = 1;
			}

		}
	}

	return maxima;

}

function localMaxima( map ){
	// This will hold the indecies of the regions we find
	var maxima = [];
	var ySize = map.length;
	var xSize = map[0].length;

	var x,y;

	for(y=0; y<ySize; y++){
		maxima.push([]);
		for(x=0; x<xSize; x++){
			maxima[y].push(0);
		}
	}

	var nw,nn,ne,ww,oo,ee,se,ss,sw;
	for(y=1; y<ySize-1; y++){
		for(x=1; x<xSize-1; x++){
			nw = map[y-1][x-1];
			nn = map[y-1][x];
			ne = map[y-1][x+1];
			ww = map[y][x-1];
			oo = map[y][x];
			ee = map[y][x+1];
			sw = map[y+1][x-1];
			ss = map[y+1][x];
			se = map[y+1][x+1];

			if( nw <= oo && nn <= oo && ne <= oo
			&&  sw <= oo && ss <= oo && se <= oo
			&&  ww <= oo && oo !== 0 && ee <= oo ){
				maxima[y][x] = 1;
			}

		}
	}

	return maxima;

}