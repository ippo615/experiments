function unique(arr){
/// Returns an object with the counts of unique elements in arr
/// unique([1,2,1,1,1,2,3,4]) === { 1:4, 2:2, 3:1, 4:1 }

    var value, counts = {};
    var i, l = arr.length;
    for( i=0; i<l; i+=1) {
        value = arr[i];
        if( counts[value] ){
            counts[value] += 1;
        }else{
            counts[value] = 1;
        }
    }

    return counts;
}

function blobMap(src) {

  var xSize = src.width,
      ySize = src.height,
      srcPixels = src.data,
      x, y, pos;

  // This will hold the indecies of the regions we find
  var blobMap = [];
  var label = 1;

  // The labelTable remember when blobs of differen labels merge
  // so labelTabel[1] = 2; means that label 1 and 2 are the same blob
  var labelTable = [0];

  // Start by labeling every pixel as blob 0
  for(y=0; y<ySize; y++){
    blobMap.push([]);
    for(x=0; x<xSize; x++){
      blobMap[y].push(0);
    }
  }  

  // Temporary variables for neighboring pixels and other stuff
  var nn, nw, ne, ww, oo, ee, sw, ss, se, minIndex;
  var luma = 0;
  var isVisible = 0;

    for( y=1; y<ySize-1; y++){
      for( x=1; x<xSize-1; x++){

        pos = (y*xSize+x)*4;

        // We're only looking at the alpha channel in this case but you can
        // use more complicated heuristics
        isVisible = (srcPixels[pos+3] > 127);

        if( isVisible ){

          // Find the lowest blob index nearest this pixel
          nw = blobMap[y-1][x-1] || 0;
          nn = blobMap[y-1][x-0] || 0;
          ne = blobMap[y-1][x+1] || 0;
          ww = blobMap[y-0][x-1] || 0;
          minIndex = 9e99;
          if( 0 < nw && nw < minIndex ){ minIndex = nw; }
          if( 0 < nn && nn < minIndex ){ minIndex = nn; }
          if( 0 < ne && ne < minIndex ){ minIndex = ne; }
          if( 0 < ww && ww < minIndex ){ minIndex = ww; }
  
          // This point starts a new blob -- increase the lable count and
          // and an entry for it in the label table
          if( minIndex === 0 || minIndex === 9e99 ){
            blobMap[y][x] = label;
            labelTable.push(label);
            label += 1;
  
          // This point is part of an old blob -- update the labels of the
          // neighboring pixels in the label table so that we know a merge
          // should occur and mark this pixel with the label.
          }else{
            if( minIndex < labelTable[nw] ){ labelTable[nw] = minIndex; }
            if( minIndex < labelTable[nn] ){ labelTable[nn] = minIndex; }
            if( minIndex < labelTable[ne] ){ labelTable[ne] = minIndex; }
            if( minIndex < labelTable[ww] ){ labelTable[ww] = minIndex; }

            blobMap[y][x] = minIndex;
          }

        // This pixel isn't visible so we won't mark it as special
        }else{
          blobMap[y][x] = 0;
        }
  
      }
    }
  
    // Compress the table of labels so that every location refers to only 1
    // matching location
    var i = labelTable.length;
    while( i-- ){
      label = labelTable[i];
      while( label !== labelTable[label] ){
        label = labelTable[label];
      }
      labelTable[i] = label;
    }
  
    // Merge the blobs with multiple labels
    for(y=0; y<ySize; y++){
      for(x=0; x<xSize; x++){
        label = blobMap[y][x];
        if( label === 0 ){ continue; }
        while( label !== labelTable[label] ){
          label = labelTable[label];
        }
        blobMap[y][x] = label;
      }
    }


    // PASS 2 (from bottom right to top left)
    for( y=ySize-2; y>0; y--){
      for( x=xSize-2; x>0; x--){

        pos = (y*xSize+x)*4;

        // We're only looking at the alpha channel in this case but you can
        // use more complicated heuristics
        isVisible = (srcPixels[pos+3] > 127);

        if( isVisible ){

          // Find the lowest blob index nearest this pixel
          oo = blobMap[y-0][x-0] || 0;
          ee = blobMap[y-0][x+1] || 0;
          sw = blobMap[y+1][x-1] || 0;
          ss = blobMap[y+1][x-0] || 0;
          se = blobMap[y+1][x+1] || 0;
          minIndex = 9e99;
          if( 0 < oo && oo < minIndex ){ minIndex = oo; }
          if( 0 < ee && ee < minIndex ){ minIndex = ee; }
          if( 0 < sw && sw < minIndex ){ minIndex = sw; }
          if( 0 < ss && ss < minIndex ){ minIndex = ss; }
          if( 0 < se && se < minIndex ){ minIndex = se; }
          
  
          // This point starts a new blob -- increase the lable count and
          // and an entry for it in the label table
          if( minIndex === 0 || minIndex === 9e99 ){
            blobMap[y][x] = label;
            labelTable.push(label);
            label += 1;
  
          // This point is part of an old blob -- update the labels of the
          // neighboring pixels in the label table so that we know a merge
          // should occur and mark this pixel with the label.
          }else{
            if( minIndex < labelTable[oo] ){ labelTable[oo] = minIndex; }
            if( minIndex < labelTable[ee] ){ labelTable[ee] = minIndex; }
            if( minIndex < labelTable[sw] ){ labelTable[sw] = minIndex; }
            if( minIndex < labelTable[ss] ){ labelTable[ss] = minIndex; }
            if( minIndex < labelTable[se] ){ labelTable[se] = minIndex; }

            blobMap[y][x] = minIndex;
          }

        // This pixel isn't visible so we won't mark it as special
        }else{
          blobMap[y][x] = 0;
        }
  
      }
    }
  
    // Compress the table of labels so that every location refers to only 1
    // matching location
    var i = labelTable.length;
    while( i-- ){
      label = labelTable[i];
      while( label !== labelTable[label] ){
        label = labelTable[label];
      }
      labelTable[i] = label;
    }
  
    // Merge the blobs with multiple labels
    for(y=0; y<ySize; y++){
      for(x=0; x<xSize; x++){
        label = blobMap[y][x];
        if( label === 0 ){ continue; }
        while( label !== labelTable[label] ){
          label = labelTable[label];
        }
        blobMap[y][x] = label;
      }
    }

  // The blobs may have unusual labels: [1,38,205,316,etc..]
  // Let's rename them: [1,2,3,4,etc..]

  var uniqueLabels = unique(labelTable);
  var i = 0;
  for( label in uniqueLabels ){
    labelTable[label] = i++;
  }

  // convert the blobs to the minimized labels
  for(y=0; y<ySize; y++){
    for(x=0; x<xSize; x++){
      label = blobMap[y][x];
      blobMap[y][x] = labelTable[label];
    }
  }

  // Return the blob data:
  return blobMap;

};
