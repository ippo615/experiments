
function main( progress ){
    var x=0,y=0,w=5,h=5;
    // Square
    var shape = Shape();
    shape.moveTo( x-w, y );
    shape.bezierCurveTo(  x-w, y-h, x-w, y-h, x, y-h );
    shape.bezierCurveTo(  x+w, y-h, x+w, y-h, x+w, y );
    shape.bezierCurveTo(  x+w, y+h, x+w, y+h, x, y+h );
    shape.bezierCurveTo(  x-w, y+h, x-w, y+h, x-w, y );
    var extrudeSettings = {
        amount: w*2,
        bevelEnabled: false
    };
    var a = Extrude( shape, extrudeSettings );
    a.translate([0,0,-h]);
    var b = a.clone();
    b.rotate([0,90,0]);
    //return a.toGeometry();
    return a.intersect(b).toGeometry();
}
