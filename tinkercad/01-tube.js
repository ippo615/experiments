var Mesh3D = Core.Mesh3D;
var Tess = Core.Tess;
var Solid = Core.Solid;

// Generate a cylinder (r1 = bottom, r2 = top)
function cylinder(height,r1,r2){
    
    var cl = [0, 0, 0];
    var ch = [0, 0, height];
    var pl = [r1, 0, 0];
    var ph = [r2, 0, height];
    var ndivs = Tess.circleDivisions(Math.max(r1, r2));

    var mesh = new Mesh3D();
    for (var i = 0; i < ndivs; i++) {
        var a = (i + 1) / ndivs * Math.PI * 2;
        var s = Math.sin(a);
        var c = Math.cos(a);
        var nl = [r1 * c, -r1 * s, 0];
        var nh = [r2 * c, -r2 * s, height];
        mesh.triangle(pl, ph, nl);
        mesh.triangle(nl, ph, nh);
        mesh.triangle(cl, pl, nl);
        mesh.triangle(ch, nh, ph);
        pl = nl;
        ph = nh;
    }

    return mesh;
}

// Mesh subtraction is asyncronous so the entire process
// needs to be configured according to the asyncronous
// pattern.

function shapeGeneratorDefaults(callback) {
    var params = [{
        "id": "r1",
        "displayName": "Bottom Radius",
        "type": "length",
        "rangeMin": 0,
        "rangeMax": 100,
        "default": 10.0
    }, {
        "id": "r2",
        "displayName": "Top Radius",
        "type": "length",
        "rangeMin": 0,
        "rangeMax": 100,
        "default": 10.0
    }, {
        "id": "wallThickness",
        "displayName": "Wall Thickness",
        "type": "length",
        "rangeMin": 0,
        "rangeMax": 50,
        "default": 1.0
    }, {
        "id": "height",
        "displayName": "Height",
        "type": "length",
        "rangeMin": 1.0,
        "rangeMax": 100.0,
        "default": 20.0
    }];
    callback(params);
}

function shapeGeneratorEvaluate(params,callback) {

    var cylinderInner = cylinder(
        params["height"],
        params["r1"]-params["wallThickness"],
        params["r2"]-params["wallThickness"]
    );
  
    var cylinderOuter = cylinder(
        params["height"],
        params["r1"],
        params["r2"]
    );

    cylinderOuter.subtract(cylinderInner, function(mesh){
        var s = Solid.make(mesh);
        callback(s);
    });
    
}
