function houghTransformOld( src, thetaSize, rSize ) {

  var xSize = src.width,
      ySize = src.height,
      srcPixels = src.data,
      x, y, posRect;

  var thetaSize = 360,
      rSize = 360;

  var dst = new ImageData( thetaSize, rSize ),
      dstPixels = dst.data;

  var rMax = Math.sqrt( xSize*xSize + ySize*ySize ),
      dr = rMax / (rSize*0.5),
      dTheta = Math.PI / thetaSize,
      t, theta, r, radius, posPolar;
  
  for(y=0; y<ySize; y++){
    for(x=0; x<xSize; x++){
      posRect = (y*xSize+x)*4;

      if( srcPixels[posRect+0] !== 0 ){ continue; }
      theta = 0;
      for( t=0; t < thetaSize; t+=1 ){
        theta += dTheta;
        radius = x*Math.cos(theta) + y*Math.sin(theta);
        r = Math.ceil(rSize*0.5 + radius/dr);
        posPolar = (r*thetaSize+t)*4;

        dstPixels[ posPolar+0 ] += ( srcPixels[posRect+3] === 255 );
        dstPixels[ posPolar+1 ] += ( srcPixels[posRect+3] === 255 );
        dstPixels[ posPolar+2 ] += ( srcPixels[posRect+3] === 255 );
      }

      dstPixels[ posRect+3 ] = 255;
    }
  }

  return dst;

}

function houghTransform( src, thetaSize, rSize ) {

  // Input image properties
  var xSize = src.width,
      ySize = src.height,
      srcPixels = src.data,
      x, y, posRect;

  // Transform space properties
  thetaSize = thetaSize || Math.min(xSize,360);
  rSize = rSize || Math.min(ySize,360);
  var t, theta, r, radius;

  // Fill the transform results with 0's
  var dstPixels = [];
  for( t=0; t<thetaSize; t+=1 ){
    dstPixels.push([]);
    for( r=0; r<rSize; r+=1 ){
      dstPixels[t].push(0);
    }
  }

  // Values for keeping the results within the size of transform space
  var rMax = Math.sqrt( xSize*xSize + ySize*ySize ),
      dr = rMax / (rSize*0.5),
      dTheta = Math.PI / thetaSize;
  
  for(y=0; y<ySize; y++){
    for(x=0; x<xSize; x++){
      posRect = (y*xSize+x)*4;

      // Skip this pixel if it is not visible
      if( srcPixels[posRect+3] === 0 ){ continue; }

      // Check every theta/radius that this point may contribute to
      // and add it to the transform result
      for( t=0; t < thetaSize; t+=1 ){
        theta = t*dTheta;
        radius = x*Math.cos(theta) + y*Math.sin(theta);
        r = Math.ceil(rSize*0.5 + radius/dr);

        dstPixels[t][r] += ( srcPixels[posRect+3] === 255 );
      }

    }
  }

  return dstPixels;

}

