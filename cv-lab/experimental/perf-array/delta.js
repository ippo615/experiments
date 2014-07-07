
// ALL HAD EFFECTIVELY THE SAME PERFORMANCE

Benchmark.prototype.setup = function() {
    var xSize = 32;
    var ySize = 32;
    var x=10;
    var y=12;
    var pos;
    var nw, nn, ne, ww, oo, ee, sw, ss, se;
    var dx = 1;
    var dy = xSize * 1;
    var dxSing = 1;
    var dySing = 1;
    var multi = [];
    var single = [];
    var typed = new Uint8Array(xSize*ySize);
    for (y = 0; y < ySize; y += 1) {
      multi.push([]);
      for (x = 0; x < xSize; x += 1) {
        multi[y].push(1);
        single.push(1);
        pos = y * xSize + x;
        typed[pos] = 1;
      }
    }
    var x = 10;
    var y = 20;
    
  };


// 2 Dim Test:
//for (y = 1; y < ySize - 1; y += 1) {
//  for (x = 1; x < xSize - 1; x += 1) {

    nw = multi[y - dySing][x - dxSing];
    nn = multi[y - dySing][x];
    ne = multi[y - dySing][x + dxSing];

    ww = multi[y][x - dxSing];
    oo = multi[y][x];
    ee = multi[y][x + dxSing];

    sw = multi[y + dySing][x - dxSing];
    ss = multi[y + dySing][x];
    se = multi[y + dySing][x + dxSing];
//  }
//}


//for (y = 1; y < ySize - 1; y += 1) {
//  for (x = 1; x < xSize - 1; x += 1) {
//    pos += dx;
    pos = y*xSize+x;

    nw = single[pos - dx - dy];
    nn = single[pos - dy];
    ne = single[pos + dx - dy];

    ww = single[pos - dx];
    oo = single[pos];
    ee = single[pos + dx];

    sw = single[pos - dx + dy];
    sn = single[pos + dy];
    se = single[pos + dx + dy];
//  }
//}


//for (y = 1; y < ySize - 1; y += 1) {
//  for (x = 1; x < xSize - 1; x += 1) {
//    pos += dx;
    pos = y*xSize+x;

    nw = typed[pos - dx - dy];
    nn = typed[pos - dy];
    ne = typed[pos + dx - dy];

    ww = typed[pos - dx];
    oo = typed[pos];
    ee = typed[pos + dx];

    sw = typed[pos - dx + dy];
    sn = typed[pos + dy];
    se = typed[pos + dx + dy];
//  }
//}