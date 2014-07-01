// 2 Dimensional version can run just under
// twice as many operations per second

// Setup
var xSize = 500;
var ySize = 500;
var x,y,pos;
var multi = [], single = [];
for( y=0; y<ySize; y+=1 ){
    multi.push( [] );
    for( x=0; x<xSize; x+=1 ){
        multi[y][x] = 1;
        pos = y*xSize + x;
        single[pos] = 1;
    }
}

// 2 Dim Test:
var a;
for( y=0; y<ySize; y+=1 ){
    for( x=0; x<xSize; x+=1 ){
        a = multi[y][x];
    }
}

// 1 Dim Test:
var a;
for( y=0; y<ySize; y+=1 ){
    for( x=0; x<xSize; x+=1 ){
        pos = y*xSize + x;
        a = single[pos];
    }
}